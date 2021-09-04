import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    chakra,
    InputProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

const AutoResizeTextArea = chakra(TextareaAutosize)

export interface TextAreaProps {
    name: string;
    label: string;
    description?: string;
}

export const TextArea: React.FC<TextAreaProps & Partial<TextareaAutosizeProps>> = ({ name, label, ...rest }) => {
    const [field, meta, helpers] = useField(name);
    return (
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <AutoResizeTextArea
                {...field}
                minRows={3}
                resize="none"
                w="full"
                p="2"
                rounded="sm"
                size="lg"
                variant="filled"
                bg="gray.50"
                _hover={{}}
                _focus={{ 
                  border: "2px solid",
                  borderColor:"gray.300"
                }}
                {...rest}
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};
