import React from 'react';
import MintButton from './MintButton';

const MessageForm = ({
  toAddress,
  onToAddressChange,
  message,
  onMessageChange,
  twitter,
  setTwitter,
  isLoading,
  createNFT,
  placeholderAddress,
  addressError,
}) => {
  const validateTwitter = (e) => {
    const newTwitter = e.target.value.replace(/[^A-Za-z0-9_]/g, '');
    setTwitter(newTwitter);
  };

  return (
    <div className='form-wrap'>
      <p>
        Send any Ethereum address a message as an NFT for just the cost of gas!
      </p>
      <form action='' method='get'>
        <div className='input-wrap'>
          <label>Recipient Address</label>
          <div>{addressError}</div>
          <input
            id='to-address'
            className='input small'
            placeholder={placeholderAddress}
            onChange={(e) => onToAddressChange(e.target.value)}
          />
        </div>

        <div className='input-wrap'>
          <label>Message</label>
          <textarea
            id='message'
            className='input large'
            placeholder={message}
            maxLength='320'
            onChange={(e) => onMessageChange(e.target.value)}
          />
        </div>

        <div className='input-wrap'>
          <label>Your Twitter</label>
          <input
            id='twitter'
            className='input small'
            placeholder={twitter}
            onChange={validateTwitter}
          ></input>
        </div>
      </form>
      <MintButton isLoading={isLoading} createNFT={createNFT} />
    </div>
  );
};

export default MessageForm;
