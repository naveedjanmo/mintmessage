import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_KEY;
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const MessagePreview = ({ recipientAddress, message, twitter }) => {
  const [fileUrl, updateFileUrl] = useState(``);

  const handleMint = async () => {
    // TODO: Loading starts

    // Render div to png
    const element = document.getElementById('message-wrap'),
      canvas = await html2canvas(element, { backgroundColor: 'rgba(0,0,0,0)' }),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a');
    // Save png variable
    link.href = data;
    // Upload png ipfs
    const added = await client.add(data);
    const url = `https://infura-ipfs.io/ipfs/${added.path}`;
    updateFileUrl(url);
    console.log(url);
    // TODO: Writes to blockchain with ipfs link in metadata
  };

  return (
    <>
      <button className='message-wrap' id='message-wrap' onClick={handleMint}>
        <div>
          <div className='message'>
            <p>From: {recipientAddress}</p>
            <p>{message}</p>
            <p>Reply on Twitter: {twitter}</p>
          </div>
        </div>
      </button>
    </>
  );
};

export default MessagePreview;
