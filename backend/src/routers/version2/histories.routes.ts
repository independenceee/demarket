import { Router } from "express";
import historiesController from "../../controllers/version2/histories.controller";

const router = Router();

router.route("/").get(historiesController.getHistories);

export default router;
