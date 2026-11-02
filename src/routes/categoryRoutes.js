import express from "express";
import { categoryList, addCategory, removeCategory } from "../controllers/categoryControllers.js";
import { upload } from "../middlewares/multerMiddlewares.js";
import { verifyAdmin } from "../middlewares/vrfyAd.Middlewares.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", categoryList);
categoryRouter.post("/add", verifyAdmin, upload.single("image"), addCategory);
categoryRouter.post("/remove", verifyAdmin, removeCategory);

export { categoryRouter };
