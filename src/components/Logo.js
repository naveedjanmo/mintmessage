import React from 'react';

const Logo = function () {
  return (
    <a className='logo-wrap' href='/'>
      <img
        className='logo'
        src='/images/speech-balloon-emoji.png'
        alt='speech balloon emoji'
      />
      <h1 className='logo-text'>mintmessage</h1>
    </a>
  );
};

export default Logo;
