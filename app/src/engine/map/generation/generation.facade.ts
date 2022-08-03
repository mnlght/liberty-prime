import {Inject, Injectable} from "@nestjs/common";
import {MapService} from "../map.service";
import {MapUsersService} from "../map.users.service";

@Injectable()
export class GenerationFacade {
    constructor(
        @Inject()
        private readonly mapService: MapService,
        @Inject()
        private readonly mapUsersService: MapUsersService
    ) {
    }

    public async generate() {
        const mapHash = await this.mapService.generateMap();
        await this.mapUsersService.searchApplicants(mapHash);

    }

}