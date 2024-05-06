import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import productsService from "../../services/products.service";

class ProductController {
    async getProducts(request: Request, response: Response) {
        const { page, pageSize, walletAddress } = request.query;
        const products = await productsService.getProducts({
            page: Number(page),
            pageSize: Number(pageSize),
            walletAddress: walletAddress as string,
        });

        response.status(StatusCodes.OK).json(products);
    }

    async getTrendings(request: Request, response: Response) {}

    async getNews(request: Request, response: Response) {}

    async getMints(request: Request, response: Response) {}

    async getSells(request: Request, response: Response) {}

    async getLikes(request: Request, response: Response) {}

    async createProduct(request: Request, response: Response) {
        const {
            policy_id,
            asset_name,
            fingerprint,
            price,
            royalties,
            author_address,
            seller_address,
            current_address,
            author_stake_address,
            seller_stake_address,
            current_stake_address,
            medadata,
        } = request.body;
    }

    async updateProduct(request: Request, response: Response) {
        const { policy_id, asset_name, price, royalties, author_address, seller_address, current_address } =
            request.body;
    }

    async deleteProduct(request: Request, response: Response) {
        const { policy_id, asset_name } = request.body;
    }
}

export default new ProductController();
