import React from 'react';
import { useAccount } from 'wagmi';
import { formatDate, formatAddress } from '../utils/utils';
import twitterIcon from '../twitter-icon.svg';

const MessagePreview = ({ values, placeholders }) => {
  const { address } = useAccount();

  const newTwitter = values.twitter.replace(/[^A-Za-z0-9_]/g, '');

  return (
    <>
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
                  {formatAddress(address ? address : placeholders.fromAddress)}
                </p>
              </div>
              <div className='from-right'>{formatDate(new Date())}</div>
            </div>
            <div className='message-separator'></div>
            <div className='message-message'>
              <p>{values.message ? values.message : placeholders.message}</p>
            </div>
            <div className='message-footer'>
              <p>Reply on Twitter</p>
              <div className='tag'>
                <img src={twitterIcon} alt='Twitter icon' />
                <span>@{newTwitter ? newTwitter : placeholders.twitter}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePreview;
