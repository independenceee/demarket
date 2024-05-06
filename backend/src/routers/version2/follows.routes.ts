import { Router } from "express";
import marketplacesController from "../../controllers/version2/marketplaces.controller";

const router = Router();

router.route("/trending").get();
router.route("/news").get();
router.route("/sells").get();

router.route("/likes").get();
router.route("/sells").get();
router.route("/mints").get();
router.route("/likes").get();
router.route("/").get();

router.route("/:wallet_address").get();
router.route("/").post();
router.route("/:id").patch();
router.route("/:id").delete();

export default router;
