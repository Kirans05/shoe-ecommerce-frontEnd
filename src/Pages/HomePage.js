import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import ShoeLogo from "../images/bg3.webp";
import LoginPage from "../HomeComponents/LoginPage";
import SignUpPage from "../HomeComponents/SignUpPage";
import AdminLogin from "../AdminDashBoard/AdminLgoin";
import AdminSignup from "../AdminDashBoard/adminSignup";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
 

  return (
    <Box  className="mainContainer">
      {/* <Image boxSize="200px" src={ShoeLogo} alt="Dan Abramov" /> */}
      <Text  onClick={onOpen} fontSize={40} className="signupbtn">
        SignUp / Login
      </Text>
      <Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SignUp / Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="soft-rounded" colorScheme="green" isFitted>
              <TabList>
                <Tab >Login</Tab>
                <Tab >SignUp</Tab>
                <Tab >Admin Login</Tab>
                <Tab >Admin SignUp</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <LoginPage />
                </TabPanel>
                <TabPanel>
                  <SignUpPage />
                </TabPanel>
                <TabPanel>
                  <AdminLogin />
                </TabPanel>
                <TabPanel>
                  <AdminSignup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  
  );
};

export default HomePage;
