import React from 'react';
import twitterIcon from '../assets/twitter-icon.svg';
import discordIcon from '../assets/discord-icon.svg';

const ContactTag = ({ platform, values, placeholders }) => {
  const validTwitter = values.twitter.replace(/[^A-Za-z0-9_]/g, '');
  switch (platform) {
    default:
    case 'twitter':
      return (
        <div className='tag'>
          <img src={twitterIcon} alt='Twitter icon' />
          <span>@{validTwitter ? validTwitter : placeholders.twitter}</span>
        </div>
      );
    case 'discord':
      return (
        <div className='tag'>
          <img src={discordIcon} alt='Discord icon' />
          <span>{values.discord ? values.discord : placeholders.discord}</span>
        </div>
      );
  }
};

export default ContactTag;
