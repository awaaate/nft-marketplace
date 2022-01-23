import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Grid } from "@chakra-ui/react";
import React from "react";
import { Card } from "../../components/card/card.component";
import { Container } from "../../components/layout/Container";
import { NextLink } from "../../components/shared/NextLink";
import { buyNFT } from "../../lib/functions/buyNFT";
import { useFetchMyNFTs } from "../../lib/hooks/useFetchMyNFTs";

function MyCollection() {
    const { data, error, mutate } = useFetchMyNFTs();
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
                                    rightIcon={<ArrowForwardIcon />}
                                >
                                    <NextLink
                                        href={`collection/${item.tokenId}`}
                                    >
                                        Read
                                    </NextLink>
                                </Button>
                            }
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default MyCollection;
