import React, { useContext, useEffect, useState, Spinner } from "react";
import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import UHeader from "./UHeader";
import { MainContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SkeletonJs from "../skeletonJs";

const UCart = () => {

  const toast = useToast()
  const { cartItem, setcartItem, selectedProduct, setselectedProduct } = useContext(MainContext);
  const nav = useNavigate()
  const [loadingjs,setloadingjs] = useState(false)


  const removeFromCart = async (product) => {
    // let filterProducts = cartItem.filter(list => list._id != product._id)
    // setcartItem(filterProducts)
    // console.log(product)
    const tocken = localStorage.getItem("shoetocken")
    let options = {
      url:`https://shoe-ecommerce-website.herokuapp.com/user/removeCartItem/${product._id}`,
      method:"PUT",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${tocken}`,
        value:"user"
      }
    }


    try{
      let response = await axios(options)
      console.log(response.data)
      if(response.data.message == "Unable To remove From Cart"){
        toast({
          title:"Unable To remove Item From Cart",
          duration:5000,
          isClosable:true,
          position:"bottom",
          status:"error"
        })
      }else{
        setcartItem(response.data.result.cartItems)
      }
    }catch(error){
      toast({
        title:"Unable To remove Item From Cart",
        duration:5000,
        isClosable:true,
        position:"bottom",
        status:"error"
      })
    }
  } 

const fetchCartItems = async () => {
  const tocken = localStorage.getItem("shoetocken")
  let options = {
    url:"https://shoe-ecommerce-website.herokuapp.com/user/usercartItems",
    method:"GET",
    headers:{
      "content-type":"application/json",
      Authorization:`Bearer ${tocken}`,
      value:"user"
    }
  }


  try{
    let response = await axios(options)
    setloadingjs(true)
    if(response.data.message == "Unable To Display Cart Items"){
      toast({
        title:"Unable To Display The Cart Items",
        duration:5000,
        isClosable:true,
        position:"bottom",
        status:"error"
      })
    }else{
      setcartItem(response.data.result.cartItems)
    }
  }catch(error){
    toast({
      title:"Unable To Display The Cart Items",
      duration:5000,
      isClosable:true,
      position:"bottom",
      status:"error"
    })
  }
}

useEffect(() => {
  fetchCartItems()
},[])


  return (
    <Box>
      <UHeader>
        <Button colorScheme="teal" size="md">
          Home
        </Button>
      </UHeader>

      <Box>
        {/* {
          !loadingjs ?  <Box 
          width={"100%"}
          display="flex"
          flexDir={"column"}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              alignSelf="center"
            />
            <SkeletonJs />
          </Box>
          : <>
            {cartItem.length ? (
          cartItem.map((item, index) => {
            return (
              <Box
                key={index}
                display={"flex"}
                flexDir={"row"}
                alignItems="flex-start"
                justifyContent={"flex-start"}
                fontSize={25}
                padding={"15px"}
                boxShadow="0px 1px 11px 11px #C8C0BE"
                // bg={"#F0F9D1"}
                mt={10}
                mb={10}
                mr={10}
                ml={10}
                bg="#31ED96"
              >
                <Image
                  src={`${item.shoewImage}`}
                  alt="Shoe Image"
                  maxW={"400px"}
                  maxHeight={"300px"}
                  minW={"400px"}
                  minHeight={"300px"}
                  mr={10}
                />
                <Box
                  mt={"4"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  justifyContent="space-around"
                >
                  <Text>Name : {item.shoeName}</Text>
                  <Text>Company Name : {item.shoeCompany}</Text>
                  <Text>Price : {item.shoePrice}</Text>
                  <Text>Qty Available : {item.shoe_available}</Text>
                  <Box
                  mt={4}
                  >
                    <Button colorScheme="blue" size="md" mr={4}
                    onClick={()=>{nav(`/userPayment`); setselectedProduct(item) }}
                    >
                      Book Now
                    </Button>
                    <Button colorScheme="red" size="md"
                    onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Text
          fontSize={50}
          textAlign={"center"}
          mt={40}
          >
            Add Items To Display
          </Text>
        )}
          </>
        } */}

        {cartItem.length ? (
          cartItem.map((item, index) => {
            return (
              <Box
                key={index}
                display={"flex"}
                flexDir={"row"}
                alignItems="flex-start"
                justifyContent={"flex-start"}
                fontSize={25}
                padding={"15px"}
                boxShadow="0px 1px 11px 11px #C8C0BE"
                // borderRadius={"20px"}
                // bg={"#F0F9D1"}
                mt={10}
                mb={10}
                mr={10}
                ml={10}
                bg="#31ED96"
              >
                <Image
                  src={`${item.shoewImage}`}
                  alt="Shoe Image"
                  maxW={"400px"}
                  maxHeight={"300px"}
                  minW={"400px"}
                  minHeight={"300px"}
                  mr={10}
                />
                <Box
                  mt={"4"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  justifyContent="space-around"
                >
                  <Text>Name : {item.shoeName}</Text>
                  <Text>Company Name : {item.shoeCompany}</Text>
                  <Text>Price : {item.shoePrice}</Text>
                  <Text>Qty Available : {item.shoe_available}</Text>
                  <Box
                  mt={4}
                  >
                    <Button colorScheme="blue" size="md" mr={4}
                    onClick={()=>{nav(`/userPayment`); setselectedProduct(item) }}
                    >
                      Book Now
                    </Button>
                    <Button colorScheme="red" size="md"
                    onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Text
          fontSize={50}
          textAlign={"center"}
          mt={40}
          >
            Add Items To Display
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default UCart;
