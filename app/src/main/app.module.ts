import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ScheduleModule} from "@nestjs/schedule";
import {BullModule} from "@nestjs/bull";
import {RedisModule} from "@nestjs-modules/ioredis";
import {WsModule} from "../engine/ws/ws.module";
import {MapModule} from "../engine/map/map.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_FULL_CONNECT_URL,
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    WsModule,
    MapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
