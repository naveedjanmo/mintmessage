import React, { useEffect, useState } from 'react';
import { useProvider, useAccount } from 'wagmi';

import { formatDate, formatAddress } from '../utils/utils';

import twitterIcon from '../twitter-icon.svg';

const MessagePreview = ({
  message,
  twitter,
  recipientAddress,
  isLoading,
  setIsLoading,
  createNFT,
}) => {
  const placeholderAddress = '0x1F19FaF55eF10deB3Df7002265EFa583bE14AFAb';

  const { address, isConnected } = useAccount();

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
                  {address
                    ? formatAddress(address)
                    : formatAddress(placeholderAddress)}
                </p>
              </div>
              <div className='from-right'>{formatDate(new Date())}</div>
            </div>
            <div className='message-separator'></div>
            <div className='message-message'>
              <p>{message}</p>
            </div>
            <div className='message-footer'>
              <p>Reply on Twitter</p>
              <div className='tag'>
                <img src={twitterIcon} alt='Twitter icon' />
                <span>@{twitter}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePreview;
