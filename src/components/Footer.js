import React from 'react';
import { mintMessageAddress } from '../utils/config';

const Footer = () => {
  return (
    <div className='footer'>
      <p>
        made by{' '}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://twitter.com/naveedjanmo'
        >
          @naveedjanmo
        </a>
      </p>
      <p>
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://goerli.etherscan.io/address/${mintMessageAddress}`}
        >
          view contract
        </a>
      </p>
    </div>
  );
};

export default Footer;
