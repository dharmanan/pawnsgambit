require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20" },
      { version: "0.8.28" }
    ]
  },
  networks: {
    baseTestnet: {
      url: process.env.BASE_TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
