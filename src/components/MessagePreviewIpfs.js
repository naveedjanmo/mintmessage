import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_KEY;
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const client = create('https://ipfs.infura.io:5001/api/v0');
const client = create('https://ipfs.infura.io:5001/api/v0', {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const MessagePreviewIpfs = ({ recipientAddress, message, twitter }) => {
  const handleImageDownload = async () => {
    const element = document.getElementById('print'),
      canvas = await html2canvas(element, { backgroundColor: 'rgba(0,0,0,0)' }),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a');

    link.href = data;
    link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [fileUrl, updateFileUrl] = useState(``);
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
      console.log(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  return (
    <>
      <button className='message-wrap' id='print' onClick={handleImageDownload}>
        <div>
          <div className='message'>
            <p>From: {recipientAddress}</p>
            <p>{message}</p>
            <p>Reply on Twitter: {twitter}</p>
          </div>
        </div>
      </button>
      <div>
        <h1>IPFS Example</h1>
        <input type='file' onChange={onChange} />
        {fileUrl && <img src={fileUrl} width='600px' />}
      </div>
    </>
  );
};

export default MessagePreviewIpfs;
