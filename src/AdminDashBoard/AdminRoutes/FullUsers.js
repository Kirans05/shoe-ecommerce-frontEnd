import { Box, Button, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/context";
import SkeletonJs from "../../skeletonJs";
import Header from "../AdComponents/Header";
import AdFooter from "../AdFooter";

const FullUsers = () => {
    const nav = useNavigate()
    const toast = useToast()
    const {allUsers, setAllUsers, tocken} = useContext(MainContext)
    const [loading, setLoading] = useState(true)


    const fetchAllUSersList = async () => {
      const tocken = localStorage.getItem("shoetocken")
      let options = {
        url:"https://shoe-ecommerce-website.herokuapp.com/admin/getUsersList",
        method:"GET",
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${tocken}`
        }
      }


      try{
          let response = await axios(options)
          setAllUsers(response.data.result)
          setLoading(false)
      }catch(error){
        toast({
          title:"Unable To Get The Users Data",
          duration:4000,
          isClosable:true,
          position:"bottom",
          status:"error"
        })
      }
    }

    const showOrders = (items) => {
      let reducedOrders = items.reduce((acc,cur) => cur.qty+acc,0) 
      return reducedOrders
    }


    const totalAmount = (item) => {
      let FullAmount = item.reduce((acc,cur) => acc+cur.total_price,0)
      return FullAmount
    }



    useEffect(() => {
      fetchAllUSersList()
    },[])

  return (
    <Box>
      <Header>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => nav("/AdminDashboard")}
        >
          Home
        </Button>
      </Header>
      <Box>
        {
          loading ? 
          // <Text fontSize={50} textAlign={"center"}>No Users To Display</Text>
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
          : <>
            {
              allUsers.length == 0 ? <Text>No Users To Display</Text>
              : <Box>
                {
                  allUsers.map((item, index) => {
                    return <Box
                    display={"flex"}
                    p={5}
                    mt={"3%"}
                    justifyContent={"flex-start"}
                    // border={"2px solid black"}
                    borderRadius={"30px"}
                    boxShadow={"dark-lg"}
                    ml={"3%"}
                    mr={"3%"}
                    >
                      <Image boxSize='200px' src={item.pic} alt='User Image' mr={10}/>
                      <Box
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={3}
                      fontSize={20}
                      >
                        <Text>Name : {item.name}</Text>
                        <Text>Email : {item.email}</Text>
                        <Text>Total Orders : {showOrders(item.orders)}</Text>
                        <Text>Total Amount : {totalAmount(item.orders)}</Text>
                        </Box>
                      </Box>
                  })
                }
              </Box>
            }
            </>
        }
      </Box>
      <AdFooter />
    </Box>
  );
};

export default FullUsers;
