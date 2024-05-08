import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import accountsService from "../../services/accounts.service";

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
        const { walletAddress, stakeAddress } = request.body;

        const account = await accountsService.createAccount({ walletAddress: walletAddress, stakeAddress: stakeAddress });

        return response.status(StatusCodes.OK).json(account);
    }
    async updateAccount(request: Request, response: Response) {
        const { wallet_address } = request.params;
        const { stake_address, username, description, email, avatar, telegram, linkedin, twitter } = request.body;

        const account = await accountsService.updateAccount({
            avatar: avatar,
            description: description,
            email: email,
            linkedin: linkedin,
            stake_address: stake_address,
            telegram: telegram,
            twitter: twitter,
            username: username,
            walletAddress: wallet_address,
        });
    }

    async deleteAccount(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
    }
}

export default new AccountController();
