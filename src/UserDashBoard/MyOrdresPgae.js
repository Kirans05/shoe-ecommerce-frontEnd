import { Box, Image, Spinner, Text, useCounter, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Header from "../AdminDashBoard/AdComponents/Header";
import { MainContext } from "../context/context";
import SkeletonJs from "../skeletonJs";
import UHeader from "./UHeader";

const MyOrdresPgae = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { tocken, ordersList, setordersList } = useContext(MainContext);

  const fetchUserOrders = async () => {
    const tocken = localStorage.getItem("shoetocken")
    let options = {
      url: "https://shoe-ecommerce-website.herokuapp.com/user/userOrdres",
      methos: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
        value: "user",
      },
    };

    try {
      let response = await axios(options);
      if(response.data.message == "Unable  to Retrive The Data"){
        toast({
          title: "Unable  to Retrive The Data",
          duration: 4000,
          isClosable: true,
          position: "bottom",
          status: "error",
        });
      }else{
        setordersList(response.data.result.orders)
      }
      setLoading(false)
    } catch (error) {
      toast({
        title: "Unable To Get The Data",
        duration: 4000,
        isClosable: true,
        position: "bottom",
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);
  return (
    <Box>
      <UHeader>
        <button>Home</button>
      </UHeader>
      <Box>{loading ? <Box 
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
       : 
      ordersList.length == 0 ? <Text>No Items Purchased</Text>
      :  <Box
      display={"flex"}
      flexDirection={"column"}
      rowGap={5}
      >
        {
          ordersList.map((item, index) => {
            return <Box
            key={index}
            display={"flex"}
            flexDirection={"row"}
            // border={"2px solid black"}
            justifyContent={"flex-start"}
            ml={"5%"}
            mr={"5%"}
            mt={"2%"}
            mb={"2%"}
            p={10}
            boxShadow={"dark-lg"}
            borderRadius={"25px"}
            >
              <Image boxSize='200px' src={item.shoewImage} alt='Shoe Image' mr={"5%"}/>
              <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              rowGap={5}
              fontSize={30}
              >
                <Text>Shoe Name : {item.shoeName}</Text>
                <Text>Shoe Quantity : {item.qty}</Text>
                <Text>Toatl Amount : {item.total_price}</Text>
                </Box>
            </Box>
          })
        }
      </Box>
      }
      </Box>
    </Box>
  );
};

export default MyOrdresPgae;
