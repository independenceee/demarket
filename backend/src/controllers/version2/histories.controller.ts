import { Request, Response } from "express";
import historiesService from "../../services/histories.service";
import { StatusCodes } from "http-status-codes";

class HistoryController {
    async getHistories(request: Request, response: Response) {
        const { page, pageSize, policyId, assetName } = request.query;

        const histories = await historiesService.getHistories({
            assetName: assetName as string,
            policyId: policyId as string,
            page: Number(page),
            pageSize: Number(pageSize),
        });
        response.status(StatusCodes.OK).json(histories);
    }
}

export default new HistoryController();
