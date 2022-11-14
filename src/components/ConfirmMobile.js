import React from 'react';
import linkOutIcon from '../assets/link-out-icon.svg';

const ConfirmMobile = ({ tokenId, transactionHash }) => {
  return (
    <div className='confirm-wrap-mobile'>
      <div className='confirm-message'>
        <h1>Message sent! 🎉</h1>
        <p>
          Your message will show up in the recipient's wallet in the next few
          minutes.
        </p>
      </div>
      <div
        className='confirm-links'
        style={{ flexDirection: 'row', paddingTop: 8, gap: 12 }}
      >
        <a
          className='confirm-link'
          href={`https://testnets.opensea.io/assets/goerli/0x419a900b9a31f58506620ed5e67ec99e7b5b18e5/${tokenId}`}
          target='_blank'
          rel='noreferrer'
        >
          OpenSea
          <img src={linkOutIcon} alt='link icon' />
        </a>
        <a
          className='confirm-link'
          href={`https://goerli.etherscan.io/tx/${transactionHash}`}
          target='_blank'
          rel='noreferrer'
        >
          Etherscan
          <img src={linkOutIcon} alt='link icon' />
        </a>
      </div>
      <button
        className='mint-button'
        style={{ marginTop: 24 }}
        onClick={() => window.location.reload(false)}
      >
        Send Another Message
      </button>
    </div>
  );
};

export default ConfirmMobile;
