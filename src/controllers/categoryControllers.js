import { CategoryModel } from "../models/categoryModel.js";

const DEFAULT_CATEGORIES = [
  {
    name: "Artisan Brews & Teas",
    description: "Cold-drip single origin coffees, ceremonial matcha, and botanical herb infusions."
  },
  {
    name: "Superfood Bowls",
    description: "Live spirulina, wild acai, and nutrient-dense sprouted superfood bowls."
  },
  {
    name: "Sourdough & Bakes",
    description: "Wild-fermented slow sourdough loaves, rosemary focaccia, and gluten-free pastries."
  },
  {
    name: "Botanical Tonics",
    description: "Adaptogenic herbal elixirs, organic kombucha, and cold-pressed wellness tonics."
  }
];

export const categoryList = async (req, res) => {
  try {
    let categories = await CategoryModel.find({}).sort({ createdAt: 1 });
    
    // Auto-seed default categories if collection is completely empty
    if (categories.length === 0) {
      try {
        await CategoryModel.insertMany(DEFAULT_CATEGORIES);
        categories = await CategoryModel.find({}).sort({ createdAt: 1 });
      } catch (seedErr) {
        console.error("Default category seeding notice:", seedErr.message);
      }
    }

    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ success: false, message: "Error fetching categories" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const trimmedName = name.trim();
    const existing = await CategoryModel.findOne({ 
      name: { $regex: new RegExp(`^${trimmedName}$`, "i") } 
    });

    if (existing) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    const imageFilename = req.file ? req.file.filename : (req.body.image || "");

    const newCategory = new CategoryModel({
      name: trimmedName,
      description: description ? description.trim() : "",
      image: imageFilename
    });

    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: newCategory
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({ success: false, message: "Server error while adding category" });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    const deleted = await CategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({ success: true, message: "Category removed successfully" });
  } catch (error) {
    console.error("Error removing category:", error);
    return res.status(500).json({ success: false, message: "Server error while removing category" });
  }
};
