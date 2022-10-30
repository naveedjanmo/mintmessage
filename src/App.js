import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import dayjs from 'dayjs';

import './styles/base.css';
import './styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import Logo from './components/Logo';
import Nav from './components/Nav';
import Footer from './components/Footer';

import abi from './utils/WavePortal.json';
import MessageForm from './components/MessageForm';
import MessagePreviewIpfs from './components/MessagePreviewIpfs';
import MessagePreview from './components/MessagePreview';
import IpfsTutorial from './components/IpfsTutorial';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
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
// - Fix drop shadow issue on message export
// - Improve design
//   - Improve twitter tag on svg
//   - Improve responsive design (make svg width responsive)
// - Add max character count to InputLarge
// - Add pre-filled @ to twitter input and an auto removal of @ if included by user
// ...
// - Smart contract - svg or ipfs?, see WB vids if need canvas save method

const App = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [message, setMessage] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [twitter, setTwitter] = useState('');
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

  // function formatDate(timestamp) {
  //   return dayjs(timestamp).format('DD MMMM YYYY');
  // }

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
              />
              <Footer />
            </div>
            <div className='right'>
              <MessagePreviewIpfs
                message={message}
                twitter={twitter}
                recipientAddress={recipientAddress}
              />
              {/* <MessagePreview
                message={message}
                twitter={twitter}
                recipientAddress={recipientAddress}
              /> */}
            </div>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
