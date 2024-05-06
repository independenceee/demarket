import { Router } from "express";

import accountsController from "../../controllers/version2/accounts.controller";

const router = Router();

router.route("/trendings").get(accountsController.getTrendings);
router.route("/followings").get(accountsController.getFollowings);
router.route("/followers").get(accountsController.getFollowers);

router.route("/").get(accountsController.getAccounts);
router.route("/").post(accountsController.createAccount);
router.route("/:wallet_address").get(accountsController.getAccount);
router.route("/:wallet_address").patch(accountsController.updateAccount);
router.route("/:wallet_address").delete(accountsController.deleteAccount);

export default router;
