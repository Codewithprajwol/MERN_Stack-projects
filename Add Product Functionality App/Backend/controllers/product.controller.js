import mongoose from "mongoose";
import product from "../model/products.model.js";


export const createProduct=async(req,res)=>{
    try{
    const userData=req.body
    console.log(userData)
    if(!userData.name || !userData.price || !userData.image){
        res.status(400).json({success:false,message:"data doesnot send properly"})
    }
   const newProduct= await product.create(userData)
    res.status(201).json({success:true,data:newProduct});
    }catch(err){
     res.status(404).json({success:false,message:'Error while saving the product'})
    }
}

export const getProduct=async(req,res)=>{
    try{
    const allProducts=await product.find({})
    res.status(200).json({success:true,data:allProducts});
    }catch(err){
        console.log(err.message)
        res.status(400).json({success:false, message:'some error occured to get data from server'})
    }

}

export const deleteProduct=async(req,res)=>{
    try{
    const {id}=req.params;
    await product.findOneAndDelete(id)
    res.status(200).json({success:true,message:'data deleted successfully'})
    }catch(err){
    res.status(500).json({success:false, message:'some error occured while deleting the data'})
    }
}

export const updateProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const newProduct=req.body;
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"not a valid Id"});
       }
        const updatedData=await product.findByIdAndUpdate(id,newProduct,{new:true});
        res.status(201).json({success:true, data:updatedData})
    } catch (error) {
        res.status(500).json({success:false, message:'server error occured'});
    }
}