import React from 'react';
import { useAccount } from 'wagmi';
import { formatDate, formatAddress } from '../utils/utils';
import twitterIcon from '../assets/twitter-icon.svg';
import closeIcon from '../assets/close-icon.svg';
import linkOutIcon from '../assets/link-out-icon.svg';

import FlipCard, { BackCard, FrontCard } from './FlipCard';

const MessagePreview = ({
  values,
  placeholders,
  isMinted,
  setIsMinted,
  transactionHash,
  tokenId,
}) => {
  const { address } = useAccount();
  const newTwitter = values.twitter.replace(/[^A-Za-z0-9_]/g, '');

  return (
    // <div style={{ flex: '0 0 auto' }} onClick={() => setIsMinted(!isMinted)}>
    <div style={{ flex: '0 0 auto' }}>
      <FlipCard>
        <FrontCard isCardFlipped={isMinted}>
          <div className='message-export' id='message-export'>
            <div className='message-wrap'>
              <div className='message-header'>
                <p>mintmessage.xyz</p>
              </div>
              <div className='message-body'>
                <div className='message-from'>
                  <div className='from-left'>
                    <p>From</p>
                    <p>
                      {formatAddress(
                        address ? address : placeholders.fromAddress
                      )}
                    </p>
                  </div>
                  <div className='from-right'>{formatDate(new Date())}</div>
                </div>
                <div className='message-separator'></div>
                <div className='message-message'>
                  <p>
                    {values.message ? values.message : placeholders.message}
                  </p>
                </div>
                <div className='message-footer'>
                  <p>Reply on Twitter</p>
                  <div className='tag'>
                    <img src={twitterIcon} alt='Twitter icon' />
                    <span>
                      @{newTwitter ? newTwitter : placeholders.twitter}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FrontCard>
        <BackCard isCardFlipped={isMinted}>
          <div className='message-export'>
            <div className='confirm-wrap'>
              <div className='confirm-close-wrap'>
                <button
                  className='confirm-close'
                  onClick={() => setIsMinted(!isMinted)}
                >
                  <img src={closeIcon} alt='close icon' />
                </button>
              </div>
              <div className='confirm-message'>
                <h1>Message sent! 🎉</h1>
                <p>
                  Your message will show up in the recipient's wallet in the
                  next few minutes.
                </p>
              </div>

              {/* <div className='confirm-footer'> */}
              {/* <div className='message-separator'></div> */}
              <div className='confirm-links'>
                <a
                  className='confirm-link'
                  href={`https://testnets.opensea.io/assets/goerli/0x419a900b9a31f58506620ed5e67ec99e7b5b18e5/${tokenId}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  OpenSea
                  <img src={linkOutIcon} alt='link icon' />
                </a>
                <a
                  className='confirm-link'
                  href={`https://goerli.etherscan.io/tx/${transactionHash}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Etherscan
                  <img src={linkOutIcon} alt='link icon' />
                </a>
              </div>
              {/* </div> */}
            </div>
          </div>
        </BackCard>
      </FlipCard>
    </div>
  );
};

export default MessagePreview;
