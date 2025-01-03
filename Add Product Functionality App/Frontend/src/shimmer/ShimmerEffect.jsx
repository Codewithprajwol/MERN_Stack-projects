import { Container, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import ProductCartShimmer from './ProductCartShimmer'

const ShimmerEffect = () => {
  return (
    <Container maxW={'container.xl'} py={'12'}>
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
      <SimpleGrid 
        textAlign={"center"}
        columns={{
          base:1,
          md:2,
          lg:4
        }}
        gap={10}
        w={"full"}
        >
         { Array.from({length:8}).map((el,i)=>{
    return <ProductCartShimmer key={i} />
   })}
        </SimpleGrid>
    </Container>
  )
}

export default ShimmerEffect