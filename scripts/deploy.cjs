const hre = require("hardhat");

async function main() {
  const HulkBadges = await hre.ethers.getContractFactory("HulkBadges");
  const contract = await HulkBadges.deploy();
  await contract.deployed();
  console.log("HulkBadges deployed to:", contract.address);

  // Rozet metadata'larını ekle
  const badgeMetas = [
    {
      name: "Bilgin 1",
      description: "Seviye 1 Bilgin Rozeti",
      image: "https://yourdomain.com/badges/1.png"
    },
    {
      name: "Zeki 1",
      description: "Seviye 1 Zeki Rozeti",
      image: "https://yourdomain.com/badges/2.png"
    },
    {
      name: "Kurnaz 1",
      description: "Seviye 1 Kurnaz Rozeti",
      image: "https://yourdomain.com/badges/3.png"
    },
    {
      name: "Bilgin 2",
      description: "Seviye 2 Bilgin Rozeti",
      image: "https://yourdomain.com/badges/21.png"
    },
    {
      name: "Zeki 2",
      description: "Seviye 2 Zeki Rozeti",
      image: "https://yourdomain.com/badges/22.png"
    },
    {
      name: "Kurnaz 2",
      description: "Seviye 2 Kurnaz Rozeti",
      image: "https://yourdomain.com/badges/23.png"
    },
    {
      name: "Bilgin 3",
      description: "Seviye 3 Bilgin Rozeti",
      image: "https://yourdomain.com/badges/31.png"
    },
    {
      name: "Zeki 3",
      description: "Seviye 3 Zeki Rozeti",
      image: "https://yourdomain.com/badges/32.png"
    },
    {
      name: "Kurnaz 3",
      description: "Seviye 3 Kurnaz Rozeti",
      image: "https://yourdomain.com/badges/33.png"
    }
  ];

  for (let i = 0; i < badgeMetas.length; i++) {
    const meta = badgeMetas[i];
    await contract.setBadgeMeta(i, meta.name, meta.description, meta.image, {
      gasPrice: hre.ethers.utils.parseUnits("30", "gwei")
    });
    console.log(`Badge ${i} metadata set.`);
    await new Promise(r => setTimeout(r, 3000)); // 3 saniye bekle
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
