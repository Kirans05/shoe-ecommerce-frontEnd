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
import ShoeLogo from "../../images/bg3.webp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ADProfileModal from "./ADProfileModal";

const Header = ({children}) => {
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
        // bg="tomato"
        // w="100%"
        // p={4}
        // color="black"
        // display={"flex"}
        // flexDir={"row"}
        // alignItems="center"
        // justifyContent={"space-between"}
        bg="#AAA5F4"
        w="100%"
        p={4}
        color="black"
        display={"flex"}
        flexDir={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        {/* <Image boxSize="50px" src={ShoeLogo} alt="Dan Abramov" /> */}
        <Image src={ShoeLogo} alt="Dan Abramov" className="shoeLogo"/>
        <Box bg="black" w="fit-content" p={4} color="black"
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
        justifyContent="center"
        >
          {
            children ?  <Button colorScheme='blue' size='md'  mr={3} onClick={()=>nav("/AdminDashboard")}>
            Home
          </Button>
          : null
          }
          <Button colorScheme="blue" mr={4} ml={4}>
            Admin SignUp
          </Button>
          <Menu>
            <MenuButton rightIcon={<ChevronDownIcon />}>
              <Avatar
                name="Kola Tioluwani"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </MenuButton>
            <MenuList>
                <ADProfileModal>
                <MenuItem>Profile</MenuItem>

                </ADProfileModal>
              <MenuItem onClick={logOutFunction}>LogOut</MenuItem>
            </MenuList>
          </Menu>
          
        </Box>
      </Box>
     
    </>
  );
};

export default Header;
