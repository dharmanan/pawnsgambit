import { ethers } from "@nomicfoundation/hardhat-ethers";
import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const BadgeNFTFactory = await hre.ethers.getContractFactory("BadgeNFT");
  const badgeNFT = await BadgeNFTFactory.connect(deployer).deploy();
  await badgeNFT.deployed();
  console.log("BadgeNFT deployed to:", badgeNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
