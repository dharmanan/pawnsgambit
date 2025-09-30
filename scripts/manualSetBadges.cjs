const hre = require("hardhat");

async function main() {
  const contractAddress = "0x4C9C198bC9DCecb2d22e3a1C82052543E334cae2"; // Güncel kontrat adresi
  const HulkBadges = await hre.ethers.getContractAt("HulkBadges", contractAddress);

  // Tüm rozetler için metadata
  const badgeMetas = [
    { name: "Bilgin 1", description: "Seviye 1 Bilgin Rozeti", image: "https://your-vercel-app.vercel.app/badges/1.png" },
    { name: "Zeki 1", description: "Seviye 1 Zeki Rozeti", image: "https://your-vercel-app.vercel.app/badges/2.png" },
    { name: "Kurnaz 1", description: "Seviye 1 Kurnaz Rozeti", image: "https://your-vercel-app.vercel.app/badges/3.png" },
    { name: "Bilgin 2", description: "Seviye 2 Bilgin Rozeti", image: "https://your-vercel-app.vercel.app/badges/21.png" },
    { name: "Zeki 2", description: "Seviye 2 Zeki Rozeti", image: "https://your-vercel-app.vercel.app/badges/22.png" },
    { name: "Kurnaz 2", description: "Seviye 2 Kurnaz Rozeti", image: "https://your-vercel-app.vercel.app/badges/23.png" },
    { name: "Bilgin 3", description: "Seviye 3 Bilgin Rozeti", image: "https://your-vercel-app.vercel.app/badges/31.png" },
    { name: "Zeki 3", description: "Seviye 3 Zeki Rozeti", image: "https://your-vercel-app.vercel.app/badges/32.png" },
    { name: "Kurnaz 3", description: "Seviye 3 Kurnaz Rozeti", image: "https://your-vercel-app.vercel.app/badges/33.png" }
  ];

  for (let i = 0; i < badgeMetas.length; i++) {
    const meta = badgeMetas[i];
    await HulkBadges.setBadgeMeta(i + 1, meta.name, meta.description, meta.image, {
      gasPrice: hre.ethers.utils.parseUnits("30", "gwei")
    });
    console.log(`Badge ${i + 1} metadata set.`);
    await new Promise(r => setTimeout(r, 2000)); // 2 saniye bekle
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
