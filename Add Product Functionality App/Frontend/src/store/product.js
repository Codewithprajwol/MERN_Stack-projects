import { create } from "zustand";

export const useProductStore=create((set)=>({
    products:[],
    setProducts:(products)=>set({products}),
    createProduct:async(newProduct)=>{
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false,message:"please fill in all fields."}
        }
        const res=await fetch('/api/product',{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data=await res.json();
        console.log(data)
        set((state)=>({products:[...state.products,data.data]}))
        if(data.success){
        return {success:true,message:"product created Successfully"}
        }else{
            return {success:false,message:'some problem occured here'}
        }
    },
    fetchProducts:async ()=>{
        const res=await fetch("api/product");
        const data=await res.json();
        set({products:data.data})
    }
}))
