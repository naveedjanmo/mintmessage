import React from 'react';
import MintButton from './MintButton';
import ErrorTag from './ErrorTag';

const MessageForm = ({
  isLoading,
  values,
  placeholders,
  handleChange,
  handleSubmit,
  errors,
  setBanner,
  charCount,
}) => {
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
            type='text'
          />
          <ErrorTag errors={errors.toAddress} />
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
          {!errors.message ? (
            <div className='char-counter'>
              <span>{charCount}/320</span>
            </div>
          ) : (
            ''
          )}

          <ErrorTag errors={errors.message} />
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
            <ErrorTag errors={errors.contact} />
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
