import { ethers } from "hardhat";
import { NFTMarket__factory, NFT__factory } from "../types";
describe("NftMarket", () => {
    it("Should create and execute market sales", async () => {
        const Market = (await ethers.getContractFactory(
            "NFTMarket"
        )) as NFTMarket__factory;
        const market = await Market.deploy();
        await market.deployed();

        const marketAddress = market.address;

        const NFT = (await ethers.getContractFactory("NFT")) as NFT__factory;
        const nft = await NFT.deploy(marketAddress);
        await nft.deployed();

        const nftContractAddress = nft.address;

        const _listingPrice = await market.getListingPrice();
        const listingPrice = _listingPrice.toString();

        const auctionPrice = ethers.utils.parseUnits("1", "ether");

        const transaction = await nft.createToken("https/hello");
        const tx = await transaction.wait() as any;
        const event = tx.events[0];
        const value = event.args[2];
        const tokenId = value.toNumber()
        console.log(tokenId)
        await nft.createToken("https/hello2");
        await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
            value: listingPrice,
        });
        await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
            value: listingPrice,
        });
        //bc first one is already in use
        const [_, buyerAddress] = await ethers.getSigners();

        await market
            .connect(buyerAddress)
            .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

        const _items = await market.fetchMarketItems();
        const items = await Promise.all(
            _items.map(async (i) => {
                const tokenURI = await nft.tokenURI(i.tokenId);
                return {
                    tokenURI,
                    price: i.price.toString(),
                    tokenId: i.tokenId.toString(),
                    seller: i.seller,
                    owner: i.owner,
                };
            })
        );
        console.log("items: ", items);
    });
});
