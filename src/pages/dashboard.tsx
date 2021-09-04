import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/card/card.component";
import { Container } from "../components/layout/Container";
import { buyNFT } from "../lib/functions/buyNFT";
import { useFetchCreatedNFTs } from "../lib/hooks/useFetchCreatedNFTs";
import { useFetchMyNFTs } from "../lib/hooks/useFetchMyNFTs";

function Dashboard() {
    const { data, error, mutate } = useFetchCreatedNFTs();
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
                            boxProps={{ onClick: () => buyNFT(item, mutate) }}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Dashboard;
