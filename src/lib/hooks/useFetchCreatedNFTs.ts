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
import Web3Modal from "web3modal";
import { parseNFT } from "../functions/parseNFT";
async function loadNFTS() {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const tokenContract = new ethers.Contract(
            nftAddress,
            NFT_DATA.abi,
            provider
        ) as NFT;

        const marketContract = new ethers.Contract(
            nftMarketAddress,
            Market_DATA.abi,
            signer
        ) as NFTMarket;

        const data = await marketContract.fetchItemsCreated();
        console.log(data)
        const items = await parseNFT(tokenContract, data);
        return items;
    } catch (error) {
        throw error;
    }
}

export function useFetchCreatedNFTs() {
    return useSWR("load-my-nft", loadNFTS);
}
