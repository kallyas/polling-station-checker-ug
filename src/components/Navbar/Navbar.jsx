import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink as RouterNavLink } from "react-router-dom"; // For active link styling
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSun } from "react-icons/ci";
import { IoMdMoon } from "react-icons/io";


import appLogo from "../../assets/logo.svg"; // Re-use logo or a smaller version

const Links = [
  { name: "Check Polling Station", path: "/" },
  { name: "Search History", path: "/history" },
];

const NavLink = ({ children, to }) => (
  <ChakraLink
    as={RouterNavLink}
    to={to}
    px={3}
    py={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("brand.100", "brand.700"),
    }}
    _activeLink={{
      fontWeight: "bold",
      bg: useColorModeValue("brand.200", "brand.600"),
      color: useColorModeValue("brand.700", "white"),
    }}
    style={({ isActive }) =>
      isActive
        ? {
            /* additional active styles if needed */
          }
        : {}
    }
  >
    {children}
  </ChakraLink>
);

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={bgColor}
      px={4}
      shadow="md"
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <IoIosCloseCircleOutline /> : <GiHamburgerMenu />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <ChakraLink
            as={RouterNavLink}
            to="/"
            _hover={{ textDecoration: "none" }}
          >
            <HStack>
              <Image src={appLogo} alt="App Logo" boxSize="40px" />
              <Heading
                size="md"
                color={useColorModeValue("brand.700", "brand.200")}
              >
                Polling Station Finder
              </Heading>
            </HStack>
          </ChakraLink>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <IoMdMoon /> : <CiSun />}
            aria-label="Toggle Color Mode"
            variant="ghost"
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default Navbar;
