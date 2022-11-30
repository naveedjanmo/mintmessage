import React from 'react';
import MintButton from './MintButton';
import { useEnsAddress, useEnsName } from 'wagmi';

const MessageForm = ({
  isLoading,
  values,
  placeholders,
  handleChange,
  handleSubmit,
  errors,
  setBanner,
}) => {
  const ensAddress = useEnsAddress({
    name: values.toAddress,
  });

  const ensName = useEnsName({
    address: values.toAddress,
  });

  return (
    <div className='form-wrap'>
      <p className='welcome-message'>
        Send any Ethereum address a message as an NFT for just the cost of gas!
      </p>
      <form action='' method='get' onSubmit={handleSubmit}>
        <div className='input-wrap'>
          <label>Recipient Address</label>
          <input
            id='toAddress'
            className={`input small ${errors.toAddress ? 'input-error' : ''}`}
            placeholder={placeholders.fromAddress}
            value={values.toAddress}
            onChange={handleChange}
          />
          {errors.toAddress && (
            <p className='input-error-message'>{errors.toAddress}</p>
          )}
        </div>

        <div className='input-wrap'>
          <label>Message</label>
          <textarea
            id='message'
            className={`input large ${errors.message ? 'input-error' : ''}`}
            placeholder={placeholders.message}
            maxLength='320'
            value={values.message}
            onChange={handleChange}
          />
          {errors.message && (
            <p className='input-error-message'>{errors.message}</p>
          )}
        </div>

        <div className='reply-input-wrap'>
          <div className='input-wrap'>
            <label>Your Twitter</label>
            <input
              id='twitter'
              className={`input small ${errors.contact ? 'input-error' : ''}`}
              placeholder={placeholders.twitter}
              value={values.twitter}
              onChange={handleChange}
            ></input>
            {errors.contact && (
              <p className='input-error-message'>{errors.contact}</p>
            )}
          </div>

          <div className='input-wrap'>
            <label>Your Discord</label>
            <input
              id='discord'
              className={`input small ${errors.contact ? 'input-error' : ''}`}
              placeholder={placeholders.discord}
              value={values.discord}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <MintButton
          isLoading={isLoading}
          setBanner={setBanner}
          values={values}
          errors={errors}
        />
      </form>
    </div>
  );
};

export default MessageForm;
