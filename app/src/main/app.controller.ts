import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {MapService} from "../engine/map/map.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly mapService: MapService
  ) {}

  @Get()
  async getHello(): Promise<any> {
    return this.mapService.generateMap();
  }
}
