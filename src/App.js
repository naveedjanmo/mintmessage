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
  const [message, setMessage] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo a diam sollicitudin tempor id eu. Semper quis lectus nulla at volutpat diam ut venenatis tellus. Sem nulla pharetra diam sit amet nisl suscipit. Nulla facilisi morbi tempus iaculis urna id. Quis risus sed vulputate odio.'
  );
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
                    if you run into any issues.
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
              {/* <div className="svgWrap">
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
              </div> */}

              <div className="svgWrap">
                <svg
                  width="521"
                  height="431"
                  viewBox="0 0 521 431"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="20"
                    y="14"
                    width="481"
                    height="391"
                    rx="16"
                    fill="white"
                  />
                  <path
                    d="M20 30C20 21.1634 27.1634 14 36 14H485C493.837 14 501 21.1634 501 30V86H20V30Z"
                    fill="#C850C0"
                  />
                  <path
                    d="M182.288 45.664C183.504 45.664 184.432 46.08 185.072 46.912C185.728 47.728 186.056 48.88 186.056 50.368V58H183.32V50.656C183.32 49.872 183.152 49.248 182.816 48.784C182.496 48.32 182.016 48.088 181.376 48.088C180.544 48.088 179.864 48.456 179.336 49.192C178.824 49.928 178.568 50.904 178.568 52.12V58H175.832V50.656C175.832 49.856 175.664 49.224 175.328 48.76C174.992 48.28 174.504 48.04 173.864 48.04C173.048 48.04 172.368 48.416 171.824 49.168C171.296 49.92 171.032 50.912 171.032 52.144V58H168.296V46H171.032V48.136C171.352 47.4 171.84 46.808 172.496 46.36C173.168 45.896 173.952 45.664 174.848 45.664C175.712 45.664 176.448 45.896 177.056 46.36C177.68 46.808 178.12 47.424 178.376 48.208C178.728 47.408 179.24 46.784 179.912 46.336C180.6 45.888 181.392 45.664 182.288 45.664ZM191.212 43.768C190.876 44.104 190.46 44.272 189.964 44.272C189.468 44.272 189.052 44.104 188.716 43.768C188.38 43.432 188.212 43.016 188.212 42.52C188.212 42.024 188.38 41.608 188.716 41.272C189.052 40.936 189.468 40.768 189.964 40.768C190.46 40.768 190.876 40.936 191.212 41.272C191.548 41.608 191.716 42.024 191.716 42.52C191.716 43.016 191.548 43.432 191.212 43.768ZM191.308 58H188.572V46H191.308V58ZM200.87 45.664C201.398 45.664 201.87 45.744 202.286 45.904C202.718 46.048 203.062 46.232 203.318 46.456C203.59 46.664 203.822 46.952 204.014 47.32C204.206 47.688 204.342 48.016 204.422 48.304C204.518 48.592 204.59 48.96 204.638 49.408C204.686 49.84 204.71 50.168 204.71 50.392C204.726 50.616 204.734 50.912 204.734 51.28V58H201.998V51.352C201.998 50.968 201.99 50.672 201.974 50.464C201.974 50.256 201.934 49.976 201.854 49.624C201.79 49.256 201.686 48.976 201.542 48.784C201.398 48.592 201.182 48.424 200.894 48.28C200.622 48.12 200.286 48.04 199.886 48.04C198.974 48.04 198.23 48.416 197.654 49.168C197.078 49.92 196.79 50.904 196.79 52.12V58H194.054V46H196.79V48.208C197.19 47.408 197.742 46.784 198.446 46.336C199.166 45.888 199.974 45.664 200.87 45.664ZM214.386 46V48.376H210.954V54.208C210.954 54.768 211.058 55.2 211.266 55.504C211.49 55.792 211.906 55.936 212.514 55.936C213.042 55.936 213.578 55.792 214.122 55.504V57.904C213.546 58.192 212.834 58.336 211.986 58.336C209.474 58.336 208.218 56.968 208.218 54.232V48.376H205.938V46H208.218V42.808H210.954V46H214.386ZM230.171 45.664C231.387 45.664 232.315 46.08 232.955 46.912C233.611 47.728 233.939 48.88 233.939 50.368V58H231.203V50.656C231.203 49.872 231.035 49.248 230.699 48.784C230.379 48.32 229.899 48.088 229.259 48.088C228.427 48.088 227.747 48.456 227.219 49.192C226.707 49.928 226.451 50.904 226.451 52.12V58H223.715V50.656C223.715 49.856 223.547 49.224 223.211 48.76C222.875 48.28 222.387 48.04 221.747 48.04C220.931 48.04 220.251 48.416 219.707 49.168C219.179 49.92 218.915 50.912 218.915 52.144V58H216.179V46H218.915V48.136C219.235 47.4 219.723 46.808 220.379 46.36C221.051 45.896 221.835 45.664 222.731 45.664C223.595 45.664 224.331 45.896 224.939 46.36C225.563 46.808 226.003 47.424 226.259 48.208C226.611 47.408 227.123 46.784 227.795 46.336C228.483 45.888 229.275 45.664 230.171 45.664ZM244.783 54.208H247.759C247.407 55.488 246.719 56.496 245.695 57.232C244.671 57.968 243.415 58.336 241.927 58.336C240.055 58.336 238.567 57.76 237.463 56.608C236.359 55.456 235.807 53.92 235.807 52C235.807 50.08 236.367 48.544 237.487 47.392C238.607 46.24 240.111 45.664 241.999 45.664C244.095 45.664 245.639 46.352 246.631 47.728C247.623 49.104 247.831 50.784 247.255 52.768H238.711C238.839 53.776 239.175 54.56 239.719 55.12C240.279 55.664 241.031 55.936 241.975 55.936C243.415 55.936 244.351 55.36 244.783 54.208ZM241.951 47.968C240.127 47.968 239.063 48.92 238.759 50.824H244.663C244.743 49.944 244.543 49.248 244.063 48.736C243.599 48.224 242.895 47.968 241.951 47.968ZM254.636 58.336C252.924 58.336 251.564 57.928 250.556 57.112C249.564 56.28 249.116 55.144 249.212 53.704H251.852C251.772 54.44 251.98 55.032 252.476 55.48C252.988 55.912 253.716 56.128 254.66 56.128C255.396 56.128 255.988 56 256.436 55.744C256.884 55.472 257.108 55.12 257.108 54.688C257.108 54.256 256.844 53.92 256.316 53.68C255.788 53.44 255.14 53.256 254.372 53.128C253.62 52.984 252.86 52.816 252.092 52.624C251.34 52.416 250.7 52.056 250.172 51.544C249.644 51.032 249.38 50.36 249.38 49.528C249.38 48.36 249.86 47.424 250.82 46.72C251.796 46.016 253.028 45.664 254.516 45.664C256.164 45.664 257.476 46.088 258.452 46.936C259.428 47.768 259.796 48.848 259.556 50.176H256.892C257.052 49.504 256.9 48.952 256.436 48.52C255.988 48.088 255.34 47.872 254.492 47.872C253.804 47.872 253.244 48.016 252.812 48.304C252.396 48.576 252.188 48.928 252.188 49.36C252.188 49.728 252.38 50.032 252.764 50.272C253.148 50.496 253.628 50.656 254.204 50.752C254.78 50.848 255.396 50.976 256.052 51.136C256.724 51.296 257.348 51.48 257.924 51.688C258.5 51.88 258.98 52.216 259.364 52.696C259.748 53.176 259.94 53.776 259.94 54.496C259.94 55.696 259.452 56.64 258.476 57.328C257.5 58 256.22 58.336 254.636 58.336ZM266.683 58.336C264.971 58.336 263.611 57.928 262.603 57.112C261.611 56.28 261.163 55.144 261.259 53.704H263.899C263.819 54.44 264.027 55.032 264.523 55.48C265.035 55.912 265.763 56.128 266.707 56.128C267.443 56.128 268.035 56 268.483 55.744C268.931 55.472 269.155 55.12 269.155 54.688C269.155 54.256 268.891 53.92 268.363 53.68C267.835 53.44 267.187 53.256 266.419 53.128C265.667 52.984 264.907 52.816 264.139 52.624C263.387 52.416 262.747 52.056 262.219 51.544C261.691 51.032 261.427 50.36 261.427 49.528C261.427 48.36 261.907 47.424 262.867 46.72C263.843 46.016 265.075 45.664 266.562 45.664C268.211 45.664 269.523 46.088 270.499 46.936C271.475 47.768 271.843 48.848 271.603 50.176H268.939C269.099 49.504 268.947 48.952 268.483 48.52C268.035 48.088 267.387 47.872 266.539 47.872C265.851 47.872 265.291 48.016 264.859 48.304C264.443 48.576 264.235 48.928 264.235 49.36C264.235 49.728 264.427 50.032 264.811 50.272C265.195 50.496 265.675 50.656 266.251 50.752C266.827 50.848 267.443 50.976 268.099 51.136C268.771 51.296 269.395 51.48 269.971 51.688C270.547 51.88 271.027 52.216 271.411 52.696C271.795 53.176 271.987 53.776 271.987 54.496C271.987 55.696 271.499 56.64 270.523 57.328C269.547 58 268.267 58.336 266.683 58.336ZM278.993 45.664C280.705 45.664 282.009 46.16 282.905 47.152C283.817 48.128 284.273 49.472 284.273 51.184V58H281.753V55.912C280.825 57.528 279.385 58.336 277.433 58.336C276.169 58.336 275.161 58.008 274.409 57.352C273.673 56.68 273.305 55.816 273.305 54.76C273.305 53.544 273.793 52.592 274.769 51.904C275.761 51.216 277.105 50.872 278.801 50.872C279.713 50.872 280.625 50.976 281.537 51.184C281.537 49.088 280.681 48.04 278.969 48.04C278.233 48.04 277.673 48.224 277.289 48.592C276.905 48.944 276.785 49.448 276.929 50.104H274.169C273.849 48.808 274.169 47.744 275.129 46.912C276.089 46.08 277.377 45.664 278.993 45.664ZM277.985 56.152C278.865 56.152 279.633 55.896 280.289 55.384C280.961 54.856 281.409 54.152 281.633 53.272C280.817 53 279.945 52.864 279.017 52.864C278.057 52.864 277.329 53.032 276.833 53.368C276.337 53.688 276.089 54.128 276.089 54.688C276.089 55.168 276.257 55.536 276.593 55.792C276.929 56.032 277.393 56.152 277.985 56.152ZM293.231 55.312C294.543 55.472 295.583 55.888 296.351 56.56C297.135 57.232 297.527 58.08 297.527 59.104C297.527 60.288 296.999 61.256 295.943 62.008C294.903 62.76 293.575 63.136 291.959 63.136C290.375 63.136 289.031 62.76 287.927 62.008C286.839 61.272 286.167 60.264 285.911 58.984H289.007C289.119 59.528 289.431 59.952 289.943 60.256C290.471 60.576 291.135 60.736 291.935 60.736C292.735 60.736 293.391 60.576 293.903 60.256C294.415 59.952 294.671 59.536 294.671 59.008C294.671 58.448 294.391 58 293.831 57.664C293.287 57.328 292.519 57.16 291.527 57.16C290.503 57.16 289.319 57.328 287.975 57.664V55.624C289.831 55.368 291.359 54.872 292.559 54.136C292.127 54.232 291.647 54.28 291.119 54.28C289.647 54.28 288.463 53.904 287.567 53.152C286.687 52.4 286.247 51.392 286.247 50.128C286.247 48.8 286.743 47.728 287.735 46.912C288.743 46.096 290.063 45.688 291.695 45.688C293.343 45.688 294.679 46.112 295.703 46.96C295.927 46.336 295.927 45.52 295.703 44.512H297.935C298.063 45.216 298.015 45.92 297.791 46.624C297.567 47.312 297.215 47.864 296.735 48.28C297.007 48.824 297.143 49.424 297.143 50.08C297.143 51.12 296.799 52.096 296.111 53.008C295.439 53.904 294.479 54.672 293.231 55.312ZM289.823 48.64C289.343 49.024 289.103 49.536 289.103 50.176C289.103 50.816 289.335 51.328 289.799 51.712C290.279 52.096 290.911 52.288 291.695 52.288C292.479 52.288 293.103 52.096 293.567 51.712C294.047 51.328 294.287 50.816 294.287 50.176C294.287 49.536 294.047 49.024 293.567 48.64C293.103 48.256 292.479 48.064 291.695 48.064C290.927 48.064 290.303 48.256 289.823 48.64ZM307.924 54.208H310.9C310.548 55.488 309.86 56.496 308.836 57.232C307.812 57.968 306.556 58.336 305.068 58.336C303.196 58.336 301.708 57.76 300.604 56.608C299.5 55.456 298.948 53.92 298.948 52C298.948 50.08 299.508 48.544 300.628 47.392C301.748 46.24 303.252 45.664 305.14 45.664C307.236 45.664 308.78 46.352 309.772 47.728C310.764 49.104 310.972 50.784 310.396 52.768H301.852C301.98 53.776 302.316 54.56 302.86 55.12C303.42 55.664 304.172 55.936 305.116 55.936C306.556 55.936 307.492 55.36 307.924 54.208ZM305.092 47.968C303.268 47.968 302.204 48.92 301.9 50.824H307.804C307.884 49.944 307.684 49.248 307.204 48.736C306.74 48.224 306.036 47.968 305.092 47.968ZM315.904 57.712C315.536 58.08 315.08 58.264 314.536 58.264C313.992 58.264 313.528 58.08 313.144 57.712C312.776 57.328 312.592 56.864 312.592 56.32C312.592 55.776 312.776 55.32 313.144 54.952C313.512 54.584 313.976 54.4 314.536 54.4C315.096 54.4 315.56 54.584 315.928 54.952C316.296 55.32 316.48 55.776 316.48 56.32C316.48 56.864 316.288 57.328 315.904 57.712ZM325.486 51.712L329.998 58H326.782L323.782 53.68L320.758 58H317.614L322.15 51.736L318.07 46H321.19L323.782 49.768L326.35 46H329.518L325.486 51.712ZM336.339 55.384L339.243 46H342.099L337.707 58.912C336.779 61.68 335.163 63.064 332.859 63.064C332.123 63.064 331.467 62.952 330.891 62.728V60.352C331.515 60.576 332.075 60.688 332.571 60.688C333.739 60.688 334.587 60.016 335.115 58.672L330.291 46H333.195L336.339 55.384ZM352.738 47.752L346.018 55.816H352.978V58H342.874V55.816L349.186 48.28H343.306V46H352.738V47.752Z"
                    fill="white"
                  />
                  <text
                    y="120"
                    style={{
                      fill: 'black',
                      fontFamily: 'Verdana',
                      fontSize: 14,
                    }}
                    text-anchor="start"
                  >
                    <tspan x="44">From: 0x865...97D1</tspan>
                    <tspan x="477" text-anchor="end">
                      SEP 9 2022
                    </tspan>
                  </text>

                  <switch
                    style={{
                      fill: 'black',
                      fontFamily: 'Verdana',
                      fontSize: 14,
                    }}
                  >
                    <foreignObject x="44" y="169" width="433" height="200">
                      <p xmlns="http://www.w3.org/1999/xhtml">{message}</p>
                    </foreignObject>
                  </switch>

                  <line
                    x1="44"
                    y1="146.5"
                    x2="477"
                    y2="146.5"
                    stroke="#E0E0E0"
                  />

                  <text
                    y="380"
                    style={{
                      fill: 'black',
                      fontFamily: 'Verdana',
                      fontSize: 14,
                    }}
                    text-anchor="start"
                  >
                    <tspan x="44">Reply on Twitter</tspan>
                    <tspan x="170">{twitter}</tspan>
                  </text>

                  <defs>
                    <filter
                      id="filter0_d_304_766"
                      x="0"
                      y="0"
                      width="521"
                      height="431"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="6" />
                      <feGaussianBlur stdDeviation="10" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_304_766"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_304_766"
                        result="shape"
                      />
                    </filter>
                  </defs>
                  {/* </svg> */}
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
