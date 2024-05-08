import { Request, Response } from "express";

import statisticsService from "../../services/statistics.service";
import { StatusCodes } from "http-status-codes";

class StatisticsController {
    async getStatistics(request: Request, response: Response) {
        const statistics = await statisticsService.getStatistics();

        response.status(StatusCodes.OK).json(statistics);
    }
}

export default new StatisticsController();
