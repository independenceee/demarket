import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import marketplacesService from "../../services/marketplaces.service";

class MarketplaceController {
    async getAssets(request: Request, response: Response) {
        const { policyId, assetName, page, pageSize } = request.query;
        if (policyId && assetName) {
            console.log(policyId, assetName);
            const product = await marketplacesService.getProduct({
                policyId: policyId as string,
                assetName: assetName as string,
            });
            return response.status(StatusCodes.OK).json(product);
        }
        const products = await marketplacesService.getProducts({ page: Number(page), pageSize: Number(pageSize) });
        response.status(StatusCodes.OK).json(products);
    }

    async createAsset(request: Request, response: Response) {}

    async updateAsset(request: Request, response: Response) {}

    async deleteAsset(request: Request, response: Response) {}
}

export default new MarketplaceController();
