import {Module} from "@nestjs/common";
import {MapService} from "./map.service";
import {MapUsersService} from "./map.users.service";

@Module({
    providers: [MapService, MapUsersService],
    exports: [MapService, MapUsersService]
})
export class MapModule {}