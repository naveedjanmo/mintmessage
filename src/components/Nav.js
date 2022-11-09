import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from './Logo';

const Nav = function () {
  return (
    <div className='nav-wrap'>
      <Logo />
      <div className='connect-nav-wrap'>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Nav;
