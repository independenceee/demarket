import { Router } from "express";
import marketplacesController from "../../controllers/marketplaces.controller";

const router = Router();

router.route("/").get(marketplacesController.getAssets);

export default router;
