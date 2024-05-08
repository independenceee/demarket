import { PrismaClient } from "@prisma/client";
import MarketPlaceValidator from "../validators/marketplace.validator";
import LucidService from "./lucid.service";
import BlockfrostService from "./blockfrost.service";
import KoiosService from "./koios.service";

class HistoriesService {
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

    async getHistories({ policyId, assetName, page, pageSize }: { policyId: string; assetName: string; page: number; pageSize: number }) {
        let blockfrost = this.blockfrost;

        const txHashes = await this.blockfrost.assetsTransactions(policyId + assetName);

        const tx = await Promise.all(
            txHashes.map(async function ({ tx_hash, block_time }, index: number) {
                const txUtxos = await blockfrost.txsUtxos(tx_hash);
                return { ...txUtxos, date: block_time };
            }),
        );

        const results: any = [];
        for (const history of tx) {
            for (const input of history.inputs) {
                if (input.address === process.env.CONTRACT_ADDRESS!) {
                    results.push({
                        address: history.outputs[0].address,
                        price: history.outputs[0].amount[0].quantity,
                        txHash: history.hash,
                        date: history.date,
                        status: "Buy",
                    });
                }
            }
        }

        const totalPage = Math.ceil(results.length / Number(pageSize));
        const histories = [...results].slice((Number(page) - 1) * Number(pageSize), Number(page) * Number(pageSize));

        return { totalPage, histories, totalItems: histories.length };
    }
}

export default new HistoriesService();
