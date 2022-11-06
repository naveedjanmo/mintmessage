import React, { useState } from 'react';

import { ethers } from 'ethers';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import html2canvas from 'html2canvas';

import './styles/base.css';
import './styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import Nav from './components/Nav';
import MessageForm from './components/MessageForm';
import MessagePreview from './components/MessagePreview';
import Footer from './components/Footer';

import { formatAddress } from './utils/utils';
import { mintMessageAddress } from './utils/config';
import MintMessage from './utils/MintMessage.json';

/* WAGMI Config */
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

/* IPFS Config */
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

// TODO
// - Update createToken in contract to auto transfer to recipientAddress post-mint
//    - Do I need to create an explicit transfer function? I don't think so
// - Figure out how to check gas and how much this will cost on mainnet (bear and bull market)
// - Figure out how to stop someone from spamming the mint button - infura will charge at a certain point
//    - Figure out how/if I can clear infura ipfs pins
// - Fix dot env stuff
// - Fix title of NFTs on marketplaces - metadata
// - Check that images are loading across marketplaces
// - Improve image design - remove background
// v2
// - Add a character count indicator to message input
// - Add ens support
// - Disable forms until wallet connected / add UX to achieve this behavior

const App = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState(
    '0x1F19FaF55eF10deB3Df7002265EFa583bE14AFAb'
  );
  const [message, setMessage] = useState(
    `Hello! I'm interested in buying Dickbutt #420. I've made a bunch of offers on OpenSea to no avail! Please reach out via Twitter DMs if you want to make a deal.`
  );
  const [twitter, setTwitter] = useState('naveedjanmo');

  async function createNFT() {
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
      if (!url) return;
      const data = JSON.stringify({
        name: 'MintMessage',
        description: `You received a message from ${formatAddress(
          address
        )} via mintmessage.xyz.`,
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
      // TODO: Make this work
      // console.log(`https://testnets.opensea.io/assets/goerli/${mintMessageAddress}/11`);
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
                recipientAddress={recipientAddress}
                onRecipientChange={setRecipientAddress}
                message={message}
                onMessageChange={setMessage}
                twitter={twitter}
                setTwitter={setTwitter}
                onTwitterChange={setTwitter}
                isLoading={isLoading}
                createNFT={createNFT}
              />
              <Footer />
            </div>
            <div className='right'>
              <MessagePreview message={message} twitter={twitter} />
            </div>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
