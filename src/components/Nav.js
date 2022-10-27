import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from './Logo';

const Nav = function () {
  return (
    <div className='nav-wrap'>
      <Logo />
      <ConnectButton />
    </div>
  );
};

export default Nav;
