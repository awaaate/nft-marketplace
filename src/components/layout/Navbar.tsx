import { ReactNode } from "react";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Text,
    useDisclosure,
    useColorModeValue,
    Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { NextLink } from "../shared/NextLink";
import { Logo } from "../svg/logo";
const Links = [{ name: "My Collection", link: "collection" }];

const NavLink: React.FC<typeof Links[0]> = ({ name, link }) => (
    <NextLink
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={link}
    >
        {name}
    </NextLink>
);

export function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box
                bg="white"
                px={4}
                borderBottom="3px solid"
                borderColor="gray.50"
            >
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={"center"}>
                        <NextLink href="/" textColor="blue.400">
                            <Logo fill={"blue"} />
                        </NextLink>
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            {Links.map((item) => (
                                <NavLink key={item.link} {...item} />
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        <NextLink href="/create">
                            <Button size={"sm"} mr={4} leftIcon={<AddIcon />}>
                                Create
                            </Button>
                        </NextLink>
                        <NextLink
                            display="flex"
                            alignItems="center"
                            href="/dashboard"
                        >
                            <Avatar size="sm"></Avatar>
                            <Text ml="2">Dashboard</Text>
                        </NextLink>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {Links.map((item) => (
                                <NavLink key={item.link} {...item} />
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
