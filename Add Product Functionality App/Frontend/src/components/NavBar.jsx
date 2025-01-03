import { Box,Button,Container, Flex, HStack, Text} from '@chakra-ui/react'
import React from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { ColorModeIcon, useColorMode } from './ui/color-mode'

const NavBar = () => {
  const{toggleColorMode}=useColorMode()
  return (
    <Container>
          <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={{
            base:"column",
            sm:"row"
          }} >
            <Text
            fontSize={{base:"22",sm:'28'}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"to-r"}
            gradientFrom={"cyan.400"}
            gradientTo={"blue.500"}
            bgClip={"text"} 
            >
                 <Link to={"/"}>Product Store 🛒</Link>
            </Text>
            <HStack alignItems={"center"} >
                <Link to={"/create"}>
               <Box as={CiSquarePlus} boxSize="40px" title="create Product" />
                </Link>
            <Button size="xs" onClick={toggleColorMode}><ColorModeIcon /></Button >
            </HStack>
          </Flex>
    </Container>
  )
  
}

export default NavBar