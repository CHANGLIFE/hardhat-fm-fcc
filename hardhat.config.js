require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("solidity-coverage");
require("dotenv").config();

const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  "https://eth-sepolia.g.alchemy.com/v2/5oZwL2ytjfI72WoBWF8CbsZAtKc20zrK";
const PRIVATE_KEY =
  process.PRIVATE_KEY ||
  "0x50f83af4c85da15581f0ae820883533b1c997306bfe0872b06eda58dd24f7b56";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
module.exports = {
  //solidity: "0.8.8",
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    sepolia: {
      chainId: 11155111,
      blockConfirmations: 6,
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
      //account 可视为本地主机账户
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH",
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },

    user: {
      default: 1,
    },
  },
};
