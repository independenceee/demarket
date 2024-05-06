export type WalletType = {
    name: string;
    image: string;
    balance?: number;
    address?: string;
    downloadApi?: string;
    api: () => Promise<any> | any;
    checkApi: () => Promise<any> | any;
};

export type NetworkType = {
    networkName: Network;
    url: string;
    apiKey: string;
};

export type ProductType = {
    policyId: string;
    assetName: string;

    price: number;
    avatar: string;

    image?: string;
    type?: string;
};

export type TransactionHistoryType = {
    type: string;
    txHash: string;
    amount: number;
    status: string;
    fee: number;
    blockTime: string;
};

export type HeaderTableType = {
    title: string;
    description?: string;
};

export type CategoryItemType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    slug?: string;
};

export type TransactionResponseType = {
    totalPage: number;
    histories: TransactionHistoryType[];
    totalItems: number;
};
