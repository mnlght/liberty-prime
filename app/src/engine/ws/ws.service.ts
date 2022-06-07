import {Injectable} from "@nestjs/common";
import { Server } from 'socket.io';

@Injectable()
export class WsService {
    public static server: Server;

    public emit(event: string, payload: any, room?: string) {
        if (room) {
            WsService.server.to(room).emit(event, payload);
        }
        WsService.server.emit(event, payload);
    }
}