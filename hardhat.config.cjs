
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
	solidity: "0.8.28",
	networks: {
		baseSepolia: {
			url: process.env.BASE_TESTNET_RPC_URL,
			accounts: [process.env.PRIVATE_KEY],
			chainId: 84532,
		},
	},
};
