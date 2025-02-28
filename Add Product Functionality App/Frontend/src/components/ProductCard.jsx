import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import { MdClose, MdDelete } from 'react-icons/md'
import { useColorModeValue } from './ui/color-mode'
import { useProductStore } from '../store/product'
import { toaster } from './ui/toaster'
import UpdateModal from '../Modal/UpdateModal'

const ProductCard = ({product}) => {
     const textColor=useColorModeValue("gray.600","gray.200")
    const bg=useColorModeValue('white','gray.900')

   const {deleteProduct}=useProductStore()

    const handleDeleteProduct=async(pid)=>{
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
    <>
    <Box
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={"all 0.3s"}
    bg={bg}
    _hover={{transform:"translateY(-5px)",shadow:"xl"}}>
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit="cover" />
        <Box p={4}><Heading as={'h1'} textAlign={'left'} size="xl" mb={2}>{product.name}</Heading>
        <Text fontWeight={"bold"} textAlign={"left"} fontSize={'xl'} mb={5} color={textColor}>${product.price}</Text>
        <HStack gap={2}>
        <UpdateModal product={product}/>
        <IconButton bgColor={"red.300"} aria-label="Search database" onClick={()=>{handleDeleteProduct(product._id)}}>
        <MdDelete />
        </IconButton>
        </HStack>
        </Box>
    </Box>

     
   </>
  )
}

export default ProductCard