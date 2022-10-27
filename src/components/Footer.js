import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
      <p>
        made by{' '}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://twitter.com/naveedjanmo'
        >
          @naveedjanmo
        </a>
      </p>
      <p>
        <a target='_blank' rel='noreferrer' href='https://etherscan.io/'>
          contract address
        </a>
      </p>
    </div>
  );
};

export default Footer;
