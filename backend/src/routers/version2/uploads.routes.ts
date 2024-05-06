import { Router } from "express";
import uploadsController from "../../controllers/version2/uploads.controller";
import uploadsMiddleware from "../../middlewares/uploads.middleware";
const router = Router();

router.route("/single").post(uploadsMiddleware.single("image"), uploadsController.single);

export default router;
