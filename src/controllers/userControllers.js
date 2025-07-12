import { User } from "../models/userModels.js";
import jwt from "jsonwebtoken"
import validator from "validator"
import bcrypt from "bcrypt"


//create json web token

const createToken =  (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

//login 

const login = async (req,res) => {

    const {email,password} = req.body;
   try {

    if (!password && !email) {
        return res.json({success:false,message:"Email and password in required"})
    }
     //checking user exist or not 
     const user = await User.findOne({email})
     if(!user){
         return res.json({success:false,message:"User does not exist"})
     }
 
     //checking password
 
     const isPasswordMatch = await bcrypt.compare(password,user.password)
 
     if(!isPasswordMatch){
         return res.json({success:false,message:"Invalid credentails!"})
     }
 
     const token = createToken(user._id)
 
     res.json({success:true,token})
   } catch (error) {
    console.log(error,"Error in login")
    res.json({success:false,message:"Error in login"})
   }
    
}

//sign up

const signup = async (req,res) => {
    const {name , email, password } = req.body;
    
    try {
        //checking if user already exist

        const existedUser = await User.findOne({email})
        if(existedUser){
            return res.json({success:false,message:"User already exist."})
        }

        //validating email and password

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Give a strong password"})
        }

        //hashing the password of user

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        if(!hashedPassword){
            return res.json({success:false,message:"Signup error"})
        }

        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in registering the user"})
    }
}


export {
    login,
    signup
}