import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ethers } from 'ethers';
import abi from './utils/WavePortal.json';

import './styles/base.css';
import './styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import Logo from './components/Logo';
import Nav from './components/Nav';
import EthName from './components/EthName';

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [message, setMessage] = useState('Hello there Saylor ⛵️');
  const [recipientAddress, setRecipientAddress] = useState(
    '0x8657A1fc66eDFEBba90884F8Efb644264b1497D1'
  );
  const [twitter, setTwitter] = useState('@naveedjanmo');

  const contractAddress = '0xce863A6B77a8847A850390da094608ef2976F47d';
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have metamask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setCurrentAccount(account);
      } else {
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log('Retrieved total wave count...', count.toNumber());

        /*
         * Execute the actual wave from your smart contract
         */
        const waveTxn = await wavePortalContract.wave(message);
        console.log('Mining...', waveTxn.hash);

        await waveTxn.wait();
        console.log('Mined -- ', waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log('Retrieved total wave count...', count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function formatDate(timestamp) {
  //   return dayjs(timestamp).format('DD MMMM YYYY');
  // }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        chains={chains}
        theme={lightTheme({
          accentColor: '#C850C0',
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
        })}
      >
        <main>
          <header>
            <Logo />
            <Nav />
          </header>
          <section className="contentWrapper">
            <div className="dataContainer">
              <div>
                <div className="introWrap">
                  {/* <h1>New message</h1> */}
                  <p>
                    Use this site to airdrop anyone on Ethereum a message as an
                    NFT. It's free to use—just pay gas. Reach out on{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://twitter.com/naveedjanmo"
                    >
                      Twitter
                    </a>{' '}
                    if run into any issues.
                  </p>
                </div>

                <div className="formWrap">
                  <form action="" method="get" class="">
                    <div className="textWrapper">
                      <label htmlFor="recipientAddress">
                        Recipient Address
                      </label>
                      <input
                        id="recipientAddress"
                        className="textAreaSmall"
                        value={recipientAddress}
                        onChange={(ev) => setRecipientAddress(ev.target.value)}
                      />
                    </div>

                    <div className="textWrapper">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        className="textAreaLarge"
                        value={message}
                        onChange={(ev) => setMessage(ev.target.value)}
                      />
                    </div>

                    {/* <h2 className="formSub">Your contact details</h2> */}

                    <div className="textWrapper">
                      <label htmlFor="message">Your Twitter</label>
                      <textarea
                        id="message"
                        className="textAreaSmall"
                        value={twitter}
                        onChange={(ev) => setTwitter(ev.target.value)}
                      ></textarea>
                    </div>
                  </form>

                  {/* <div className="mintButtonWrap">
                  <div className="mintInfo">
                    <div className="mintInfoLeft">
                      <p>Mint: 0.02 ETH</p>
                    </div>
                    <div className="mintInfoRight">Gas: 0.0192 ETH</div>
                  </div> */}
                  <button className="mintButton" onClick={() => wave(message)}>
                    Mint
                  </button>
                  {/* </div> */}
                </div>
              </div>

              <div className="footer">
                <p>
                  made by{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/naveedjanmo"
                  >
                    @naveedjanmo
                  </a>
                </p>
                <p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://etherscan.io/"
                  >
                    contract address
                  </a>
                </p>
              </div>
            </div>

            <div className="previewContainer">
              <div className="svgWrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin meet"
                  viewBox="0 0 350 350"
                >
                  <rect width="100%" height="100%" fill="black" />
                  <text
                    x="50%"
                    y="50%"
                    style={{ fill: 'white', fontFamily: 'serif', fontSize: 24 }}
                    dominant-baseline="middle"
                    text-anchor="middle"
                  >
                    {message}
                  </text>
                </svg>
              </div>
            </div>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
