import React, { useState } from 'react';
import MintButton from './MintButton';
import { ethers } from 'ethers';
import useForm from '../hooks/useForm';
import validateForm from '../utils/validateForm';

const MessageForm = ({
  toAddress,
  message,
  onMessageChange,
  twitter,
  setTwitter,
  isLoading,
  createNFT,
  placeholderAddress,
  toAddressError,
  setToAddressError,
  messageError,
  placeholderTwitter,
  placeholderMessage,
  setToAddress,
}) => {
  const { handleChange, values, handleSubmit, errors } = useForm(validateForm);

  // ---
  // on click
  // if message is empty then turn input red and disable button
  // if twitter is empty then turn input red and disable button
  // if address is empty then turn input red and dsiable button

  const validateToAddress = (e) => {
    const { value } = e.target;
    let isValid = null;
    if (ethers.utils.isAddress(value)) {
      isValid = true;
      setToAddress(value);
      // } else if (value === '') {
      //   isValid = true;
    } else {
      isValid = false;
    }
    setToAddressError(isValid ? false : true);
  };

  const validateTwitter = (e) => {
    const newTwitter = e.target.value.replace(/[^A-Za-z0-9_]/g, '');
    setTwitter(newTwitter);
  };

  const toAddressInputClass = () =>
    `input small ${toAddressError ? 'input-error' : ''}`;
  const toAddressInputWrapClass = () =>
    `input-wrap ${toAddressError ? 'input-wrap-error animated shake' : ''}`;

  const messageInputClass = () =>
    `input large ${messageError ? 'input-error' : ''}`;

  const messageInputWrapClass = () =>
    `input-wrap ${messageError ? 'input-wrap-error animated shake' : ''}`;

  return (
    <div className='form-wrap'>
      <p>
        Send any Ethereum address a message as an NFT for just the cost of gas!
      </p>
      <form action='' method='get' onSubmit={handleSubmit}>
        <div className={toAddressInputWrapClass()}>
          <label>Recipient Address</label>
          {/* <div>{addressError}</div> */}
          <input
            id='toAddress'
            className={toAddressInputClass()}
            placeholder={placeholderAddress}
            // onChange={validateToAddress}
            value={values.toAddress}
            onChange={handleChange}
          />
        </div>

        <div className={messageInputWrapClass()}>
          <label>Message</label>
          <textarea
            id='message'
            className={messageInputClass()}
            placeholder={placeholderMessage}
            maxLength='320'
            // onChange={(e) => onMessageChange(e.target.value)}
            value={values.message}
            onChange={handleChange}
          />
        </div>

        <div className='input-wrap'>
          <label>Your Twitter</label>
          <input
            id='twitter'
            className='input small'
            placeholder={placeholderTwitter}
            // onChange={validateTwitter}
            value={values.twitter}
            onChange={handleChange}
          ></input>
        </div>
        <MintButton
          isLoading={isLoading}
          createNFT={createNFT}
          toAddressError={toAddressError}
          messageError={messageError}
          message={message}
          twitter={twitter}
          validateToAddress={validateToAddress}
        />
      </form>
    </div>
  );
};

export default MessageForm;
