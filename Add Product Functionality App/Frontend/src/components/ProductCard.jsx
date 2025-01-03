import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdClose, MdDelete } from 'react-icons/md'
import { useColorModeValue } from './ui/color-mode'
import { useProductStore } from '../store/product'
import { toaster } from './ui/toaster'

const ProductCard = ({product}) => {
    console.log(product._id)
    const textColor=useColorModeValue("gray.600","gray.200")
    const bg=useColorModeValue('white','grey.800')

   const {deleteProduct}=useProductStore()

    const handleDeleteProduct=async (pid)=>{
        console.log('i am running')
      const {success,message}=await deleteProduct(pid)
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
    }
  return (
    <Box
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={"all 0.3s"}
    bg={bg}
    _hover={{transform:"translateY(-5px)",shadow:"xl"}}>
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit="cover"/>
        <Box p={4}><Heading as={'h1'} textAlign={'left'} size="xl" mb={2}>{product.name}</Heading>
        <Text fontWeight={"bold"} textAlign={"left"} fontSize={'xl'} mb={5} color={textColor}>${product.price}</Text>
        <HStack gap={2}>
        <IconButton bgColor={"skyblue"} aria-label="Search database">
        <FaEdit />
        </IconButton>
        <IconButton bgColor={"red.300"} aria-label="Search database" onClick={()=>{handleDeleteProduct(product._id)}}>
        <MdDelete />
        </IconButton>
        </HStack>
        </Box>
    </Box>
  )
}

export default ProductCard