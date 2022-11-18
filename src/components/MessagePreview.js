import React from 'react';
import { useAccount } from 'wagmi';
import { formatDate, formatAddress } from '../utils/utils';
import ContactTag from './ContactTag';

import closeIcon from '../assets/close-icon.svg';
import linkOutIcon from '../assets/link-out-icon.svg';

import FlipCard, { BackCard, FrontCard } from './FlipCard';
import { mintMessageAddress } from '../utils/config';

const MessagePreview = ({
  values,
  placeholders,
  isMinted,
  setIsMinted,
  transactionHash,
  tokenId,
}) => {
  const { address } = useAccount();

  return (
    <div
      style={{
        flex: '0 0 auto',
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.025)',
        borderRadius: '1em',
      }}
      // onClick={() => setIsMinted(!isMinted)}
    >
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
                  <p>Reply via</p>
                  {!values.twitter && !values.discord ? (
                    <>
                      <ContactTag
                        platform='twitter'
                        values={values}
                        placeholders={placeholders}
                      />
                      <ContactTag
                        platform='discord'
                        values={values}
                        placeholders={placeholders}
                      />
                    </>
                  ) : (
                    ''
                  )}
                  {values.twitter ? (
                    <ContactTag
                      platform='twitter'
                      values={values}
                      placeholders={placeholders}
                    />
                  ) : (
                    ''
                  )}
                  {values.discord ? (
                    <ContactTag
                      platform='discord'
                      values={values}
                      placeholders={placeholders}
                    />
                  ) : (
                    ''
                  )}
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
              <div className='confirm-links'>
                <a
                  className='confirm-link'
                  href={`https://opensea.io/assets/ethereum/${mintMessageAddress}/${tokenId}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  OpenSea
                  <img src={linkOutIcon} alt='link icon' />
                </a>
                <a
                  className='confirm-link'
                  href={`https://etherscan.io/tx/${transactionHash}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Etherscan
                  <img src={linkOutIcon} alt='link icon' />
                </a>
              </div>
            </div>
          </div>
        </BackCard>
      </FlipCard>
    </div>
  );
};

export default MessagePreview;
