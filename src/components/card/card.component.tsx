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
    image: string;
    description: string;
    price: string;
    boxProps?: BoxProps;
}

export const Card: React.FC<CardProps> = ({
    image,
    description,
    price,
    boxProps,
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
                    _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${image})`,
                        filter: "blur(15px)",
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: "blur(20px)",
                        },
                    }}
                >
                    <Image
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={image}
                    />
                </Box>
                <Stack pt={10} align={"center"}>
                    <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                    >
                        {description}
                    </Heading>
                    <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={800} fontSize={"xl"}>
                            {price}
                        </Text>
                    </Stack>
                    <Button w="full" leftIcon={<UnlockIcon />} rounded="sm"> 
                        Buy
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
};
