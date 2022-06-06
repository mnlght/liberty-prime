import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/main/app.module';
import { WsGateway } from '../src/engine/ws/ws.gateway';
import {getClientWebsocketForAppAndNamespace} from "../src/engine/ws/ws-client.helper";

describe('WsGateway (e2e)', () => {
    let app: INestApplication;
    let someGateway: WsGateway;
    const mockClient = {
        emit: jest.fn(),
    };

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        someGateway = app.get(WsGateway);
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('events', () => {
        it('does not throw an exception because I have a exception filter', (done) => {
            const socket = getClientWebsocketForAppAndNamespace(app, '');

            socket.on('connect', () => {
                done();
                socket.emit('events');
            });

            socket.on('qwe', (exception) => {
                expect(exception).toEqual({
                    message: 'not ok',
                });

                socket.close();
                done();
            });

        });
    });
});