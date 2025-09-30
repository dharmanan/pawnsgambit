const hre = require("hardhat");

async function main() {
  const contractAddress = "0x4728c18001e621293fF9734E40a0679003630E72";
  const badgeId = 0; // Mintlemek istediğiniz rozetin id'si (örnek: en değerli rozet)
  const to = "0x6AA9A8C4B8774C9c38e79e228f4e2D9EFB1E02a2"; // Mintlenecek adres

  const [owner] = await hre.ethers.getSigners();
  const HulkBadges = await hre.ethers.getContractAt("HulkBadges", contractAddress);
  const tx = await HulkBadges.connect(owner).ownerMint(to, badgeId);
  await tx.wait();
  console.log(`Owner olarak ${to} adresine badgeId ${badgeId} mintlendi.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
