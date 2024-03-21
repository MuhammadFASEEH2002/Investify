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
  Button,
  MenuGroup,
  MenuList,
  MenuItem,
  useToast
} from "@chakra-ui/react";
import {
  FiMenu,
  FiList,
  FiEdit,
} from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from "../../../components/Logo";
import { useEffect} from "react";
import { BsChatRight } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import useInvestee from "../../../providers/investeeStore";
import { FaDollarSign } from "react-icons/fa";

const LinkItems = [
  { name: "Home", icon: IoHomeOutline, link: "/user/investee-dashboard/home", dropdown: false },
  { name: "Create Listing", icon: FiEdit, link: "/user/investee-dashboard/listing-creation", dropdown: false },
  { name: "Listings", icon: FiList, link: "#", dropdown: true, dropdownIcon: RiArrowDropDownLine, dropdownItem: [{ name: "Active Listings", link: "/user/investee-dashboard/investee-listings" }, { name: "Deleted Listings", link: "/user/investee-dashboard/investee-listing-history" }] },
  { name: "Chats", icon: BsChatRight, link: "/user/investee-dashboard/chat" },
  // { name: "Deleted Listings", icon: FiList, link: "/user/investee-dashboard/investee-listing-history" },
  { name: "My Investments", icon: FaDollarSign, link: "#", dropdown: false },
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
    // overflowY={"scroll"}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Logo />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (

        link.dropdown ? (<>
          <Menu >
            <Flex
              p={4}
              mx={4}
              alignItems={"center"} justifyContent={"flex-start"}
              borderRadius="lg"
              cursor="pointer"
              _hover={{
                bg: "cyan.400",
                color: "white",
              }}
              bg="white"
              color="black"
              fontSize={12}
              as={Button}
              width={"87%"}>
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={link.icon}
              />
              <MenuButton width={"100%"} height={"10"} textAlign={"start"}>
                {link.name}
              </MenuButton>
              <Icon
                ml="4"
                fontSize="20"
                _groupHover={{
                  color: "white",
                }}
                display={"flex"} as={link.dropdownIcon} />
            </Flex>

            <MenuList>
              <MenuGroup>
                {link.dropdownItem.map(dropdown => (
                  <Link to={dropdown.link}> <MenuItem>{dropdown.name}</MenuItem></Link>
                ))}
              </MenuGroup>
            </MenuList>
          </Menu>
        </>) : (<> <NavItem key={link.name} icon={link.icon} link={link.link} >
          {link.name}
        </NavItem></>)
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
        fontSize={12}
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

  // const [investee, setInvestee] = useState([]);
  const setInvestee = useInvestee((state) => state?.setInvestee)
  const investee = useInvestee((state) => state?.investees)

  const toast = useToast()
  const navigate = useNavigate();

  const getUser = () => {
    try {
      console.log(investee)
      if (isEmptyObject(investee)) {
        const token = window.localStorage.getItem('token');
        fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/get-user`, {
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
              setInvestee(res.investee)
            } else {
              console.log("error")
            }
          })
          .catch((err) => console.log(err));
      } else { console.log("investor data is present") }

    } catch (error) {
      console.log(error)
    }

  };
  useEffect(() => {
    document.title = "Investify | Investee-Home";
    try {
      getUser();
    } catch (error) {
      navigate("/")
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

      <HStack spacing={{ base: "0", md: "6" }}>

        <Flex alignItems={"center"}>
          <Menu>
            <HStack>

              <Menu>
                <MenuButton as={Button} >
                  <Avatar
                    size={"sm"}
                    src={"/images/investee_image.png"}

                  />
                </MenuButton>
                <MenuList>
                  <MenuGroup title={investee?.businessName}>
                    <MenuItem><Link to={"#"}>Chats</Link></MenuItem>
                    <MenuItem><Link to={"/user/investee-dashboard/password-change"}>Change Password</Link></MenuItem>
                    <MenuItem><Link to={"/user/investee-dashboard/notifications"}>Notifications</Link></MenuItem>
                    <MenuItem><Link to={"/user/investee-dashboard/logout"}>Log Out</Link></MenuItem>


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
