import React from 'react';
import logo from '../assets/speech-balloon-emoji.png';

const Logo = function () {
  return (
    <a className='logo-wrap' href='/'>
      <img className='logo' src={logo} alt='speech balloon emoji' />
      <h1 className='logo-text'>mintmessage</h1>
    </a>
  );
};

export default Logo;
