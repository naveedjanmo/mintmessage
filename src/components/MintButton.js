import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import LoadingIndicator from './LoadingIndicator';

function MintButton({ isLoading, setBanner }) {
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

  if (isConnected && width > breakpoint) {
    return (
      <button className='mint-button'>
        {isLoading ? <LoadingIndicator /> : 'Mint'}
      </button>
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
