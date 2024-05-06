import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import productsService from "../../services/products.service";

class AccountController {
    async getAccounts(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }

    async getAccount(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }

    async getTrendings(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }

    async getFollowers(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }

    async getFollowings(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }

    async createAccount(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }
    async updateAccount(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }

    async deleteAccount(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }
}

export default new AccountController();
