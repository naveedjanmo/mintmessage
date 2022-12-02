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
import { motion, AnimatePresence } from 'framer-motion';

import './styles/base.css';
import './styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { mintMessageAddress } from './utils/config';
import MintMessage from './utils/MintMessage.json';
import validateForm from './utils/validateForm';

import useForm from './hooks/useForm';
import useFees from './hooks/useFees';

import Nav from './components/Nav';
import MessageForm from './components/MessageForm';
import MessagePreview from './components/MessagePreview';
import Footer from './components/Footer';

/* wagmi config */
const { chains, provider } = configureChains(
  // [chain.mainnet],
  [chain.goerli],
  [
    // alchemyProvider({ apiKey: process.env.REACT_APP_MAINNET_ALCHEMY_ID }),
    alchemyProvider({ apiKey: process.env.REACT_APP_GOERLI_ALCHEMY_ID }),
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

/* IPFS config */
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

/* v2 */
// - Move Nav and Button responsive useEffect up
// - Fix mint on mobile
// - Better mint error handling - if cancel stop perp. loading
// - Stages to loading: connecting, exporting message,
// - Mouseover tilt message anim
// - Style rainbow components - font is diff (see unlazy)

/* v2 new */
// - improved input error handling
// - ens support

/* v3 (new contract?) */
// - self destruct timer message, cl?
// - edit/update message - via metadata
// - clickable contact links on NFT market (would need to be diff format)

const App = () => {
  window.Buffer = window.Buffer || require('buffer').Buffer;
  const { handleChange, handleSubmit, values, errors, charCount } = useForm(
    createNFT,
    validateForm
  );
  const { fees, feesLoading } = useFees();
  const [tokenId, setTokenId] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [banner, setBanner] = useState(false);

  const placeholders = {
    fromAddress: '0x0000000000000000000000000000000000000000',
    message: `Hello! I'm interested in buying Fidenza #313. I made a bunch of offers on OpenSea to no avail! Please reach out via Twitter or Discord if you want to make a deal.`,
    twitter: 'naveedjanmo',
    discord: 'nmj#6400',
  };

  /* create message NFT */
  async function createNFT() {
    const { ethereum } = window;
    try {
      setIsLoading(true);
      setIsMinted(false);
      /* pick and export div as image */
      window.scrollTo(0, 0);
      const element = document.getElementById('message-export');
      const canvas = await html2canvas(element, {
          backgroundColor: null,
          scale: 5,
          scrollX: 0,
          scrollY: -window.scrollY,
        }),
        file = canvas.toDataURL('image/png'),
        link = document.createElement('a');
      link.href = file;

      /* TESTING download */
      // link.download = 'downloaded-image';
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      /* create NFT metadata, include png base64 and upload to IPFS */
      if (!file) return;
      const data = JSON.stringify({
        name: 'You received a mintmessage!',
        description: `Message sent via mintmessage.xyz`,
        external_url: 'https://mintmessage.xyz',
        image: file,
      });
      const added = await client.add(data);
      const cid = `${added.path}`;
      console.log(`IPFS: https://ipfs.io/ipfs/${cid}`);

      /* pop wallet and run createMessage */
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintMessageAddress,
        MintMessage.abi,
        signer
      );

      const address = await provider.resolveName(values.toAddress);
      let transaction = await contract.createMessage(cid, address);
      console.log('Mining...');
      await transaction.wait();
      setTransactionHash(transaction.hash);
      console.log('Minted!');
      setIsMinted(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  /* get tokenId from CreateMessage event  */
  useEffect(() => {
    const { ethereum } = window;
    let contract;

    const onCreateMessage = (sender, recipient, tokenId) => {
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
      contract.on('CreateMessage', onCreateMessage);
    }

    return () => {
      if (contract) {
        contract.off('NewMintMessageMinted', onCreateMessage);
      }
    };
  }, []);

  /* reset card flip when form values change */
  useEffect(() => {
    setIsMinted(false);
  }, [values]);

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
          <AnimatePresence>
            {banner && (
              <motion.div
                className='banner'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p>I only work on desktop for now 😕</p>
              </motion.div>
            )}
          </AnimatePresence>

          <Nav setBanner={setBanner} />
          <section className='content-wrap'>
            <div className='left'>
              <MessageForm
                placeholders={placeholders}
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                setBanner={setBanner}
                charCount={charCount}
              />
              <Footer fees={fees} feesLoading={feesLoading} />
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
