import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { NFT, NFTMarket } from "../../../hardhat/types";
import {
    Market_DATA,
    nftAddress,
    nftMarketAddress,
    NFT_DATA,
} from "../../lib/constants/config";

export async function createSale(
    url: string,
    values: any,
    onCreated: Function
) {
    const web3Model = new Web3Modal();
    const connection = await web3Model.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const NFTContract = new ethers.Contract(
        nftAddress,
        NFT_DATA.abi,
        signer
    ) as NFT;

    let transaction = await NFTContract.createToken(url);
    const tx = await transaction.wait();
    console.log(tx);
    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(values.price.toString(), "ether");

    const NFTMarketContract = new ethers.Contract(
        nftMarketAddress,
        Market_DATA.abi,
        signer
    ) as NFTMarket;

    const _listingPrice = await NFTMarketContract.getListingPrice();
    const listingPrice = _listingPrice.toString();

    transaction = await NFTMarketContract.createMarketItem(
        nftAddress,
        tokenId,
        price,
        { value: listingPrice }
    );
    await transaction.wait();

    onCreated();
}
