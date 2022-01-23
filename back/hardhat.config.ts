import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

const PROJECT_ID = process.env["project_id"] || "";
const PRIVATE_KEY = process.env["private_key"] || "";

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",

    solidity: {
        compilers: [{ version: "0.8.0", settings: {} }],
    },
    networks: {
        hardhat: {
            chainId: 1337,
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${PROJECT_ID}`,
            accounts: [PRIVATE_KEY],
        },
        mainnet: {
            url: `https://polygon-mainnet.infura.io/v3/${PROJECT_ID}`,
            accounts: [PRIVATE_KEY],
        },
    },
    typechain: {
        outDir: "types",
        alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
        externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    },
};

export default config;
