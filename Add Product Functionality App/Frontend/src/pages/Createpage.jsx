import { useProductStore } from "../store/product";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  StackSeparator,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "../components/ui/toaster";
import { MdClose } from "react-icons/md";

const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
    const {createProduct,products}=useProductStore()
  const handleAddProduct=async()=>{
   const {success,message}=await createProduct(newProduct)
    if(success){
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
    setNewProduct({name:"",price:"",image:""})
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb="8">
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "grey.800")}
          p={"6"}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => (setNewProduct({ ...newProduct, name: e.target.value }))}
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) => (setNewProduct({ ...newProduct, price: e.target.value }))} 
            />
            <Input
              placeholder="image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => (setNewProduct({ ...newProduct, image: e.target.value }))}
            />
            <Button
            bgGradient={"to-r"}
            gradientFrom={"cyan.400"}
            gradientTo={"blue.500"}
              onClick={handleAddProduct} w='full'>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Createpage;
