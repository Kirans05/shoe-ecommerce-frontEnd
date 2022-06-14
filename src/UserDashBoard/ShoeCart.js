import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";


const ShoeCart = ({item, cartProduct}) => {
    const toast = useToast()

    const addToCartItems = async (product) => {
      const tocken = localStorage.getItem("shoetocken")
        let options = {
            url:"https://shoe-ecommerce-website.herokuapp.com/user/addToCart",
            method:"PUT",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${tocken}`,
                value:"user"
            },
            data:product
        }


        try{
            let response = await axios(options)
            console.log(response.data)
            if(response.data.message == "Item Added SuccessFully"){
              toast({
                title:"Item Added SuccessFully",
                duration:5000,
                isClosable:true,
                position:"bottom",
                status:"success"
              })
            }else if(response.data.message == "Product Already In Cart"){
              toast({
                title:"Product Already In Cart",
                duration:5000,
                isClosable:true,
                position:"bottom",
                status:"warning"
              })
            }
          }catch(error){
            toast({
                title:"Unable To Add Product To Cart",
                duration:5000,
                isClosable:true,
                position:"bottom",
                status:"error"
            })
        }
    }

  return (
    <Box 
    display={"flex"}
    flexDir={"column"}
    alignItems="flex-start"
    justifyContent={"space-between"}
    padding={"25px"}
    boxShadow="0px 1px 11px 11px #C8C0BE"
    bg={"#BFBEC1"}
    >
      <Image src={`${item.shoewImage}`} alt='Shoe Image' 
      maxW={"400px"} 
      maxHeight={"300px"}
      minW={"400px"} 
      minHeight={"300px"}
      
      />
      <Box
      mt={"4"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent="space-around"

      >
        <Text>
          Name : {item.shoeName}
        </Text>
        <Text>
          Company Name : {item.shoeCompany}
        </Text>
        <Text>
          Price : {item.shoePrice}
        </Text>
        <Text>
          Qty Available : {item.shoe_available}
        </Text>
        <Box
        display={"flex"}
        flexDir={"row"}
        alignItems="center"
        justifyContent={"flex-start"}
        mt="12px"
        onClick={()=>addToCartItems(item)}
        _hover={{
          cursor:"pointer"
        }}
        bg="white"
        padding={3}
        borderRadius={50}
        >
        <Text mr="12px">Add To Cart</Text>
        <ShoppingCartIcon />
            </Box>
      </Box>
    </Box>
    )
}

export default ShoeCart