import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { create } from 'ipfs-http-client';

// TODO: Fix drop shadow issue

const client = create('https://ipfs.infura.io:5001/api/v0');

const MessagePreview = ({ recipientAddress, message, twitter }) => {
  const handleImageDownload = async () => {
    const element = document.getElementById('print'),
      canvas = await html2canvas(
        element,
        { backgroundColor: 'rgba(0,0,0,0)' }
        // { scale: 2 }
      ),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a');

    link.href = data;
    link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [fileUrl, updateFileUrl] = useState(``);

  return (
    <a className='message-wrap' id='print' onClick={handleImageDownload}>
      <div>
        <div className='message'>
          <p>From: {recipientAddress}</p>
          <p>{message}</p>
          <p>Reply on Twitter: {twitter}</p>
        </div>
      </div>
    </a>
  );
};

export default MessagePreview;
