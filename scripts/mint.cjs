const hre = require("hardhat");

async function main() {
  const contractAddress = "0x9947A80e31Df881BFb505df3bD0A9cbB291ed619"; // Son deploy edilen adres
  const badgeId = 0; // Mintlenecek rozetin id'si
  const to = "0x6AA9A8C4B8774C9c38e79e228f4e2D9EFB1E02a2"; // Mintlenecek adres (örnek)

  const HulkBadges = await hre.ethers.getContractAt("HulkBadges", contractAddress);
  const tx = await HulkBadges.ownerMint(to, badgeId);
  await tx.wait();
  console.log(`Owner minted badgeId ${badgeId} to: ${to}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
