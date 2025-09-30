const hre = require("hardhat");

async function main() {
  const contractAddress = "0x9947A80e31Df881BFb505df3bD0A9cbB291ed619";
  const HulkBadges = await hre.ethers.getContractAt("HulkBadges", contractAddress);

  for (let badgeId = 0; badgeId <= 8; badgeId++) {
    try {
      const meta = await HulkBadges.badgeMetas(badgeId);
      console.log(`BadgeId ${badgeId}: name='${meta.name}', image='${meta.image}'`);
    } catch (err) {
      console.log(`BadgeId ${badgeId}: ERROR - ${err.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
