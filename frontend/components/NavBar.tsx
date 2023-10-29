import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
// import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface Props {
  link: string;
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { link, children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={link}
    >
      {children}
    </Box>
  );
};

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        zIndex={10}
        position="fixed"
        width="100%"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <NavLink link="Main">
            <img
              src="images/peerprep-logo.png"
              alt="logo"
              style={{ width: "70px", height: "70px" }}
            />
          </NavLink>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {/* {colorMode === 'light' ? <MoonIcon /> : <SunIcon />} */}
                {colorMode === "light" ? "=" : "+"}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"images/snowy-profile-pic.png"}
                    style={{ border: "1px solid #444" }}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"images/snowy-profile-pic.png"}
                      style={{ border: "3px solid #444" }}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>
                    <NavLink link="/Profile">Profile</NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink link="/Login">Logout</NavLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
