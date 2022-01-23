import { Box, Flex, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { Form, Formik } from "formik";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/dist/client/router";
import { Card } from "../components/card/card.component";
import { CreateItem } from "../components/create-item/CreateItem";
import { Container } from "../components/layout/Container";
import { createSale } from "../lib/functions/createSale";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0" as any);

const FormikForm = chakra(Form);
function Create() {
    const router = useRouter();

    async function onFileInputChange(file: any, setURL: any) {
        try {
            const added = await client.add(file, {
                progress: (prog) => console.log(`received: ${prog}`),
            });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setURL(url);
            //
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <Formik
                initialValues={{
                    price: "",
                    title: "",
                    description: "",
                    coverUrl: "",
                    pdfUrl: "",
                }}
                onSubmit={async (values) => {
                    const { title, price, pdfUrl, coverUrl, description } =
                        values;
                    const data = JSON.stringify({
                        title,
                        price,
                        description,
                        cover: coverUrl,
                        pdf: pdfUrl,
                    });
                    const added = await client.add(data);
                    createSale(
                        `https://ipfs.infura.io/ipfs/${added.path}`,
                        values,
                        () => {
                            router.push("/");
                        }
                    );
                }}
            >
                {({ getFieldProps, setFieldValue, values }) => (
                    <Container  size="lg" display="flex" mt="16">
                        <Box w="full">
                            <CreateItem
                                fileInputChange={(files) =>
                                    onFileInputChange(files, (url) =>
                                        setFieldValue("coverUrl", url)
                                    )
                                }
                            />
                        </Box>
                        <Box w="full" bg="gray.50" mx="4">
                            <Text m="4" fontSize="lg" textAlign="center">Preview</Text>
                            <Card
                                title={values.title}
                                cover={values.coverUrl}
                                description={values.description}
                                price={values.price}
                            />
                        </Box>
                        
                    </Container>
                )}
            </Formik>
        </Box>
    );
}

export default Create;
