import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

export interface TextFieldProps {
    name: string;
    label: string;
    description?: string;
}

export const TextField: React.FC<TextFieldProps & Partial<InputProps>> = ({
    name,
    label,
    ...rest
}) => {
    const [field, meta, helpers] = useField(name);
    return (
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
                {...field}
                rounded="sm"
                size="lg"
                variant="filled"
                bg="gray.50"
                _hover={{}}
                _focus={{
                    border: "2px solid",
                    borderColor: "gray.300",
                }}
                {...rest}
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};
