import { Box } from '@chakra-ui/react'
import React from 'react'
import AdFooter from '../AdminDashBoard/AdFooter'
import UBody from './UBody'
import UHeader from './UHeader'

const USerDashBoard = () => {
  return (
    <Box>
        <UHeader />
        <UBody />
        <AdFooter />

    </Box>
  )
}

export default USerDashBoard