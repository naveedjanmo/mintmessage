import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import LoadingIndicator from './LoadingIndicator';
import gasIcon from '../assets/gas-icon.svg';

function MintButton({ isLoading, setBanner, fees }) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 750;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  if (isConnected) {
    return (
      // <div className='mint-button-wrap'>
      <button className='mint-button'>
        {isLoading ? <LoadingIndicator /> : 'Mint'}
      </button>
      // <div className='button-detail'>
      //   <div className='footer-info'>
      //     <p>Free Mint</p>
      //   </div>
      //   <div className='footer-info'>
      //     <img src={gasIcon} alt='gas icon' />
      //     <p>${fees.transactionFee}</p>
      //   </div>
      // </div>
      // </div>
    );
  } else if (width < breakpoint) {
    return (
      <button type='button' className='mint-button' onClick={setBanner}>
        Connect Wallet
      </button>
    );
  } else {
    return (
      <button type='button' className='mint-button' onClick={openConnectModal}>
        Connect Wallet
      </button>
    );
  }
}

export default MintButton;
