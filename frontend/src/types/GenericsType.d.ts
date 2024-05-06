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
