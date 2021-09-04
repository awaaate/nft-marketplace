import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { ethers } from "ethers";
import { Form, Formik } from "formik";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { add } from "lodash";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent } from "react";
import Web3Modal from "web3modal";
import { NFT, NFTMarket } from "../../hardhat/types";
import { CreateItem } from "../components/create-item/CreateItem";
import {
    Market_DATA,
    nftAddress,
    nftMarketAddress,
    NFT_DATA,
} from "../lib/constants/config";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0" as any);

const FormikForm = chakra(Form);
function Create() {
    const router = useRouter();

    async function onFileInputChange(file: any, setURL: any) {
        try {
            const added = await client.add(file, {
                progress: (prog) => console.log(`received: ${prog}`),
            });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setURL(url);
            //
        } catch (error) {
            console.log(error);
        }
    }
    async function createSale(url: string, values: any) {
        const web3Model = new Web3Modal();
        const connection = await web3Model.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        const NFTContract = new ethers.Contract(
            nftAddress,
            NFT_DATA.abi,
            signer
        ) as NFT;
        console.log(values);
        let transaction = await NFTContract.createToken(url);
        const tx = await transaction.wait();

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

        router.push("/");
    }
    return (
        <Box>
            <Formik
                initialValues={{
                    price: "",
                    name: "",
                    description: "",
                    fileUrl: "",
                }}
                onSubmit={async (values) => {
                    const { name, fileUrl, description } = values;
                    const data = JSON.stringify({
                        name,
                        description,
                        image: fileUrl,
                    });
                    const added = await client.add(data);
                    createSale(
                        `https://ipfs.infura.io/ipfs/${added.path}`,
                        values
                    );
                }}
            >
                {({ getFieldProps, setFieldValue }) => (
                    <CreateItem
                        fileInputChange={(files) =>
                            onFileInputChange(files, (url) =>
                                setFieldValue("fileUrl", url)
                            )
                        }
                    />
                )}
            </Formik>
        </Box>
    );
}

export default Create;
