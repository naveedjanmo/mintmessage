import React, { useState } from 'react';
import MintButton from './MintButton';
import { wait } from '../utils/utils';

const MessageForm = ({
  isLoading,
  values,
  placeholders,
  handleChange,
  handleSubmit,
  errors,
}) => {
  const toAddressInputClass = () =>
    `input small ${errors.toAddress ? 'input-error' : ''}`;
  const toAddressInputWrapClass = () =>
    `input-wrap ${errors.toAddress ? 'input-wrap-error' : ''}`;
  const messageInputClass = () =>
    `input large ${errors.message ? 'input-error' : ''}`;
  const messageInputWrapClass = () =>
    `input-wrap ${errors.message ? 'input-wrap-error' : ''}`;
  const twitterInputClass = () =>
    `input small ${errors.twitter ? 'input-error' : ''}`;
  const twitterInputWrapClass = () =>
    `input-wrap ${errors.twitter ? 'input-wrap-error' : ''}`;

  return (
    <div className='form-wrap'>
      <p className='welcome-message'>
        Send any Ethereum address a message as an NFT for just the cost of gas!
      </p>
      <form action='' method='get' onSubmit={handleSubmit}>
        <div className={toAddressInputWrapClass()}>
          <label>Recipient Address</label>
          <input
            id='toAddress'
            className={toAddressInputClass()}
            placeholder={placeholders.fromAddress}
            value={values.toAddress}
            onChange={handleChange}
          />
        </div>

        <div className={messageInputWrapClass()}>
          <label>Message</label>
          <textarea
            id='message'
            className={messageInputClass()}
            placeholder={placeholders.message}
            maxLength='320'
            value={values.message}
            onChange={handleChange}
          />
        </div>

        <div className={twitterInputWrapClass()}>
          <label>Your Twitter</label>
          <input
            id='twitter'
            className={twitterInputClass()}
            placeholder={placeholders.twitter}
            value={values.twitter}
            onChange={handleChange}
          ></input>
        </div>
        <MintButton isLoading={isLoading} />
      </form>
    </div>
  );
};

export default MessageForm;
