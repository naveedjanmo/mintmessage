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
// import ConfirmMobile from './components/ConfirmMobile';

/* WAGMI Config */
const { chains, provider } = configureChains(
  [chain.goerli, chain.mainnet],
  [
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
// - Fix image quality and tag text align
// - Push to matic
//    - Deploy contract
//    - Clear IPFS pins on infura
//    - Replace link prefixes with mainnet versions (confirm message, footer link)
//    - Add royalties on Manifold and OS (10%)
//    - Submit first message to self
//    - Remove any test code
//    - Publish repo
/* v2 */
// - Fix mint on mobile
// - Add a character count indicator to message input
// - Add ens support
// - Better input sanitize
//    - Remove 'https://twitter.com/' if include
//    - Format discord input
// - Better error handling (greyed out mint button)
// - Mouseover tilt message anim
// - Stages to loading: connecting, exporting message,
// - Style rainbow components - font

const App = () => {
  window.Buffer = window.Buffer || require('buffer').Buffer;
  const { handleChange, handleSubmit, values, errors } = useForm(
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
    message: `Hello! I'm interested in buying Fidenza #313. I've made a bunch of offers on OpenSea to no avail! Please reach out via Twitter or Discord if you want to make a deal.`,
    twitter: 'naveedjanmo',
    discord: 'naveed#6400',
  };

  async function createNFT() {
    const { ethereum } = window;

    try {
      setIsLoading(true);
      setIsMinted(false);
      /* pick and export div as image */
      const element = document.getElementById('message-export');
      const canvas = await html2canvas(element, {
          backgroundColor: null,
          scale: 5,
        }),
        file = canvas.toDataURL('image/png'),
        link = document.createElement('a');
      link.href = file;

      /* TESTING download for testing */
      link.download = 'downloaded-image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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
      console.log(`Infura CID: ${cid}`);

      /* pop wallet and run createMessage */
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintMessageAddress,
        MintMessage.abi,
        signer
      );

      let transaction = await contract.createMessage(cid, values.toAddress);
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
                fees={fees}
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
