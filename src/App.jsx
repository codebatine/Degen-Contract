import { ethers } from 'ethers';
import './App.css';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { abi, contractAddress } from './config.js';
import { Degens } from './components/Degens';
import { AddDegen } from './components/AddDegen.jsx';

if (window.ethereum) {
  window.provider = new ethers.BrowserProvider(window.ethereum);
} else {
  console.error('Error: Web3 wallet not found. Please install a Web3 wallet.');
}

function App() {
  const [wallet, setWallet] = useState({
    accounts: [],
    balance: '',
  });
  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();
  const [degens, setDegens] = useState([]);

  const updateWallet = useCallback(async (accounts) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      }),
    );
    setWallet({ accounts, balance });
  }, []);

  useEffect(() => {
    const getProvider = async () => {
      const degenReadContract = new ethers.Contract(
        contractAddress,
        abi,
        window.provider,
      );
      setReadContract(degenReadContract);

      const signer = await window.provider.getSigner();
      const degenWriteContract = new ethers.Contract(
        contractAddress,
        abi,
        signer,
      );
      setWriteContract(degenWriteContract);

      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      updateWallet(accounts);
    };

    getProvider();
  }, [updateWallet]);

  const populateDegens = useCallback(async () => {
    let indexes = await readContract['getIndexList']();

    let temp = [];
    for (let i = 0; i < indexes.length; i++) {
      const degen = await readContract['degens'](indexes[i]);

      if (degen.id > 0) temp.push(degen);
    }
    setDegens(temp);
  }, [readContract]);

  useEffect(() => {
    if (wallet && readContract) {
      populateDegens();
    }
  }, [wallet, readContract, populateDegens]);

  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(5);
    return balance;
  };

  return (
    <div className="app-container">
      <div className="spinning-D">D</div>
      <div className="degen-container">
        <h1>Degen Contract</h1>
        {wallet?.accounts.length > 0 && (
          <div className="wallet-info">
            <div>
              <span>Wallet Address:</span>
              <br></br> {wallet.accounts[0]}
            </div>
            <p>
              <span>Balance:</span>
              <br></br> {wallet.balance}
            </p>
          </div>
        )}

        {writeContract && (
          <Degens
            degens={degens}
            contract={writeContract}
            populateDegens={populateDegens}
          />
        )}

        <AddDegen
          writeContract={writeContract}
          populateDegens={populateDegens}
        />
      </div>
    </div>
  );
}

export default App;
