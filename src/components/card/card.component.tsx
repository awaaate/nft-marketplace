import { UnlockIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    BoxProps,
    Button,
} from "@chakra-ui/react";
import React from "react";

export interface CardProps {
    cover: string;
    description: string;
    title: string;
    price: string;
    actionButton?: React.ReactNode;
    boxProps?: BoxProps;
}

export const Card: React.FC<CardProps> = ({
    cover,
    title,
    description,
    price,
    boxProps,
    actionButton,
    ...props
}) => {
    return (
        <Center py={12}>
            <Box
                role={"group"}
                p={6}
                maxW={"330px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"sm"}
                pos={"relative"}
                zIndex={1}
                {...boxProps}
            >
                <Box
                    rounded={"lg"}
                    mt={-12}
                    pos={"relative"}
                    height={"230px"}
                    bg="gray.800"
                >
                    <Image
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={cover}
                    />
                </Box>
                <Stack pt={10} align={"center"}>
                    <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                    >
                        {title}
                    </Heading>
                    <Stack direction={"column"} align={"center"}>
                        <Text fontWeight={800} fontSize={"xl"}>
                            {price || 1} Ξ
                        </Text>
                        <Text textColor="gray.600">{description}</Text>
                    </Stack>
                    {actionButton}
                </Stack>
            </Box>
        </Center>
    );
};
