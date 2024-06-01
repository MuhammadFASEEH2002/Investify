import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button, MenuGroup, Stack
} from "@chakra-ui/react";
import {
  FiHome,
  FiMenu,
  FiLogOut,
  FiList
} from "react-icons/fi";
import { IconType } from "react-icons";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from "../../../components/Logo";
import { useEffect, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import useInvestor from "../../../providers/investorStore";
import { db } from '../../../utils/firebase';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { FaDollarSign } from "react-icons/fa";


const LinkItems = [
  { name: "Home", icon: FiHome, link: "/user/investor-dashboard/home" },
  { name: "Business Catalog", icon: FiList, link: "/user/investor-dashboard/business-catalog" },
  { name: `Chats`, icon: BsChatRight, link: "/user/investor-dashboard/chat" },
  { name: "My Investments", icon: FaDollarSign, link: "/user/investor-dashboard/investments", dropdown: false },

  // { name: "My Investments", icon: FiCompass },
  // { name: "Chats", icon: FiStar },
  // { name: "Settings", icon: FiSettings },
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
        {...rest}
        fontSize="12"

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
  const messagesRef = collection(db, 'messages');
  const navigate = useNavigate()
  const setInvestor = useInvestor((state) => state?.setInvestor)
  const investor = useInvestor((state) => state?.investors)
  const [totalNotifications, setTotalNotifications] = useState('');

  const getUser = () => {
    try {
      console.log(investor)
      if (isEmptyObject(investor)) {
        const token1 = window.localStorage.getItem('token1');
        fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/get-user`, {
          method: "GET",
          headers: {
            'token': token1,
            'Accept': "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status) {
              setInvestor(res.investor);
            }
            else {
              console.log("error")
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log("investor data is present")
      }
    } catch (error) {
      console.log(error)
    }

  };
  const getStats = () => {
    // setLoading(true)

    const token = window.localStorage.getItem('token1');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/get-stats`, {
      method: "GET",
      headers: {
        'token': token,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          // setTotalListingCount(res.TotalListingCount)
          // setActiveListingCount(res.ActiveListingCount)
          // setTotalAmount(res.totalAmount)
          // setTotalNotifications(res.TotalNotifications)
          // setLoading(false)
          setTotalNotifications(res.TotalUnreadNotifications)

        } else {
          // toast({
          //   title: "Network Error, Reload Again",
          //   status: "error",
          //   duration: 9000,
          //   isClosable: true,
          //   position: "top",
          // });
          // setLoading(false)

        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-Home";
      getUser();
      getStats()
    } else {
      navigate("/user-login");
    }
  }, []);
  const isEmptyObject = (obj) => {
    return obj ? Object.keys(obj).length === 0 : true;
  };
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
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={"center"}>
          <Menu>

            <HStack>
              <Menu>
                <MenuButton as={Button} >
                  <Avatar
                    size={"sm"}
                    src={"/images/investor_image.png"}
                  />
                </MenuButton>
                <MenuList>
                  <MenuGroup title={`${investor?.firstName} ${investor?.lastName}`}>
                    <MenuItem><Link to={"#"}>Chats</Link></MenuItem>
                    <MenuItem><Link to={"/user/investor-dashboard/notifications"}>Notifications   <span style={{
                      color: 'white',
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      padding: '4px 8px',
                      display: 'inline-block',
                      textAlign: 'center',
                      minWidth: '20px'
                    }}>
                      {totalNotifications}
                    </span></Link></MenuItem>
                    <MenuItem><Link to={`/user/investor-dashboard/chat-support/65d88f93e5d99c47ee8df0dd/${investor?._id}`}>Chat Support</Link></MenuItem>
                    <MenuItem><Link to={"/user/investor-dashboard/logout"}>Log Out</Link></MenuItem>

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
