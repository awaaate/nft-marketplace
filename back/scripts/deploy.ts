import { ethers } from "hardhat";

async function main() {
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.deploy();
    nftMarket.deployed();

    console.log("NFTMarket", nftMarket.address);
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(nftMarket.address);
    nft.deployed();

    console.log("NFT address: ", nft.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
