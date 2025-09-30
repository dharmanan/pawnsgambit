const hre = require("hardhat");

async function main() {
  const BadgeNFT = await hre.ethers.getContractFactory("BadgeNFT");
  const badgeNFT = await BadgeNFT.deploy();
  await badgeNFT.deployed();
  console.log("BadgeNFT deployed to:", badgeNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
