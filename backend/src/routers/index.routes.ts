import { Express } from "express";

import marketplaces from "./version2/marketplaces.routes";
import statistics from "./version2/statistics.routes";
import collections from "./version2/collections.routes";
import categories from "./version2/categories.routes";
import products from "./version2/products.routes";
import accounts from "./version2/accounts.routes";
import uploads from "./version2/uploads.routes";
import banners from "./version2/banners.routes";
import follows from "./version2/follows.routes";
import likes from "./version2/likes.routes";

const router = function (app: Express) {
    app.use("/api/v2/marketplaces", marketplaces);
    app.use("/api/v2/statistics", statistics);
    app.use("/api/v2/products", products);
    app.use("/api/v2/accounts", accounts);
    app.use("/api/v2/banners", banners);
    app.use("/api/v2/collections", collections);
    app.use("/api/v2/categories", categories);
    app.use("/api/v2/likes", likes);
    app.use("/api/v2/follows", follows);
    app.use("/api/v2/uploads", uploads);
};

export default router;
