import { Button, HStack, Stack } from "@chakra-ui/react"
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "../components/ui/skeleton"

const ProductCartShimmer = () => {
  return (
    <Stack mt={"2rem"} gap="4" maxW="300px" >
      <Skeleton height="200px"/>
      <HStack width="full">
        <SkeletonText noOfLines={2} />
      </HStack>
      <HStack>
        <Skeleton width="40px" height={"40px"} />
        <Skeleton width="40px" height={"40px"}/>
      </HStack>
    </Stack>
  )
}

export default ProductCartShimmer

