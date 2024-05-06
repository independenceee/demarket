import { Router } from "express";
import productsController from "../../controllers/version2/products.controller";

const router = Router();

router.route("/trending").get(productsController.getTrendings);
router.route("/news").get(productsController.getNews);

router.route("/likes").get(productsController.getLikes);
router.route("/sells").get(productsController.getSells);
router.route("/mints").get(productsController.getMints);
router.route("/likes").get(productsController.getLikes);

router.route("/").get(productsController.getProducts);
router.route("/").post(productsController.createProduct);
router.route("/").patch(productsController.updateProduct);
router.route("/").delete(productsController.deleteProduct);

export default router;
