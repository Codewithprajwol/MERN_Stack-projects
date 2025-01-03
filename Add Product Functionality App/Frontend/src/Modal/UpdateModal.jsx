import { useProductStore } from "../store/product";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Field } from "../components/ui/field";
import { Button, IconButton, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { toaster } from "../components/ui/toaster";

const UpdateModal = ({product}) => {
    const [updatedProduct,setUpdatedProduct]=useState(product)
    const {updateProduct}=useProductStore()
    const [isOpen,setIsOpen]=useState(false)
    const handleUpdateProduct=async(pid,updatedProduct)=>{
    const {success,message}=await updateProduct(pid,updatedProduct);
        if(success){
            setIsOpen(false)
                 toaster.create({
                    title: `${message}`,
                    type: 'success',
                    duration:3000,
                    action: {
                      label: <MdClose />,
                    },
                  })
                  }else{
                    toaster.create({
                      title: `${message}`,
                      type: 'error',
                      duration:3000,
                      action:{
                        label:<MdClose />
                      }
                    })
                  }
    }
  return (
    <DialogRoot  open={isOpen} onOpenChange={(state)=>setIsOpen(state.open)}  placement={"center"}>
      <DialogTrigger asChild>
      <IconButton bgColor={"skyblue"} aria-label="Search database" onClick={()=>setIsOpen(true)} >
        <FaEdit/>
    </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <VStack gap="4">
            <Field label="Product Name">
              <Input placeholder="product name" value={updatedProduct.name} onChange={(e)=>setUpdatedProduct({...updatedProduct,name:e.target.value})} />
            </Field>
            <Field label="Price">
              <Input placeholder="price" value={updatedProduct.price} onChange={(e)=>setUpdatedProduct({...updatedProduct,price:e.target.value})} />
            </Field>
            <Field label="Image">
              <Input placeholder="image" value={updatedProduct.image} onChange={(e)=>setUpdatedProduct({...updatedProduct,image:e.target.value})} />
            </Field>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button onClick={()=>{handleUpdateProduct(product._id,updatedProduct)}}>Update Product</Button>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={()=>setIsOpen(false)}>close</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
};

export default UpdateModal;
