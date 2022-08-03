import {Injectable} from "@nestjs/common";

@Injectable()
export class MapUsersService {

    /**
     * При "начать игру" генерируем уникальный хеш юзера, по хешу
     * 1) - присоединяем в комнату
     * 2) - генерируем ключ для объекта в формате - хеш_карты__хеш_юзера
     */
    public async searchApplicants(mapHash: string) {

        /*
            @todo DTO
         */
        return {
            uuid: 'randomUuid',
            time: 1337
        }
    }
}