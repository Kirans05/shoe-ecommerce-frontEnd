import { Box, Button, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import ShoeCart from "./ShoeCart";
import SkeletonJs from "../skeletonJs";

const UBody = () => {
  const toast = useToast();
  const nav = useNavigate();

  const {
    tocken,
    cartItem,
    setcartItem,
    setselectedProduct,
    products,
    setproducts,
  } = useContext(MainContext);

  const fetchAllProducts = async () => {
    const tocken = localStorage.getItem("shoetocken");
    let options = {
      url: "https://shoe-ecommerce-website.herokuapp.com/fetch",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
        value: "user",
      },
      method: "GET",
    };

    try {
      let response = await axios(options);
      let filterProducts = response.data.result.filter(
        (list) => list.shoe_available != 0
      );
      setproducts(filterProducts);
    } catch (error) {
      toast({
        title: "Unable to Get the Details",
        duration: 5000,
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const userPaymentPage = (item) => {
    setselectedProduct(item);
    nav("/userPayment");
  };

  return (
    <Box>
      
      <Box
      mt={5}
      >
        <Button colorScheme="blue" size="md" mr={5}>
          Home
        </Button> 

        <Button colorScheme="red" size="md" onClick={() => nav("/cart")} mr={5}>
          CartItems
        </Button>
        <Button colorScheme="green" size="md" onClick={() => nav("/myOrdres")}>
          MyOrders
        </Button>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent="space-evenly"
        mt={8}
        flexWrap="wrap"
        rowGap={10}
      >
        {products !== "" ? (
          products.map((item, index) => {
            // return <Box key={index}
            // display={"flex"}
            // flexDir={"column"}
            // alignItems="flex-start"
            // justifyContent={"space-between"}
            // // border="2px solid black"
            // padding={"15px"}
            // boxShadow="0px 1px 11px 11px #C8C0BE"
            // bg={"#F0F9D1"}
            // // onClick={()=>userPaymentPage(item)}
            // >
            //   <Image src={`${item.shoewImage}`} alt='Shoe Image'
            //   maxW={"400px"}
            //   maxHeight={"300px"}
            //   minW={"400px"}
            //   minHeight={"300px"}

            //   />
            //   <Box
            //   mt={"4"}
            //   display={"flex"}
            //   flexDirection={"column"}
            //   alignItems={"flex-start"}
            //   justifyContent="space-around"

            //   >
            //     <Text>
            //       Name : {item.shoeName}
            //     </Text>
            //     <Text>
            //       Company Name : {item.shoeCompany}
            //     </Text>
            //     <Text>
            //       Price : {item.shoePrice}
            //     </Text>
            //     <Text>
            //       Qty Available : {item.shoe_available}
            //     </Text>
            //     <Box
            //     display={"flex"}
            //     flexDir={"row"}
            //     alignItems="center"
            //     justifyContent={"flex-start"}
            //     mt="12px"
            //     onClick={()=>cartProduct(item)}
            //     _hover={{
            //       cursor:"pointer"
            //     }}
            //     >
            //     <Text mr="12px">Add To Cart</Text>
            //     <ShoppingCartIcon />
            //         </Box>
            //   </Box>
            // </Box>
            return <ShoeCart key={index} item={item} />;
          })
        ) : (
          <Box 
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
        )}
      </Box>
    </Box>
  );
};

export default UBody;
