import multer from "multer";
import storage, { fileFilter } from "../configs/uploads.config";

const uploads = multer({
    storage: storage,
});

export default uploads;
