import { PrismaClient } from "@prisma/client/extension";
import * as dotenv from "dotenv";
dotenv.config();

class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL!,
                },
            },
        });
    }
}

export default PrismaService;
