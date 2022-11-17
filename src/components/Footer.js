import React from 'react';
import { useAccount } from 'wagmi';
import { mintMessageAddress } from '../utils/config';
import FooterTag from './FooterTag';

import gasIcon from '../assets/gas-icon.svg';
import etherscanIcon from '../assets/etherscan-icon.svg';
import LoadingIndicator from './LoadingIndicator';

const Footer = ({ fees, feesLoading }) => {
  const { isConnected } = useAccount();
  return (
    <div className='footer'>
      <div className='footer-info'>
        <FooterTag platform='etherscan' />
        <FooterTag platform='github' />
      </div>
      {isConnected ? (
        <>
          <div className='footer-info'>
            <img src={gasIcon} alt='gas icon' />
            {feesLoading ? (
              <LoadingIndicator color='dark' />
            ) : (
              <p>${fees.transactionFee}</p>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Footer;
