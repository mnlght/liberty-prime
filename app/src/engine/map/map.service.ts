import {Injectable} from "@nestjs/common";
import * as dungeoneer from "dungeoneer";

@Injectable()
export class MapService {
    public generateMap() {
        const map = dungeoneer.build({
            width: 21,
            height: 21
        });

        console.log(map);
    }
}
