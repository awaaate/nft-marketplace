import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Center, Container, Stack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { Form, useFormikContext } from "formik";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { NumberField } from "../form/NumberField";
import { TextArea } from "../form/TextArea";
import { TextField } from "../form/TextField";

const FormikForm = chakra(Form);
export interface CreateItemProps {
    fileInputChange: any;
}

export const CreateItem: React.FC<CreateItemProps> = ({ fileInputChange }) => {
    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            fileInputChange(reader.result);
        };
        reader.readAsArrayBuffer(acceptedFiles[0]);
    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop,
    });
    const { isSubmitting } = useFormikContext();
    return (
        <>
            <FormLabel htmlFor="cover">Cover</FormLabel>
            <Box
                {...getRootProps({ className: "dropzone" })}
                color="gray.300"
                py="16"
                rounded="sm"
                my="4"
                border="3px dashed"
                textAlign="center"
                cursor="pointer"
            >
                <Center>
                    <input {...getInputProps()} name="cover" />
                    <p>
                        Drag 'n' drop the cover of your manga, <br />
                        or click here to upload
                    </p>
                </Center>
            </Box>
            <FormikForm>
                <Stack>
                    <TextField name="title" label="Title" />
                    <TextField name="pdfUrl" label="Pdf Url" type="url" />

                    <TextArea
                        name="description"
                        label="Description"
                        placeholder="Description of my manga"
                    />
                    <NumberField name="price" label="Price" />
                    <Button
                        rightIcon={<ArrowForwardIcon />}
                        rounded="sm"
                        mt="8"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                    >
                        Create
                    </Button>
                </Stack>
            </FormikForm>
        </>
    );
};
