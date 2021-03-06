import { Box, Button, Grid } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/card/card.component";
import { Container } from "../components/layout/Container";
import { buyNFT } from "../lib/functions/buyNFT";
import { useFetchNFTs } from "../lib/hooks/useFetchNFTs";

function Index() {
    const { data, error, mutate } = useFetchNFTs();
    console.log(error);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <Box>
            <Container size="lg">
                <Grid gridTemplateColumns={`repeat(3, 1fr)`}>
                    {data.map((item) => (
                        <Card
                            {...item}
                            key={item.tokenId}
                            actionButton={
                                <Button
                                    w="full"
                                    rounded="sm"
                                    onClick={() => buyNFT(item, mutate)}
                                >
                                    Buy
                                </Button>
                            }
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Index;
