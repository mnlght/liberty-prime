import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {WsService} from "./ws.service";

import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
    path: '/ws-path',
})
export class WsGateway {
    @SubscribeMessage('push')
    onPush(client, data) {
        return {
            event: 'pop',
            data,
        };
    }
}