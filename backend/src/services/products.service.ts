import { PrismaClient, Product } from "@prisma/client";
import paginate from "../utils/paginate";
import BlockfrostService from "./blockfrost.service";
import KoiosService from "./koios.service";

class ProductService {
    private koios: KoiosService;
    private blockfrost: BlockfrostService;
    private prisma: PrismaClient;

    constructor() {
        this.koios = new KoiosService();
        this.blockfrost = new BlockfrostService();
        this.prisma = new PrismaClient();
    }

    async getProducts({ page, pageSize, walletAddress }: { page: number; pageSize: number; walletAddress?: string }) {
        const { data } = await this.koios.post("/address_assets", JSON.stringify({ _addresses: [walletAddress] }), {
            headers: { "content-type": "application/json", accept: "application/json" },
        });

        const parses = JSON.parse(data).filter(function (parse) {
            return parse.address === walletAddress && parse.quantity === "1";
        });

        const { totalPage, paginatedData } = paginate({ data: parses, page: page, pageSize: pageSize });
        const products = await Promise.all(
            paginatedData.map(async (product) => {
                const infomation = await this.blockfrost.assetsById(product.policy_id + product.asset_name);
                const transactions = await this.blockfrost.assetsTransactions(product.policy_id + product.asset_name);
                const authorAddress = (await this.blockfrost.txsUtxos(transactions[0].tx_hash)).inputs[0].address;
                const sellerAddress = (await this.blockfrost.txsUtxos(transactions[transactions.length - 1].tx_hash)).inputs[0].address;
                const currentAddress = (await this.blockfrost.txsUtxos(transactions[transactions.length - 2].tx_hash)).inputs[0].address;

                const sellerAccount = await this.prisma.account.findFirst({
                    where: { wallet_address: walletAddress },
                    select: { avatar: true, username: true },
                });

                return {
                    policyId: product.policy_id,
                    assetName: product.asset_name,
                    fingerprint: infomation.fingerprint,
                    sellerAddress: sellerAddress,
                    authorAddress: authorAddress,
                    currentAddress: currentAddress,
                    price: product.price,
                    royalties: product.royalties,
                    metadata: infomation.onchain_metadata,

                    sellerAccount: sellerAccount,
                };
            }),
        );

        return { totalPage, products };
    }

    async createProduct(product: Product) {
        const infomation = await this.blockfrost.assetsById(product.policy_id + product.asset_name);
        const transactions = await this.blockfrost.assetsTransactions(product.policy_id + product.asset_name);
        const authorAddress = (await this.blockfrost.txsUtxos(transactions[0].tx_hash)).inputs[0].address;
        const sellerAddress = (await this.blockfrost.txsUtxos(transactions[transactions.length - 1].tx_hash)).inputs[0].address;
        const currentAddress = (await this.blockfrost.txsUtxos(transactions[transactions.length - 2].tx_hash)).inputs[0].address;

        return await this.prisma.product.create({
            data: {
                policy_id: product.policy_id,
                asset_name: product.asset_name,
                price: product.price,
                royalties: product.royalties,
                fingerprint: infomation.fingerprint,
                medadata: String(JSON.stringify(infomation.onchain_metadata)),
            
            },
        });
    }
}

export default new ProductService();
