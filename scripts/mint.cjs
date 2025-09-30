const hre = require("hardhat");

async function main() {
  const contractAddress = "0xB76362b681dFB81Eadc931c019c9B41B81aFca80"; // Deploy edilen BadgeNFT adresi
  const to = "0xKULLANICI_ADRESI"; // Mint edilecek adresi buraya yaz

  const BadgeNFT = await hre.ethers.getContractAt("BadgeNFT", contractAddress);
  const tx = await BadgeNFT.mint(to);
  await tx.wait();
  console.log(`Minted badge NFT to: ${to}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
