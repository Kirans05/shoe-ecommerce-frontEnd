import { Box } from '@chakra-ui/react'
import React from 'react'

const AdFooter = () => {
  return (
    <Box
    bg={"black"}
    h="70px"
    color={"white"}
    mt={10}
    fontSize={40}
    display={"flex"}
    flexDir={"column"}
    alignItems={"center"}
    w="100%"
    className='footerSticky'
    // mt={-10}
    >
        <h1>Shoe Website</h1>
    </Box>
  )
}

export default AdFooter