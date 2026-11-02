import { ProductModel } from "../models/productModels.js";
import { initialProducts } from "../utils/seeder.js";
import fs from "fs";
import path from "path";

// Add food / cafe product
const addProduct = async (req, res) => {
  try {
    let image_path = req.file ? req.file.filename : (req.body.image || "cafe_matcha.jpg");

    const product = new ProductModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      image: image_path,
      category: req.body.category,
    });

    await product.save();
    return res.status(201).json({ success: true, message: "Product Added", data: product });
  } catch (error) {
    console.error("Adding product error:", error);
    return res.status(500).json({ success: false, message: "Error in adding product" });
  }
};

// Product list
const productList = async (req, res) => {
  try {
    let products = await ProductModel.find({});
    // If empty, auto-seed default products
    if (products.length === 0) {
      await ProductModel.insertMany(initialProducts);
      products = await ProductModel.find({});
    }
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Problem finding product list:", error);
    return res.status(500).json({
      success: false,
      message: "Problem in finding the product list",
    });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product does not exist" });
    }

    // Attempt to unlink local image if exists
    if (product.image && !product.image.startsWith("cafe_")) {
      const imgPath = path.resolve(process.env.VERCEL ? "/tmp" : "./public/temp", product.image);
      fs.unlink(imgPath, () => {});
    }

    await ProductModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error in removing product:", error);
    return res.status(500).json({ success: false, message: "Error in removing product" });
  }
};

// Seed endpoint
const seedProducts = async (req, res) => {
  try {
    await ProductModel.deleteMany({});
    const created = await ProductModel.insertMany(initialProducts);
    return res.status(200).json({ success: true, message: "Database reseeded successfully", count: created.length });
  } catch (error) {
    console.error("Seeding error:", error);
    return res.status(500).json({ success: false, message: "Failed to seed products" });
  }
};

export { addProduct, productList, removeProduct, seedProducts };
