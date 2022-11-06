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
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import html2canvas from 'html2canvas';

import { mintMessageAddress } from './utils/config';
import MintMessage from './utils/MintMessage.json';

/* IPFS */
const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_KEY;
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

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
//      - Dont use string to store ipfs token id, its much more expensive to store strings in Soldity/byte
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

  const [formInput, updateFormInput] = useState({
    name: 'MintMessage',
    description: 'A message from across the ether.',
  });

  async function createNFT() {
    const { name, description } = formInput;
    const { ethereum } = window;

    try {
      setIsLoading(true);
      /* Pick and export div as image */
      const element = document.getElementById('message-export'),
        canvas = await html2canvas(element, {
          backgroundColor: 'rgba(0,0,0,0)',
          scale: 3,
        }),
        file = canvas.toDataURL('image/jpg'),
        link = document.createElement('a');
      link.href = file;

      /* Upload image to IPFS and store link in state */
      let added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      let url = `https://infura-ipfs.io/ipfs/${added.path}`; // Image URL
      console.log(`Image URL: ${url}`);
      // setFileUrl(url);

      /* Create NFT metadata and upload to IPFS */
      if (!name || !description || !url) return;
      const data = JSON.stringify({
        name,
        description,
        image: url,
      });
      added = await client.add(data);
      url = `https://infura-ipfs.io/ipfs/${added.path}`; // NFT URL
      console.log(`NFT URL: ${url}`);

      /* Pop wallet and run createToken */
      // TODO: Update createToken in contract to send to recipientAddress post-mint
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          mintMessageAddress,
          MintMessage.abi,
          signer
        );

        let transaction = await contract.createToken(url);
        console.log('Mining...');
        await transaction.wait();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

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
                createNFT={createNFT}
              />
              <Footer />
            </div>
            <div className='right'>
              <MessagePreview
                message={message}
                twitter={twitter}
                recipientAddress={recipientAddress}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
