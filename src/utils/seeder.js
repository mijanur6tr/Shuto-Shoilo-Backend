import { ProductModel } from "../models/productModels.js";

export const initialProducts = [
  {
    name: "Matcha Botanical Cloud Latte",
    description: "Ceremonial Uji matcha, cold-whipped oat milk, raw lavender reduction, blue spirulina foam.",
    price: 8,
    image: "cafe_matcha.jpg",
    category: "Artisan Brews & Teas"
  },
  {
    name: "Cold-Drip Yirgacheffe Elixir",
    description: "24-hour slow ice-drip single origin coffee with bergamot, floral honey, and mountain mint notes.",
    price: 7,
    image: "cafe_matcha.jpg",
    category: "Artisan Brews & Teas"
  },
  {
    name: "Living Spirulina & Fig Superbowl",
    description: "Organic live spirulina, dark Turkish figs, sprouted hemp hearts, soaked chia, raw bee pollen.",
    price: 14,
    image: "cafe_bowl.jpg",
    category: "Superfood Bowls"
  },
  {
    name: "Turmeric Acai Vitality Bowl",
    description: "Cold-pressed golden turmeric root, wild Brazilian acai pulp, toasted macadamia, organic coconut flakes.",
    price: 13,
    image: "cafe_bowl.jpg",
    category: "Superfood Bowls"
  },
  {
    name: "Wild-Fermented Hearth Sourdough",
    description: "36-hour slow fermented artisan loaf, organic stoneground ancient grains, crispy fleur de sel crust.",
    price: 9,
    image: "cafe_bake.jpg",
    category: "Sourdough & Bakes"
  },
  {
    name: "Rosemary & Sea Salt Focaccia",
    description: "Single-estate extra virgin olive oil, hand-harvested wild rosemary needles, Maldon flaky salt.",
    price: 7,
    image: "cafe_bake.jpg",
    category: "Sourdough & Bakes"
  },
  {
    name: "Pine Needle & Sage Adaptogen Tonic",
    description: "Wildcrafted white pine, crushed garden sage, organic ashwagandha root, sparkling artesian water.",
    price: 8,
    image: "cafe_matcha.jpg",
    category: "Botanical Tonics"
  },
  {
    name: "Wild Reishi & Raw Cacao Elixir",
    description: "Dual-extracted red reishi mushroom, pure heirloom Criollo cacao, cinnamon bark, and vanilla orchid.",
    price: 9,
    image: "cafe_bowl.jpg",
    category: "Botanical Tonics"
  }
];

export const seedDatabaseIfEmpty = async () => {
  try {
    const count = await ProductModel.countDocuments();
    if (count === 0) {
      await ProductModel.insertMany(initialProducts);
      console.log("Database seeded successfully with initial botanical cafe items.");
    }
  } catch (error) {
    console.error("Error during automatic database seeding:", error.message);
  }
};
