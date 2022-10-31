import React, { useState } from 'react';

import { useAccount } from 'wagmi';
import html2canvas from 'html2canvas';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { formatDate, formatAddress } from '../utils';

import twitterIcon from '../twitter-icon.svg';

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

const MessagePreview = ({ message, twitter }) => {
  const placeholderAddress = '0x1F19FaF55eF10deB3Df7002265EFa583bE14AFAb';

  // const sanitizeTwitter = (twitter) => {
  //   return twitter.replaceAll(
  //     // '_',
  //     // /^(?![0-9._])(?!.*[0-9._]$)(?!.*\d_)(?!.*_\d)[a-zA-Z0-9_]+$/,
  //     /[^A-Za-z0-9_]/,
  //     ''
  //   );
  // };

  const [fileUrl, updateFileUrl] = useState(``);
  const { address, isConnected } = useAccount();

  const handleMint = async () => {
    // TODO: Loading starts
    // Render div to png
    const element = document.getElementById('message-export'),
      canvas = await html2canvas(element, {
        backgroundColor: 'rgba(0,0,0,0)',
        scale: 3,
      }),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a');
    // Save png variable
    link.href = data;
    // Upload png ipfs
    // const added = await client.add(data);
    // const url = `https://infura-ipfs.io/ipfs/${added.path}`;
    // updateFileUrl(url);
    // console.log(url);

    link.href = data;
    link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // TODO: Writes to blockchain with ipfs link in metadata
  };

  return (
    <>
      <button
        className='message-export'
        id='message-export'
        onClick={handleMint}
      >
        <div className='message-wrap'>
          <div className='message-header'>
            <p>mintmessage.xyz</p>
          </div>
          <div className='message-body'>
            <div className='message-from'>
              <div className='from-left'>
                <p>From</p>
                <p>
                  {address
                    ? formatAddress(address)
                    : formatAddress(placeholderAddress)}
                </p>
              </div>
              <div className='from-right'>{formatDate(new Date())}</div>
            </div>
            <div className='message-separator'></div>
            <div className='message-message'>
              <p>{message}</p>
            </div>
            <div className='message-footer'>
              <p>Reply on Twitter</p>
              <div className='tag'>
                <img src={twitterIcon} alt='Twitter icon' />
                <span>@{twitter}</span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default MessagePreview;
