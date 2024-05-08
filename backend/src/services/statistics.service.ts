import { PrismaClient } from "@prisma/client";
import MarketPlaceValidator from "../validators/marketplace.validator";
import BlockfrostService from "./blockfrost.service";
import LucidService from "./lucid.service";
import KoiosService from "./koios.service";

class StatisticsService {
    private koios: KoiosService;
    private blockfrost: BlockfrostService;
    private lucidService: LucidService;
    private marketplaceValidator: MarketPlaceValidator;
    private prisma: PrismaClient;

    constructor() {
        this.koios = new KoiosService();
        this.blockfrost = new BlockfrostService();
        this.lucidService = new LucidService();
        this.marketplaceValidator = new MarketPlaceValidator();
        this.prisma = new PrismaClient();
    }

    async getStatistics() {
        let txHashes: number = 0;
        for (let index = 1; index <= 10; index++) {
            const txHash = await this.blockfrost.addressesTransactions(process.env.CONTRACT_ADDRESS!, { count: 100, page: index });
            txHashes += txHash.length;
        }

        const { data } = await this.koios.post("/address_assets", JSON.stringify({ _addresses: [process.env.CONTRACT_ADDRESS!] }), {
            headers: { "content-type": "application/json", accept: "application/json" },
        });

        const products = JSON.parse(data).length;
        const accounts = await this.prisma.account.count();
        const trendings = Math.floor(Math.random() * 16) + 1;
        return {
            accounts,
            txHashes,
            trendings,
            products,
        };
    }
}

export default new StatisticsService();
