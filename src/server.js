import express from "express";
import cors from "cors";
import path from "path";
import connectDb from "./db config/db.js";
import { productRouter } from "./routes/productRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";
import { AdminRouter } from "./routes/adminRoutes.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration supporting local dev, Vercel deployments and preview URLs
const allowedOrigins = [
  "https://shuto-shoilo-admin.vercel.app",
  "https://shuto-shoilo-frontend.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    const isAllowedDomain = allowedOrigins.includes(origin);
    const isVercel = origin.endsWith(".vercel.app");
    const isLocal = origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:");

    if (isAllowedDomain || isVercel || isLocal) {
      return callback(null, true);
    }

    // Default allow to prevent unexpected production CORS breaks
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};

app.use(cors(corsOptions));


app.use(express.json());

// Ensure Database is connected (especially crucial for Vercel serverless function invocations)
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    console.error("Database connection middleware error:", err);
    next();
  }
});

// Static image serving with reliable absolute paths
const localTempDir = path.resolve(process.cwd(), "public/temp");
app.use("/image", express.static(localTempDir));
if (process.env.VERCEL) {
  app.use("/image", express.static("/tmp"));
}

// API Endpoints
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", AdminRouter);

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "Shuto-Shoili Botanical Cafe Backend",
    timestamp: new Date().toISOString()
  });
});

// Start HTTP server locally (on Vercel, app is exported as serverless handler)
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Shuto-Shoili backend running on http://localhost:${port}`);
  });
}

export default app;
