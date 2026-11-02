import express from "express"
import { addProduct, productList, removeProduct, seedProducts } from "../controllers/productControllers.js"
import { upload } from "../middlewares/multerMiddlewares.js"
import { verifyAdmin } from '../middlewares/vrfyAd.Middlewares.js';

const productRouter = express.Router()

productRouter.post("/add", upload.single("image"), addProduct)
productRouter.get("/list", productList)
productRouter.post("/remove", verifyAdmin, removeProduct)
productRouter.get("/seed", seedProducts)

export { productRouter }