import { Axios } from "axios";
import * as dotenv from "dotenv";
dotenv.config();

class KoiosService extends Axios {
    constructor() {
        super({
            baseURL: process.env.KOIOS_RPC_URL_PREPROD!,
        });
    }
}

export default KoiosService;
