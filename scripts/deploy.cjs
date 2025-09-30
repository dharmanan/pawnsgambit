const hre = require("hardhat");

async function main() {
  const HulkBadges = await hre.ethers.getContractFactory("HulkBadges");
  const contract = await HulkBadges.deploy();
  await contract.deployed();
  console.log("HulkBadges deployed to:", contract.address);

  // Rozet metadata'larını ekle
  // Yeni badge adresleme ve Vercel linkleriyle metadata
  const badgeMetas = [
    { id: 0, name: "En Değerli Rozet", description: "En değerli rozet", image: "https://pawnsgambit.vercel.app/badges/0.png" },
    { id: 1, name: "Seviye 3 1. Rozet", description: "Seviye 3 birinci rozet", image: "https://pawnsgambit.vercel.app/badges/1.png" },
    { id: 2, name: "Seviye 3 2. Rozet", description: "Seviye 3 ikinci rozet", image: "https://pawnsgambit.vercel.app/badges/2.png" },
    { id: 3, name: "Seviye 3 3. Rozet", description: "Seviye 3 üçüncü rozet", image: "https://pawnsgambit.vercel.app/badges/3.png" },
    { id: 4, name: "Seviye 2 1. Rozet", description: "Seviye 2 birinci rozet", image: "https://pawnsgambit.vercel.app/badges/4.png" },
    { id: 5, name: "Seviye 2 2. Rozet", description: "Seviye 2 ikinci rozet", image: "https://pawnsgambit.vercel.app/badges/5.png" },
    { id: 6, name: "Seviye 1 1. Rozet", description: "Seviye 1 birinci rozet", image: "https://pawnsgambit.vercel.app/badges/6.png" },
    { id: 7, name: "Seviye 1 2. Rozet", description: "Seviye 1 ikinci rozet", image: "https://pawnsgambit.vercel.app/badges/7.png" }
  ];

  for (const meta of badgeMetas) {
    await contract.setBadgeMeta(meta.id, meta.name, meta.description, meta.image, {
      gasPrice: hre.ethers.utils.parseUnits("30", "gwei")
    });
    console.log(`Badge ${meta.id} metadata set.`);
    await new Promise(r => setTimeout(r, 3000)); // 3 saniye bekle
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
