import React from 'react';
import { mintMessageAddress } from '../utils/config';
import gasIcon from '../assets/gas-icon.svg';
import etherscanIcon from '../assets/etherscan-icon.svg';

const Footer = ({ fees }) => {
  return (
    <div className='footer'>
      <div className='footer-info'>
        <img src={etherscanIcon} alt='gas icon' />
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://goerli.etherscan.io/address/${mintMessageAddress}`}
        >
          contract
        </a>
      </div>
      <div className='footer-info'>
        <img src={gasIcon} alt='gas icon' />
        <p>${fees.transactionFee}</p>
      </div>
    </div>
  );
};

export default Footer;
