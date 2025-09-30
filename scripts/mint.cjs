const hre = require("hardhat");

async function main() {
  const contractAddress = "0x4C9C198bC9DCecb2d22e3a1C82052543E334cae2"; // Deploy edilen HulkBadges adresi
  const badgeId = 1; // Mintlenecek rozetin id'si

  const [signer] = await hre.ethers.getSigners();
  const HulkBadges = await hre.ethers.getContractAt("HulkBadges", contractAddress);
  const tx = await HulkBadges.connect(signer).mintBadge(badgeId);
  await tx.wait();
  console.log(`Minted badgeId ${badgeId} to: ${signer.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
