import { Box, BoxProps } from "@chakra-ui/react";

export interface ContainerProps {
    size: "md" | "sm" | "lg";
}

export const Container: React.FC<ContainerProps & BoxProps> = ({
    children,
    size = "md",
    ...props
}) => {
    return (
        <Box m="auto" maxW={`container.${size}`} w="100%" {...props}>
            {children}
        </Box>
    );
};
