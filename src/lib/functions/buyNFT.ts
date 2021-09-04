import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { NFTMarket } from "../../../hardhat/types";
import { Market_DATA, nftAddress, nftMarketAddress } from "../constants/config";

export async function buyNFT(nft: any, onTransactionCompleted: Function) {
    const web3Model = new Web3Modal();
    const connection = await web3Model.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    console.log(nft)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        nftMarketAddress,
        Market_DATA.abi,
        signer
    ) as NFTMarket;

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const transaction = await contract.createMarketSale(
        nftAddress,
        nft.tokenId,
        { value: price }
    );
    await transaction.wait();
    onTransactionCompleted();
}
