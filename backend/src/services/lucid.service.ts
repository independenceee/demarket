import { Blockfrost, Lucid } from "lucid-cardano";
import * as dotenv from "dotenv";
dotenv.config();

class LucidService {
    async initial(): Promise<Lucid> {
        const lucid: Lucid = await Lucid.new(
            new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD!, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!),
            "Preprod",
        );

        return lucid;
    }
}

export default LucidService;
