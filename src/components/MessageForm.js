import React from 'react';
import MintButton from './MintButton';

const MessageForm = ({
  isLoading,
  values,
  placeholders,
  handleChange,
  handleSubmit,
  errors,
  setBanner,
}) => {
  // const toAddressInputClass = () =>
  //   `input small ${errors.toAddress ? 'input-error' : ''}`;
  // const toAddressInputWrapClass = () =>
  //   `input-wrap ${errors.toAddress ? 'input-wrap-error' : ''}`;
  // const messageInputClass = () =>
  //   `input large ${errors.message ? 'input-error' : ''}`;
  // const messageInputWrapClass = () =>
  //   `input-wrap ${errors.message ? 'input-wrap-error' : ''}`;
  // const twitterInputClass = () =>
  //   `input small ${errors.twitter ? 'input-error' : ''}`;
  // const twitterInputWrapClass = () =>
  //   `input-wrap ${errors.twitter ? 'input-wrap-error' : ''}`;
  // const discordInputClass = () =>
  //   `input small ${errors.discord ? 'input-error' : ''}`;
  // const discordInputWrapClass = () =>
  //   `input-wrap ${errors.discord ? 'input-wrap-error' : ''}`;

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
            className='input small'
            placeholder={placeholders.fromAddress}
            value={values.toAddress}
            onChange={handleChange}
          />
        </div>

        <div className='input-wrap'>
          <label>Message</label>
          <textarea
            id='message'
            className='input large'
            placeholder={placeholders.message}
            maxLength='320'
            value={values.message}
            onChange={handleChange}
          />
        </div>

        <div className='reply-input-wrap'>
          <div className='input-wrap'>
            <label>Your Twitter</label>
            <input
              id='twitter'
              className='input small'
              placeholder={placeholders.twitter}
              value={values.twitter}
              onChange={handleChange}
            ></input>
          </div>

          <div className='input-wrap'>
            <label>Your Discord</label>
            <input
              id='discord'
              className='input small'
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
