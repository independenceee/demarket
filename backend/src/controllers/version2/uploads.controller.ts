import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class UploadController {
    async single(request: Request, response: Response) {
        const file = request?.file as Express.Multer.File;
        response.status(StatusCodes.OK).json(file);
    }
}

export default new UploadController();
