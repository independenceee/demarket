import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import MarketPlaceValidator from "../validators/marketplace.validator";
import KoiosService from "./koios.service";
import BlockfrostService from "./blockfrost.service";
import LucidService from "./lucid.service";
import { MarketplaceDatum } from "../constants/datum";
import paginate from "../utils/paginate";
import { PrismaClient } from "@prisma/client";

class MarketplaceService {
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

    async getProducts({ page, pageSize }: { page: number; pageSize: number }) {
        const lucid: Lucid = await this.lucidService.initial();
        const validator: Script = this.marketplaceValidator.read();
        const contractAddress: string = lucid.utils.validatorToAddress(validator);
        const scriptUtxos: UTxO[] = await lucid.utxosAt(process.env.CONTRACT_ADDRESS!);
        const { totalPage, paginatedData } = paginate({ data: scriptUtxos, page: page, pageSize: pageSize });
        const utxos = paginatedData.map(function (utxo: UTxO, index: number) {
            const { assetName, author, policyId, price, royalties, seller } = Data.from<MarketplaceDatum>(utxo.datum!, MarketplaceDatum);
            return {
                policyId: String(policyId),
                assetName: String(assetName),
                seller: String(seller),
                author: String(author),
                price: Number(price),
                royalties: Number(royalties),
            };
        });

        const products = await Promise.all(
            utxos.map(async (utxo) => {
                const infomation = await this.blockfrost.assetsById(utxo.policyId + utxo.assetName);
                const transactions = await this.blockfrost.assetsTransactions(utxo.policyId + utxo.assetName);
                const authorAddress = (await this.blockfrost.txsUtxos(transactions[0].tx_hash)).inputs[0].address;
                const sellerAddress = (await this.blockfrost.txsUtxos(transactions[transactions.length - 1].tx_hash)).inputs[0].address;
                const currentAddress = (await this.blockfrost.txsUtxos(transactions[transactions.length - 2].tx_hash)).inputs[0].address;

                const sellerAccount = await this.prisma.account.findFirst({
                    where: { wallet_address: sellerAddress },
                    select: { avatar: true, username: true },
                });

                return {
                    policyId: utxo.policyId,
                    assetName: utxo.assetName,
                    fingerprint: infomation.fingerprint,
                    sellerAddress: sellerAddress,
                    authorAddress: authorAddress,
                    currentAddress: currentAddress,
                    price: utxo.price,
                    royalties: utxo.royalties,
                    metadata: infomation.onchain_metadata,
                    sellerAccount: sellerAccount,
                };
            }),
        );

        return { totalPage, products };
    }

    async getProduct({ policyId, assetName }: { policyId: string; assetName: string }) {
        const lucid: Lucid = await this.lucidService.initial();
        const validator: Script = this.marketplaceValidator.read();
        const contractAddress: string = lucid.utils.validatorToAddress(validator);
        const scriptUtxos: UTxO[] = await lucid.utxosAt(process.env.CONTRACT_ADDRESS!);
        const existUtxo: UTxO | undefined = scriptUtxos.find((utxo: UTxO) => {
            const product: MarketplaceDatum = Data.from<MarketplaceDatum>(utxo.datum!, MarketplaceDatum);
            return product.policyId == policyId && product.assetName == assetName;
        });

        if (!existUtxo) return;
        const product: MarketplaceDatum = Data.from<MarketplaceDatum>(existUtxo.datum!, MarketplaceDatum);
        const infomation = await this.blockfrost.assetsById(product.policyId + product.assetName);
        const transactions = await this.blockfrost.assetsTransactions(product.policyId + product.assetName);
        const authorAddress = (await this.blockfrost.txsUtxos(transactions[0].tx_hash)).inputs[0].address;
        const sellerAddress = (await this.blockfrost.txsUtxos(transactions[transactions.length - 1].tx_hash)).inputs[0].address;
        const currentAddress = (await this.blockfrost.txsUtxos(transactions[transactions.length - 2].tx_hash)).inputs[0].address;

        return {
            policyId: product.policyId,
            assetName: product.assetName,
            fingerprint: infomation.fingerprint,
            sellerAddress: sellerAddress,
            authorAddress: authorAddress,
            currentAddress: currentAddress,
            price: Number(product.price),
            royalties: Number(product.royalties),
            metadata: infomation.onchain_metadata,
        };
    }
}

export default new MarketplaceService();
