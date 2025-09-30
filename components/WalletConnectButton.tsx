
import React, { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnectButton: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);

  // Dil kontrolü
  const lang = navigator.language.startsWith('tr') ? 'tr' : 'en';
  const walletText = lang === 'tr' ? 'Cüzdan' : 'Wallet';

  const connectWallet = async () => {
    setError(null);
    if (window.ethereum) {
      try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);
        await _provider.send('eth_requestAccounts', []);
        const signer = _provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const networkInfo = await _provider.getNetwork();
        setNetwork(networkInfo.name ? networkInfo.name : `ChainId: ${networkInfo.chainId}`);
      } catch (err: any) {
        setError(err.message || 'Bağlantı hatası');
      }
    } else {
      setError('Metamask veya uyumlu bir cüzdan bulunamadı.');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setNetwork(null);
    setProvider(null);
  };

  return (
    <div className="flex flex-col items-center mt-2 mb-2">
      {error && <span className="text-red-400 mb-2 text-sm">{error}</span>}
      {!account ? (
        <button
          className="bg-gradient-to-b from-blue-600 to-blue-800 text-white font-bold py-2 px-5 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition"
          onClick={connectWallet}
        >
          {walletText}
        </button>
      ) : (
        <div className="flex items-center space-x-3 bg-blue-900/80 px-4 py-2 rounded-lg">
          <button
            className="focus:outline-none"
            onClick={disconnectWallet}
            title={lang === 'tr' ? 'Bağlantıyı Kes' : 'Disconnect'}
            style={{ lineHeight: 0 }}
          >
            <span className="inline-block align-middle">
              <svg width="28" height="28" viewBox="0 0 28 28" className="" style={{ display: 'inline' }}>
                <circle cx="14" cy="14" r="13" fill="#ff4d4f" />
                <path d="M9 9 L19 19 M19 9 L9 19" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <span className="text-white font-mono text-base">
            {account ? account.slice(-6) : ''}
          </span>
          <span className="font-extrabold text-white text-base drop-shadow-lg">
            BASE SEPOLIA
          </span>
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
