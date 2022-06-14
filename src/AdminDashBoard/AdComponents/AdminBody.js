import { Box, Button, Image, list, Spinner, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/context";
import Rating from '@mui/material/Rating';
import { Typography } from "@mui/material";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import SkeletonJs from "../../skeletonJs";


const AdminBody = () => {
  const nav = useNavigate();

  const toast = useToast();
  const [data,setdata] = useState([])
  const [loading, setLoading] = useState(true)

  const { tocken } = useContext(MainContext);

  const fetchAllProducts = async () => {
    const tocken = localStorage.getItem("shoetocken"); 
    let options = {
      url: "https://shoe-ecommerce-website.herokuapp.com/fetch",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
      },
      method: "GET",
    };

    try {
      let response = await axios(options);
      setLoading(false)
      setdata(response.data.result)
    } catch (error) {
      toast({
        title: "Unable to Display Product",
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

  const editProductDetails = (item) => {
    nav(`/editproduct/${item._id}`)
}


  const deleteProductdetails = async (item) => {
    const tocken = localStorage.getItem("shoetocken"); 
    let options = {
      url:`https://shoe-ecommerce-website.herokuapp.com/fetch/deleteProduct/${item._id}`,
      method:"DELETE",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${tocken}`
      },
    }

    try{
      let response = await axios(options)
      console.log(response.data)
      fetchAllProducts()
    }catch(error){
      toast({
        title:"unable to Delete The Details",
        duration:5000,
        position:"bottom",
        isClosable:true,
        status:"error"
      })
    }

  }


  return (
    <Box
    // bg="transparent"
    >
      <Box
      mt={4}
      mb={5}
      >
      <Button
        colorScheme="blue"
        size="md"
        onClick={() => nav("/AdminDashboard")}
        mr={5}
      >
        Home
      </Button>
      <Button
        colorScheme="red"
        size="md"
        onClick={() => nav("/AdminProductAdd")}
        mr={5}
      >
        Add Product
      </Button>
      <Button colorScheme="green" size="md"
      mr={5}
      onClick={()=>nav("/FullUsers")}
      >
        Users
      </Button>
      </Box>

      <Box 
      display={"flex"}
      alignItems={"center"}
      justifyContent="space-evenly"
      mt={8}
      flexWrap="wrap"
      rowGap={10}
      // bg="transparent"
      >
        {/* {
          data ? 
        <>
            {
              data.map((item,index) => {
                return  <Box key={index}
                display={"flex"}
                flexDir={"column"}
                alignItems="flex-start"
                justifyContent={"space-between"}
                // border="2px solid black"
                padding={"15px"}
                boxShadow="0px 1px 11px 11px #C8C0BE"
                // bg={"#F0F9D1"}
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
                    mt={4}
                    display={"flex"}
                    flexDir={"row"}
                    justifyContent="center"
                    >
                    <EditIcon fontSize={30} mr={5} onClick={() => editProductDetails(item)}/>
                    <DeleteIcon fontSize={30} onClick={()=>deleteProductdetails(item)}/>
                    </Box>
                  </Box>
                </Box>
              })
            }
        </>
          :  <Box
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
        } */}



        {
          loading ? <Box
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
          data ? 
        <>
            {
              data.map((item,index) => {
                return  <Box key={index}
                display={"flex"}
                flexDir={"column"}
                alignItems="flex-start"
                justifyContent={"space-between"}
                // border="2px solid black"
                padding={"15px"}
                boxShadow="0px 1px 11px 11px #C8C0BE"
                // bg={"#F0F9D1"}
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
                    mt={4}
                    display={"flex"}
                    flexDir={"row"}
                    justifyContent="center"
                    >
                    <EditIcon fontSize={30} mr={5} onClick={() => editProductDetails(item)}/>
                    <DeleteIcon fontSize={30} onClick={()=>deleteProductdetails(item)}/>
                    </Box>
                  </Box>
                </Box>
              })
            }
        </>
        :
          // :  <Box
          // width={"100%"}
          // display="flex"
          // flexDir={"column"}
          // >
          //   <Spinner
          //     thickness="4px"
          //     speed="0.65s"
          //     emptyColor="gray.200"
          //     color="blue.500"
          //     size="xl"
          //     alignSelf="center"
          //   />
          //   <SkeletonJs />
          // </Box>
          <Text>No Data To Display</Text>
        }
          </>
        }
        </Box>
    </Box>
  );
};

export default AdminBody;
