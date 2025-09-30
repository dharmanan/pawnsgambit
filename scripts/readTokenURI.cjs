const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const contractAddress = "0x4C9C198bC9DCecb2d22e3a1C82052543E334cae2";
  const tokenId = 0; // Mintlenen ilk rozetin tokenId'si
  const HulkBadges = await ethers.getContractAt("HulkBadges", contractAddress);
  const tokenURI = await HulkBadges.tokenURI(tokenId);
  console.log("Raw tokenURI:", tokenURI);
  if (tokenURI.startsWith("data:application/json;base64,")) {
    const base64 = tokenURI.replace("data:application/json;base64,", "");
    const json = Buffer.from(base64, "base64").toString("utf8");
    console.log("Decoded metadata:", json);
  } else {
    console.log("tokenURI is not base64 encoded.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
