import { Account, PrismaClient } from "@prisma/client";

class AccountService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
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

            return {};
        });
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

    async createAccount(account: Account) {}
}

export default new AccountService();
