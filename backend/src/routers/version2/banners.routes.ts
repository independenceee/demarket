import { Router } from "express";

import marketplacesController from "../../controllers/version2/marketplaces.controller";

const router = Router();

router.route("/trending").get();
router.route("/:wallet_address").get();
router.route("/").get();
router.route("/").post();
router.route("/:wallet_address").patch();
router.route("/:wallet_address").delete();

export default router;
