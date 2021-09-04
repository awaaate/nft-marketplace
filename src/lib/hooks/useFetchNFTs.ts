import { ethers } from "ethers";
import {
    Market_DATA,
    nftAddress,
    nftMarketAddress,
    NFT_DATA,
} from "../constants/config";

import useSWR from "swr";
import { NFTMarket, NFT } from "../../../hardhat/types";
import { fetchData } from "../functions/fetchData";
async function loadNFTS() {
    try {
        const provider = new ethers.providers.JsonRpcProvider();

        const tokenContract = new ethers.Contract(
            nftAddress,
            NFT_DATA.abi,
            provider
        ) as NFT;

        const marketContract = new ethers.Contract(
            nftMarketAddress,
            Market_DATA.abi,
            provider
        ) as NFTMarket;

        const data = await marketContract.fetchMarketItems();
        const items = await Promise.all(
            data.map(async (i) => {
                const tokenURI = await tokenContract.tokenURI(i.tokenId);
                const data = await fetchData(tokenURI);
                const price = ethers.utils.formatUnits(
                    i.price.toString(),
                    "ether"
                );
                return {
                    tokenId: i.tokenId.toString(),
                    price,
                    seller: i.seller,
                    owner: i.owner,
                    image: data.image,
                    name: data.name,
                    description: data.description,
                };
            })
        );
      
        return items;
    } catch (error) {
        throw error;
    }
}

export function useFetchNFTs() {
    return useSWR("load-nft", loadNFTS);
}
