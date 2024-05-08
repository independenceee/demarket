import { Router } from "express";
import statisticsController from "../../controllers/version2/statistics.controller";
const router = Router();

router.route("/").get(statisticsController.getStatistics);

export default router;
