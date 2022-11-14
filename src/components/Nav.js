import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from './Logo';

const Nav = function ({ setBanner }) {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 750;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  if (width > breakpoint) {
    return (
      <div className='nav-wrap'>
        <Logo />
        <div className='connect-nav-wrap'>
          <ConnectButton />
        </div>
      </div>
    );
  } else {
    return (
      <div className='nav-wrap'>
        <Logo />
        <div className='connect-nav-wrap'>
          <button className='nav-connect-button' onClick={setBanner}>
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }
};

export default Nav;
