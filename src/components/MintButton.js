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

  if (isConnected) {
    return (
      // <div className='mint-button-wrap'>
      //   <div className='mint-info'>
      //     <div className='mint-info-left'>
      //       <p>Price: FREE!</p>
      //     </div>
      //     <div className='mint-info-right'>
      //       <p>Gas: </p>
      //     </div>
      //   </div>
      <button className='mint-button connected'>
        {isLoading ? <LoadingIndicator /> : 'Mint'}
      </button>
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
