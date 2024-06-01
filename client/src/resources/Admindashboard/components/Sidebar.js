import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button, MenuGroup,Stack
} from "@chakra-ui/react";
import {
  FiMenu,
  FiUserCheck,
} from "react-icons/fi";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import Logo from "../../../components/Logo";
import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdDomainVerification } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";
import { BsChatRight } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { FaDollarSign } from "react-icons/fa";


const LinkItems = [
  { name: "Home", icon: IoHomeOutline, link: "/admin/admin-dashboard/home" },
  { name: "Account Verification", icon: FiUserCheck, link: "/admin/admin-dashboard/account-verification" },
  { name: "Listing Verification", icon: MdDomainVerification, link: "/admin/admin-dashboard/listing-verification" },
  { name: "Investee Data", icon: CiViewTable, link: "/admin/admin-dashboard/all-investees" },
  { name: "Investor Data", icon: CiViewTable, link: "/admin/admin-dashboard/all-investors" },
  { name: "Transactions", icon: GrTransaction, link: "/admin/admin-dashboard/transactions" },
  { name: "Investments", icon: FaDollarSign, link: "/admin/admin-dashboard/investments" },

  { name: "Customer Support Chats", icon: BsChatRight, link: "/admin/admin-dashboard/all-support-chats" },




];
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Logo />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }) => {
  return (
    <NavLink
      as="a"
      to={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        fontSize={12}

        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {

  const [admin, setAdmin] = useState([]);

  const getAdmin = () => {
    const adminToken = window.localStorage.getItem('adminToken');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-admin`, {
      method: "GET",
      headers: {
        'token': adminToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((admin) => { setAdmin(admin.admin) })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    document.title = "Investify | Investee-Home";
    getAdmin();
  }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        < Logo />
      </Text>
      <Stack width={{ base: "none", md: "80%", lg: "100%" }}
        height={{ base: "none", md: "80%", lg: "100%" }} alignItems={"center"} justifyContent={"center"} display={{ base: "none", md: "flex" }}
      >
        <Stack
          height={{ base: "none", md: "none", lg: "100%" }}
          width={{ base: "none", md: "none", lg: "70%" }}
          backgroundImage="url('/images/navbartagline.png')"
          backgroundSize={"100% 100%"}
        ></Stack>
      </Stack>
      <HStack spacing={{ base: "0", md: "6" }}>

        <Flex alignItems={"center"}>
          <Menu>

            <HStack>

              <Menu>
                <MenuButton as={Button} >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://icons.veryicon.com/png/o/application/cloud-supervision-platform-vr10/admin-5.png"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Admin">
                    <MenuItem><Link to={"/admin/admin-dashboard/logout"}>Log Out</Link></MenuItem>

                  </MenuGroup>
                </MenuList>
              </Menu>
              <Box display={{ base: "none", md: "flex" }}>

              </Box>
            </HStack>


          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
// onClick={navigate('/admin-login', { replace: true })}
const Sidebar = ({ children }) => {


  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
