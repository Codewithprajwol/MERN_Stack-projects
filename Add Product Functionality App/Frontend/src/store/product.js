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
    },
    deleteProduct:async(pid)=>{
        try{
        const res=await fetch(`/api/product/${pid}`,{
            method:"DELETE"
        });
        const data=await res.json();
        console.log(data.data)
        if(!data.success) return {success:false, message:data.message}
        set(state=>({products:state.products.filter(product =>product._id !==pid)}));
        return {success:true,message:data.message}
    }catch(err){
        return {success:false,message:'some thing went wrong'}
    }
    },
    updateProduct:async (pid,updatedProduct)=>{
        const res=await fetch(`/api/product/${pid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(updatedProduct),
        });
        const data=await res.json();
        if(!data.success) return {success:false, message:data.message}
        set(state=>({products:state.products.map(product=>product._id===pid ?data.data : product)}))
        return {success:true,message:'updated data successfully'};
    }
}))
