import React, { useState } from 'react';

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

import Nav from './components/Nav';
import MessageForm from './components/MessageForm';
import MessagePreview from './components/MessagePreview';
import Footer from './components/Footer';

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
// - Contract
//    - Use OZ builder to improve contract. See here: https://www.youtube.com/watch?v=h6Fb_dPZCd0&ab_channel=Web3Club
//    - Add royalty - see divergence contracts for royalty standard impl.
//        - https://etherscan.io/address/0xd2a077ec359d94e0a0b7e84435eacb40a67a817c#code
//    - Run tests - see OZ docs for guide
// - UI
//    - Figure out how to improve image quality - use svg instead?
//    - Check that images are loading across all marketplaces (OS, LR, X2, RA)
// - UX
//    - Figure out how to stop someone from spamming the mint button
//    - Validate address form field (disable if no address present)
//    - Check if its possible to fuck with the image to make it look diff on export
// - Push to production
//    - Clear IPFS pins on infura
//    - Replace contract address link prefix with mainnet etherscan
// v2
// - Add more detail to mint button/area - mint price: free, gas price 000.000 ($..). See AB screenshot in screenshots
// - Add a character count indicator to message input
// - Add ens support
// - Disable forms until wallet connected / add alt. UX to achieve this behavior
// - Reduce gas cost (change token URI method?)
// - Flip message on mint and reveal success message
//    - https://www.youtube.com/watch?v=YnxyVpE6PIE&ab_channel=Rainbow%F0%9F%8C%88
//    - https://github.com/rainbow-me/rainbowkit/tree/main/examples/with-next-mint-nft
//    - https://www.youtube.com/watch?v=GOuwOI-WSkE&ab_channel=PedroTech
// - Load animation? https://codesandbox.io/s/uotor?module=%2Fsrc%2FExample.tsx

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toAddress, setToAddress] = useState('');
  const [message, setMessage] = useState(
    `Hello! I'm interested in buying Fidenza #313. I've made a bunch of offers on OpenSea to no avail! Please reach out via Twitter DMs if you want to make a deal.`
  );
  const [twitter, setTwitter] = useState('naveedjanmo');
  const [isMinted, setIsMinted] = useState(false);
  const placeholderAddress = '0x1F19FaF55eF10deB3Df7002265EFa583bE14AFAb';

  async function createNFT() {
    const { ethereum } = window;

    try {
      setIsLoading(true);
      /* Pick and export div as image */
      const element = document.getElementById('message-export'),
        canvas = await html2canvas(element, {
          backgroundColor: 'rgba(0,0,0,0)',
          scale: 5,
        }),
        file = canvas.toDataURL('image/webp'),
        link = document.createElement('a');
      link.href = file;

      // /* Download for testing */
      // link.download = 'downloaded-image';
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      /* Upload image to IPFS (old) */
      // let added = await client.add(file, {
      //   progress: (prog) => console.log(`received: ${prog}`),
      // });
      // let url = `https://infura-ipfs.io/ipfs/${added.path}`; // Image URL
      // console.log(`Image URL: ${url}`);
      // setFileUrl(url);

      /* Create NFT metadata, include png base64 and upload to IPFS */
      if (!file) return;
      const data = JSON.stringify({
        name: 'You received a mintmessage!',
        description: 'Message sent via mintmessage',
        external_url: 'https://mintmessage.xyz',
        image: file,
      });
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`; // NFT URL
      console.log(`NFT URL: ${url}`);

      /* Pop wallet and run createToken */
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          mintMessageAddress,
          MintMessage.abi,
          signer
        );

        let transaction = await contract.createToken(url, toAddress);
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
      setIsMinted(true);
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
                toAddress={toAddress}
                onToAddressChange={setToAddress}
                message={message}
                onMessageChange={setMessage}
                twitter={twitter}
                setTwitter={setTwitter}
                onTwitterChange={setTwitter}
                isLoading={isLoading}
                createNFT={createNFT}
                placeholderAddress={placeholderAddress}
              />
              <Footer />
            </div>
            <div className='right'>
              <MessagePreview
                message={message}
                twitter={twitter}
                toAddress={toAddress}
                isCardFlipped={isMinted}
                placeholderAddress={placeholderAddress}
              />
            </div>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
