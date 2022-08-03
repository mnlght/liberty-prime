import {Injectable} from "@nestjs/common";
import * as dungeoneer from "dungeoneer";
import { encode } from "@msgpack/msgpack";

@Injectable()
export class MapService {
    public async generateMap() {
        const map = dungeoneer.build({
            width: 21,
            height: 21
        });

        // const x = encode(map);
        console.log(map);

        return 'uniqueMapHash';
    }
}
