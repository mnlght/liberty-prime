import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { WsAdapter } from '@nestjs/platform-ws';
import * as WebSocket from 'ws'
import { AppModule } from '../src/main/app.module';
import { WsGateway } from '../src/engine/ws/ws.gateway';
import {getClientWebsocketForAppAndNamespace} from "../src/engine/ws/ws-client.helper";
import {WsModule} from "../src/engine/ws/ws.module";
import * as io from 'socket.io-client'
import { expect } from 'chai';

async function createNestApp(...gateways): Promise<INestApplication> {
    const testingModule = await Test.createTestingModule({
        providers: gateways,
    }).compile();
    const app = testingModule.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter(app) as any);
    return app;
}

describe('WsGateway (WsAdapter)', () => {
    let ws, app


    afterAll(async () => {
        await app.close();
    });

    afterEach(async function () {
        await app.close();
    });

    it(`should handle message on a different path`, async () => {
        app = await createNestApp(WsGateway);
        await app.listenAsync(3001)
        // socket.emit('message', { name: 'Test' }, (data) => {
        //     expect(data).toBe('Hello, Test!');
        //     socket.disconnect();
        //     done();
        // });
        try {
            ws = new WebSocket('ws://back.liberty-prime.127.0.0.1.nip.io:3001/ws-path');
            await new Promise((resolve, reject) => {
                ws.on('open', resolve);
                ws.on('error', reject);
            });
            ws.send(
                JSON.stringify({
                    event: 'push',
                    data: {
                        test: 'te2st',
                    },
                }),
            );
            await new Promise<void>(resolve =>
                ws.on('message', data => {
                    expect(JSON.parse(data).data.test).to.be.eql('test');
                    ws.close();
                    resolve();
                }),
            );
        } catch (err) {
            console.log(err);
        }
    });


});