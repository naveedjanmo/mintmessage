import React from 'react';

const ContactTag = ({ platform, values, placeholders }) => {
  const validTwitter = () => {
    const noLink = values.twitter.replace('https://twitter.com/', '');
    return noLink.replace(/[^A-Za-z0-9_]/g, '');
  };

  switch (platform) {
    default:
    case 'twitter':
      return (
        <div className='tag'>
          <img src='/images/twitter-icon.svg' alt='Twitter icon' />
          <span>@{validTwitter() ? validTwitter() : placeholders.twitter}</span>
        </div>
      );
    case 'discord':
      return (
        <div className='tag'>
          <img src='/images/discord-icon.svg' alt='Discord icon' />
          <span>{values.discord ? values.discord : placeholders.discord}</span>
        </div>
      );
  }
};

export default ContactTag;
