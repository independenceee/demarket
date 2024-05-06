import { Router } from "express";
import marketplacesController from "../../controllers/version2/marketplaces.controller";

const router = Router();

router.route("/").get(marketplacesController.getAssets);

export default router;
