import React from 'react';
import { mintMessageAddress } from '../utils/config';

const ContactTag = ({ platform }) => {
  switch (platform) {
    default:
    case 'etherscan':
      return (
        <a
          className='tag tag-outline'
          target='_blank'
          rel='noreferrer'
          href={`https://etherscan.io/address/${mintMessageAddress}#code`}
        >
          <img
            src='/images/etherscan-icon.svg'
            alt='Etherscan icon'
            style={{ height: 12 }}
          />
          <span style={{ marginBottom: 1 }}>Etherscan</span>
        </a>
      );
    case 'github':
      return (
        <a
          className='tag tag-outline'
          target='_blank'
          rel='noreferrer'
          href={`https://github.com/naveedjanmo/mintmessage`}
        >
          <img
            src='/images/github-icon.svg'
            alt='Github icon'
            style={{ height: 12 }}
          />
          <span style={{ marginBottom: 1 }}>GitHub</span>
        </a>
      );
  }
};

export default ContactTag;
