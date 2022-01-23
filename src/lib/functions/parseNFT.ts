import { ethers } from "ethers";
import { NFT } from "../../../hardhat/types";
import { fetchData } from "./fetchData";

export async function parseNFT(contract: NFT, items: any[]) {
    return await Promise.all(
        items.map(async (i) => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            const data = await fetchData(tokenURI);
            const price = ethers.utils.formatUnits(i.price.toString(), "ether");
            return {
                tokenId: i.tokenId.toString(),
                price,
                seller: i.seller,
                owner: i.owner,
                cover: data.cover,
                pdf: data.pdf,
                title: data.title,
                description: data.description,
            };
        })
    );
}
