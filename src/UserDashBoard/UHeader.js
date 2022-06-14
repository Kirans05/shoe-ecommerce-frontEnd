import {
  Avatar,
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ShoeLogo from "../images/bg3.webp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import UProfileModel from "./UProfileModel";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const UHeader = ({ children }) => {
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOutFunction = () => {
    localStorage.removeItem("shoeDetails");
    localStorage.removeItem("shoetocken");
    nav("/");
  };

  return (
    <>
      <Box
        bg="#AAA5F4"
        w="100%"
        p={4}
        color="black"
        display={"flex"}
        flexDir={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Image src={ShoeLogo} alt="Dan Abramov" className="shoeLogo"/>
        <Box
          bg="black"
          w="fit-content"
          p={4}
          color="black"
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent="center"
        >
          {children ? (
            <Button
              colorScheme="blue"
              size="md"
              mr={3}
              onClick={() => nav("/dashboard")}
            >
              Home
            </Button>
          ) : null}
         
          
          <Menu>
            <MenuButton rightIcon={<ChevronDownIcon />}>
              <Avatar
                name="Kola Tioluwani"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </MenuButton>
            <MenuList>
              <UProfileModel>
                <MenuItem>Profile</MenuItem>
              </UProfileModel>
              <MenuItem onClick={logOutFunction}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};



export default UHeader;
