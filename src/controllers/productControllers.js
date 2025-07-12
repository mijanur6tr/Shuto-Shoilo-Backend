import { log } from "console";
import { ProductModel } from "../models/productModels.js";
import fs from "fs";

//add food

const addProduct = async (req, res) => {
  let image_path = `${req.file.filename}`;

  const product = new ProductModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_path,
    category: req.body.category,
  });

  try {
    await product.save();
    res.json({ success: "true", message: "Product Added" });
  } catch (error) {
    console.log(error, "Adding product error");
    res.json({ success: "false", message: "Error in adding product" });
  }
};

//product list

const productList = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({ success: "true", data: products });
  } catch (error) {
    console.log(error);
    res.json({
      success: "false",
      message: "Problem in finding the product list",
    });
  }
};

//remove product

const removeProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body.id);
    if(!product){
        res.json({success:false,message:"Product does not exist"})
    }
    fs.unlink(`./public/temp/${product.image}`, () => {});

    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in removing product" });
  }
};

export { addProduct, productList, removeProduct };
