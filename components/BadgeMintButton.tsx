import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xB76362b681dFB81Eadc931c019c9B41B81aFca80"; // BadgeNFT adresi
const ABI = [
  "function mint(address to) public"
];

export default function BadgeMintButton() {
  const [status, setStatus] = useState("");

  async function handleMint() {
    if (!(window as any).ethereum) {
      setStatus("Metamask gerekli!");
      return;
    }
  setStatus("Mint işlemi başlatıldı...");
    try {
      // Ethers v5 ile Web3Provider
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.mint(await signer.getAddress());
      await tx.wait();
      setStatus("Rozet NFT başarıyla mintlendi!");
    } catch (err) {
      setStatus("Hata: " + (err as Error).message);
    }
  }

  return (
    <div>
      <button onClick={handleMint}>Rozet Mintle</button>
      <div>{status}</div>
    </div>
  );
}
