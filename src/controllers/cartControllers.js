import { User } from "../models/userModels.js";

//adding product to the cart

const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    //checking itemId is available or not
    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Product is not availabe" });
    }
    //getting and checking user
    let userData = await User.findById(req.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    
    let cartData = userData.cartData || {};
    
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    const newUserData = await User.findByIdAndUpdate(req.userId, { cartData });
    if(!newUserData){
      return res.status(500).json({success:false,message:"Product not updated"})
    }

    res.json({ success: true, message: "Product added to the cart" });
    
  } catch (error) {
    console.log(error, "Error in adding product");
    res.status(500).json({ success: false, message: " Error in adding product" });
  }
};

//removing item from the cart

const removeFromCart = async (req,res) => {
  try {

    //product checking
    const {itemId} = req.body;
    if(!itemId){
      return res.status(400).json({success:false,message:"Product is not available"})
    }

    //user checking
    let userData = await User.findById(req.userId);
    if(!userData){
      return res.status(404).json({success:false,message:"User not found"})
    }

    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    //updated or not checking
    const newUserData = await User.findByIdAndUpdate(req.userId, { cartData });
    if(!newUserData){
      return res.status(500).json({success:false,message:"Data does not updated"})
    }

    res.status(200).json({ success: true, message: "Product removed" });

  } catch (error) {
    console.log(error, "Error in removing product");
    res.status(500).json({ success: false, message: "Error in removing product" });
  }
};

//getting the cart

const getCart = async (req,res) => {
  try {
     //user checking
    let userData = await User.findById(req.userId);
    if(!userData){
      return res.status(404).json({success:false,message:"User not found"})
    }

    let cartData = await userData.cartData;
    if(!cartData){
      return res.status(400).json({success:false,message:"Cart data is not found"})
    }

    res.status(200).json({success:true,cartData})

  } catch (error) {
    console.log(error,"Error in getting cart data")
    res.status(500).json({success:false,message:"Error in getting the cart data"})
  }
};

export { addToCart, removeFromCart, getCart };
