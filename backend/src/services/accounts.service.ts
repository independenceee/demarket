import { Account, PrismaClient } from "@prisma/client";

class AccountService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAccounts({ walletAddress, page, pageSize }: { walletAddress: string; page: number; pageSize: number }) {
        const currentPage = Math.max(Number(page || 1), 1);
        const currentAccount = await this.prisma.account.findUnique({ where: { wallet_address: walletAddress } });
        if (!currentAccount) return [];
        const otherAccounts = await this.prisma.account.findMany({
            where: { wallet_address: { not: walletAddress }, followers: { none: { follower_id: currentAccount.id } } },
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
        });
        const followingIds = await this.prisma.follows.findMany({
            where: { follower_id: currentAccount.id },
            select: { following_id: true },
        });
        const followingIdsSet = new Set(followingIds.map((entry) => entry.following_id));
        const accounts = otherAccounts.map((account) => ({
            ...account,
            isFollowed: followingIdsSet.has(account.id),
        }));
        const totalPage = Math.ceil(accounts.length / pageSize);
        return { accounts, totalPage };
    }

    async getTrendings() {
        const tredings = await this.prisma.account.findMany({
            orderBy: { created_at: "asc" },
            take: 15,
            include: {
                _count: {
                    select: {
                        sell_products: true,
                        current_products: true,
                    },
                },
                current_products: { select: { id: true } },
                sell_products: { select: { id: true } },
            },
        });

        const accounts = tredings.map(function (account) {
            const mint = account.current_products.length;
            const sell = account.sell_products.length;

            return {
                ...account,
                mint,
                sell,
            };
        });

        return accounts;
    }

    async getFollowings({ accountId, page, pageSize }: { accountId: string; page: number; pageSize: number }) {
        const currentPage = Math.max(Number(page || 1), 1);
        const following = await this.prisma.follows.findMany({
            where: { following_id: accountId },
            include: { follower: true },
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
        });
        const accounts = following.map(function (follow) {
            return follow.follower;
        });
        const totalPage = Math.ceil(accounts.length / pageSize);
        return { accounts, totalPage };
    }

    async getFollowers({ accountId, page, pageSize }: { accountId: string; page: number; pageSize: number }) {
        const currentPage = Math.max(Number(page || 1), 1);
        const following = await this.prisma.follows.findMany({
            where: { follower_id: accountId },
            include: { following: true },
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
        });
        const accounts = following.map(function (follow) {
            return follow.following;
        });
        const totalPage = Math.ceil(accounts.length / pageSize);
        return { accounts, totalPage };
    }

    async createAccount({ walletAddress, stakeAddress }: { walletAddress: string; stakeAddress?: string }) {
        const existAccount = await this.prisma.account.findFirst({
            where: {
                wallet_address: walletAddress,
                stake_address: stakeAddress,
            },
        });

        if (existAccount) return existAccount;

        const account = await this.prisma.account.create({
            data: {
                stake_address: stakeAddress,
                wallet_address: walletAddress,
            },
        });

        return account;
    }

    async getAccount({ walletAddress, stakeAddress }: { walletAddress: string; stakeAddress?: string }) {
        const existAccount = await this.prisma.account.findFirst({
            where: {
                wallet_address: walletAddress,
            },
        });

        if (existAccount) return existAccount;

        const account = await this.prisma.account.create({
            data: {
                stake_address: stakeAddress,
                wallet_address: walletAddress,
            },
        });

        return account;
    }

    async deleteAccount({ walletAddress }: { walletAddress: string }) {
        await this.prisma.account.delete({
            where: {
                wallet_address: walletAddress,
            },
        });
    }

    async updateAccount({
        walletAddress,
        stake_address,
        username,
        description,
        email,
        avatar,
        telegram,
        linkedin,
        twitter,
    }: {
        walletAddress: string;
        stake_address: string;
        username: string;
        description: string;
        email: string;
        avatar: string;
        telegram: string;
        linkedin: string;
        twitter: string;
    }) {
        const existAccount = await this.prisma.account.findFirst({
            where: { wallet_address: walletAddress },
        });

        const updateAccount = await this.prisma.account.update({
            where: {
                wallet_address: walletAddress,
            },
            data: {
                email: email ? email : existAccount?.email,
                avatar: avatar ? avatar : existAccount?.avatar,
                twitter: twitter ? twitter : existAccount?.twitter,
                linkedin: linkedin ? linkedin : existAccount?.linkedin,
                telegram: telegram ? telegram : existAccount?.telegram,
                username: username ? username : existAccount?.username,
                description: description ? description : existAccount?.description,
                stake_address: stake_address ? stake_address : existAccount?.stake_address,
            },
        });

        return updateAccount;
    }
}

export default new AccountService();
