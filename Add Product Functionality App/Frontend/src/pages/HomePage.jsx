import ShimmerEffect from '../shimmer/ShimmerEffect'
import ProductCard from '../components/ProductCard'
import { useProductStore } from '../store/product'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
 const {fetchProducts,products} =useProductStore()
 const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{
    const loadProduct=async()=>{
      setIsLoading(true)
    await fetchProducts();
    setIsLoading(false)
    }
    loadProduct()
  },[fetchProducts])
  if(isLoading){
    return <ShimmerEffect />
  }
  return (
    <Container maxW='container.xl' py={'12'}>
      <VStack gap="8">
        <Text
        fontSize={'30'}
        fontWeight={"bold"}
        textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"to-r"}
            gradientFrom={"cyan.400"}
            gradientTo={"blue.500"}
            bgClip={"text"} 
        > Current Products 🚀 </Text>
        {products.length>0 ?(
           <SimpleGrid 
           textAlign={"center"}
           columns={{
             base:2,
             md:3,
             lg:4
           }}
           gap={10}
           w={"full"}
           >
            {products.map((product)=>{
             return (<ProductCard key={product._id} product={product} />)
            })}
           </SimpleGrid>
        ):(
          <Text fontSize="xl" textAlign={"center"} fontWeight={"bold"} color={'gray.500'}>No products found 😥
          <Link to="/create"><Text as={'span'} color={'blue.500'} fontSize={"md"} _hover={{textDecoration:'underline'}}> Create a Product</Text></Link>
        </Text>
        )}
       
        
      </VStack>

     </Container>
  )
}

export default HomePage