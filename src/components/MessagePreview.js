import React, { useState } from 'react';

const MessagePreview = ({ recipientAddress, message, twitter }) => {
  return (
    <div className='message-preview-wrap'>
      <svg
        width='521'
        height='415'
        viewBox='0 0 521 415'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_d_417_21)'>
          <rect x='20' y='14' width='481' height='375' rx='16' fill='white' />
        </g>
        <defs>
          <filter
            id='filter0_d_417_21'
            x='0'
            y='0'
            width='521'
            height='415'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='6' />
            <feGaussianBlur stdDeviation='10' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_417_21'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_417_21'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default MessagePreview;
