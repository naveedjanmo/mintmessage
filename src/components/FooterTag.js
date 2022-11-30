import React from 'react';
import { mintMessageAddress } from '../utils/config';
import etherscanIcon from '../assets/etherscan-icon.svg';
import githubIcon from '../assets/github-icon.svg';

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
            src={etherscanIcon}
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
          <img src={githubIcon} alt='Github icon' style={{ height: 12 }} />
          <span style={{ marginBottom: 1 }}>GitHub</span>
        </a>
      );
  }
};

export default ContactTag;
