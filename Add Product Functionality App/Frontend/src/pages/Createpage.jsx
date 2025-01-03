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

const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const handleAddProduct=()=>{
    console.log(newProduct)
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack separator={<StackSeparator />}>
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
          <VStack>
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
            <Button bgColor={'blue.500'} onClick={handleAddProduct} w='full'>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Createpage;
