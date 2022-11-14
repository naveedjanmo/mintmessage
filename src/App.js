import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
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

import { mintMessageAddress } from './utils/config';
import MintMessage from './utils/MintMessage.json';
import validateForm from './utils/validateForm';

import useForm from './hooks/useForm';

import Nav from './components/Nav';
import MessageForm from './components/MessageForm';
import MessagePreview from './components/MessagePreview';
import Footer from './components/Footer';
import ConfirmMobile from './components/ConfirmMobile';

/* WAGMI Config */
const { chains, provider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'mintmessage',
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
/* v1 */
// - Test mint on mobile - don't think its working (think this is a scale thing)
// - Add mint detail - mint price: free, gas price 000.000 ($..). See AB screenshot in screenshots
// - Push to mainnet
//    - Deploy contract
//    - Clear IPFS pins on infura
//    - Replace link prefixes with mainnet versions (confirm message, footer link)
//    - Add royalties on Manifold and OS (10%)
//    - Submit first message to self
//    - Remove any test code
//    - Write tweet and publish
/* v2 */
// - Add a character count indicator to message input
// - Add ens support
// - Better input sanitization
//    - Remove 'https://twitter.com/' if include
//    - Tidy discord input
// - Better error indicator behavior - remove red when focused
// - Load animation? https://codesandbox.io/s/uotor?module=%2Fsrc%2FExample.tsx
// - mouseover tilt message animation
// - Stages to loading (see rainbow project above)
// - Style rainbow components - font

const App = () => {
  window.Buffer = window.Buffer || require('buffer').Buffer;
  const { handleChange, handleSubmit, values, errors } = useForm(
    createNFT,
    validateForm
  );
  const [tokenId, setTokenId] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const placeholders = {
    fromAddress: '0x0000000000000000000000000000000000000000',
    message: `Hello! I'm interested in buying Fidenza #313. I've made a bunch of offers on OpenSea to no avail! Please reach out via Twitter DMs if you want to make a deal.`,
    twitter: 'naveedjanmo',
    discord: 'naveed#6400',
  };

  async function createNFT() {
    const { ethereum } = window;

    try {
      setIsLoading(true);
      setIsMinted(false);
      /* 1. Pick and export div as image */
      const element = document.getElementById('message-export');
      element.imageSmoothingEnabled = true;
      const canvas = await html2canvas(element, {
          backgroundColor: null,
          scale: 5,
        }),
        file = canvas.toDataURL('image/png'),
        link = document.createElement('a');
      link.href = file;

      /* TESTING Download for testing */
      // link.download = 'downloaded-image';
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      /* 2. Create NFT metadata, include png base64 and upload to IPFS */
      if (!file) return;
      const data = JSON.stringify({
        name: 'You received a mintmessage!',
        description: `Message sent via mintmessage.xyz`,
        external_url: 'https://mintmessage.xyz',
        image: file,
      });
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`; // NFT URL
      console.log(`NFT URL: ${url}`);

      /* 3. Pop wallet and run createToken */
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          mintMessageAddress,
          MintMessage.abi,
          signer
        );

        let transaction = await contract.createToken(url, values.toAddress);
        console.log('Mining...');
        await transaction.wait();
        setTransactionHash(transaction.hash);

        console.log('Minted!');
        setIsMinted(true);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const { ethereum } = window;
    let contract;

    const onNewMessage = (sender, tokenId) => {
      // console.log('NewMessage', sender, tokenId.toString());

      setTokenId(tokenId.toString());
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintMessageAddress,
        MintMessage.abi,
        signer
      );
      contract.on('NewMessageMinted', onNewMessage);
    }

    return () => {
      if (contract) {
        contract.off('NewMintMessageMinted', onNewMessage);
      }
    };
  }, []);

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
              {isMinted && window.innerWidth < 480 ? (
                <ConfirmMobile
                  transactionHash={transactionHash}
                  tokenId={tokenId}
                />
              ) : (
                <MessageForm
                  placeholders={placeholders}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              )}

              <Footer />
            </div>
            <div className='right'>
              <MessagePreview
                values={values}
                placeholders={placeholders}
                isMinted={isMinted}
                setIsMinted={setIsMinted}
                transactionHash={transactionHash}
                tokenId={tokenId}
              />
            </div>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
