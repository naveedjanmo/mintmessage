import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import LoadingIndicator from './LoadingIndicator';

function MintButton({ isLoading, setBanner, fees, values, errors }) {
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

  const disabled =
    !values.toAddress ||
    !values.message ||
    (!values.twitter && !values.discord);

  if (isConnected && disabled) {
    return <button className='mint-button disabled'>Mint</button>;
  } else if (!isConnected && width < breakpoint) {
    return (
      <button type='button' className='mint-button' onClick={setBanner}>
        Connect Wallet
      </button>
    );
  } else {
    return (
      <button className='mint-button'>
        {isLoading ? <LoadingIndicator /> : 'Mint'}
      </button>
    );
  }
}

export default MintButton;
