import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Socket} from "socket.io-client";

@WebSocketGateway(81)
export class WsGateway {
    @SubscribeMessage('events')
    public async handleEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): Promise<void> {
        await client.emit('qw3e', {
            message: 'not ok',
        });
        // return data;
    }
}