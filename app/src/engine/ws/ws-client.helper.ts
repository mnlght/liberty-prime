import { io } from "socket.io-client";
import {INestApplication} from "@nestjs/common";

export const getClientWebsocketForAppAndNamespace = (app: INestApplication, namespace: string, query?: object) => {
    const httpServer = app.getHttpServer();
    if (!httpServer.address()) {
        httpServer.listen(0);
    }

    return io(`http://back.liberty-prime.127.0.0.1.nip.io`, { query, transports:['websocket'], port: 81 });
};