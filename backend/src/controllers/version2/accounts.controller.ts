import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import accountsService from "../../services/accounts.service";

class AccountController {
    async getAccounts(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
        const accounts = accountsService.getAccounts({
            page: Number(page),
            pageSize: Number(pageSize),
            walletAddress: walletAddress as string,
        });

        return response.status(StatusCodes.OK).json(accounts);
    }

    async getAccount(request: Request, response: Response) {
        const { wallet_address } = request.params;
        const account = await accountsService.getAccount({
            walletAddress: wallet_address as string,
        });
        return response.status(StatusCodes.OK).json(account);
    }

    async getTrendings(request: Request, response: Response) {
        const accounts = await accountsService.getTrendings();
        return response.status(StatusCodes.OK).json(accounts);
    }

    async getFollowers(request: Request, response: Response) {
        const { page, pageSize, accountId } = request.query;
        const accounts = accountsService.getFollowers({
            page: Number(page),
            pageSize: Number(pageSize),
            accountId: accountId as string,
        });

        return response.status(StatusCodes.OK).json(accounts);
    }

    async getFollowings(request: Request, response: Response) {
        const { page, pageSize, accountId } = request.query;
        const accounts = accountsService.getFollowings({
            page: Number(page),
            pageSize: Number(pageSize),
            accountId: accountId as string,
        });

        return response.status(StatusCodes.OK).json(accounts);
    }

    async createAccount(request: Request, response: Response) {
        const { walletAddress, stakeAddress } = request.body;
        const account = await accountsService.createAccount({
            walletAddress: walletAddress,
            stakeAddress: stakeAddress,
        });
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
        response.status(StatusCodes.OK).json(account);
    }

    async deleteAccount(request: Request, response: Response) {
        const { wallet_address } = request.params;

        await accountsService.deleteAccount({ walletAddress: wallet_address });
        response.status(StatusCodes.OK).json();
    }
}

export default new AccountController();
