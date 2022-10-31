import React, { useState } from 'react';
// import { ethers } from 'ethers';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import './styles/base.css';
import './styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import Nav from './components/Nav';
import Footer from './components/Footer';

// import abi from './utils/WavePortal.json';
import MessageForm from './components/MessageForm';
import MessagePreview from './components/MessagePreview';
import MintButton from './components/MintButton';

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider(),
  ]
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

// TODO
// v1
// - Write and deploy smart contract (basically the same contract as BS loot project but with:
//   (1) update metadata link instead of update text (2) a way to adjust mint price, post-deploy)
// - Hook up mint button per sudo code in MessagePreview.js
// v2
// - Add a character count indicator to message input
// - Add ens support
// - Disable forms until wallet connected / add UX to achieve this UB

const App = () => {
  // const [currentAccount, setCurrentAccount] = useState('');
  const [message, setMessage] = useState(
    `Hello! I'm interested in buying Dickbutt #420. I've made a bunch of offers on OpenSea to no avail! Please reach out via Twitter DMs if you want to make a deal.`
  );
  const [recipientAddress, setRecipientAddress] = useState(
    '0x1F19FaF55eF10deB3Df7002265EFa583bE14AFAb'
  );
  const [twitter, setTwitter] = useState('naveedjanmo');
  const [isLoading, setIsLoading] = useState(false);

  // const contractAddress = '0xce863A6B77a8847A850390da094608ef2976F47d';
  // const contractABI = abi.abi;

  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       console.log('Make sure you have metamask!');
  //       return;
  //     } else {
  //       console.log('We have the ethereum object', ethereum);
  //     }

  //     const accounts = await ethereum.request({ method: 'eth_accounts' });

  //     if (accounts.length !== 0) {
  //       const account = accounts[0];
  //       console.log('Found an authorized account:', account);
  //       setCurrentAccount(account);
  //     } else {
  //       console.log('No authorized account found');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const wave = async () => {
  //   try {
  //     setIsLoading(true);
  //     console.log(isLoading);
  //     const { ethereum } = window;

  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const wavePortalContract = new ethers.Contract(
  //         contractAddress,
  //         contractABI,
  //         signer
  //       );

  //       let count = await wavePortalContract.getTotalWaves();
  //       console.log('Retrieved total wave count...', count.toNumber());

  //       const waveTxn = await wavePortalContract.wave(message);
  //       // console.log(isLoading);

  //       console.log('Mining...', waveTxn.hash);
  //       await waveTxn.wait();

  //       console.log('Mined -- ', waveTxn.hash);

  //       count = await wavePortalContract.getTotalWaves();
  //       console.log('Retrieved total wave count...', count.toNumber());
  //     } else {
  //       console.log("Ethereum object doesn't exist!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: '#C850C0',
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
        })}
      >
        <main>
          <Nav />
          <section className='content-wrap'>
            <div className='left'>
              <MessageForm
                // wave={wave}
                onRecipientChange={setRecipientAddress}
                onMessageChange={setMessage}
                onTwitterChange={setTwitter}
                isLoading={isLoading}
                loading={setIsLoading}
                twitter={twitter}
                setTwitter={setTwitter}
              />
              <Footer />
            </div>
            <div className='right'>
              <MessagePreview
                message={message}
                twitter={twitter}
                recipientAddress={recipientAddress}
              />
            </div>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
