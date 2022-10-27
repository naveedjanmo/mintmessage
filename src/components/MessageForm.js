import React, { useState } from 'react';
import MintButton from './MintButton';

const MessageForm = ({
  message,
  wave,
  onRecipientChange,
  onTwitterChange,
  onMessageChange,
  isLoading,
  setIsLoading,
}) => {
  return (
    <div className='form-wrap'>
      <p>
        Send any Ethereum address a message as an NFT for just the cost of gas!
      </p>
      <form action='' method='get'>
        <div className='input-wrap'>
          <label>Recipient Address</label>
          <input
            id='recipient-address'
            className='input small'
            placeholder='0x1F19FaF55eF10deB3Df7002265EFa583bE14AFAb'
            onChange={(e) => onRecipientChange(e.target.value)}
          />
        </div>

        <div className='input-wrap'>
          <label>Message</label>
          <textarea
            id='message'
            className='input large'
            placeholder={
              "Hello! I'm interested in buying Dickbutt #420. I've made a bunch of offers on OpenSea to no avail! Please reach out via Twitter DMs if you want to make a deal."
            }
            onChange={(e) => onMessageChange(e.target.value)}
          />
        </div>

        <div className='input-wrap'>
          <label>Your Twitter</label>
          <input
            id='twitter'
            className='input small'
            placeholder='@naveedjanmo'
            onChange={(e) => onTwitterChange(e.target.value)}
          ></input>
        </div>
      </form>
      <MintButton
        wave={wave}
        message={message}
        isLoading={isLoading}
        loading={setIsLoading}
      />
    </div>
  );
};

export default MessageForm;
