import { PrismaClient } from "@prisma/client";

class FollowService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async check({ followingId, followerId }: { followingId: string; followerId: string }) {
        const existFollow = await this.prisma.follows.findUnique({
            where: {
                follower_id_following_id: {
                    follower_id: followerId,
                    following_id: followingId,
                },
            },
        });
        return existFollow;
    }

    async follow({ followingId, followerId }: { followingId: string; followerId: string }) {
        await this.prisma.follows.create({
            data: {
                follower_id: followerId,
                following_id: followingId,
            },
        });
    }

    async deleteFollowAccount({ followingId, followerId }: { followingId: string; followerId: string }) {
        await this.prisma.follows.delete({
            where: {
                follower_id_following_id: {
                    follower_id: followerId,
                    following_id: followingId,
                },
            },
        });
    }
}

export default new FollowService();
