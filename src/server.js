import express , {json} from "express"
import cors from "cors"
import  connectDb  from "./db config/db.js"
import { productRouter } from "./routes/productRoutes.js"
import { userRouter } from "./routes/userRoutes.js"
import { cartRouter } from "./routes/cartRoutes.js"
import { orderRouter } from "./routes/orderRoutes.js"
import {AdminRouter} from "./routes/adminRoutes.js"
import "dotenv/config"


const app = express()
const port = process.env.PORT;

//middlewares

app.use(express.json())
app.use(cors({
  origin: [
    "https://shuto-shoilo-admin.vercel.app",
    "https://shuto-shoilo-frontend.vercel.app"
  ],
  credentials: true
}))

//database
connectDb()


//api endpoint
app.use("/api/product",productRouter)
app.use("/image",express.static("./public/temp"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/admin",AdminRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})
