import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const exportAsImage = async (element, imageFileName) => {
  const canvas = await html2canvas(element);
  const image = canvas.toDataURL('image/png', 1.0);
  downloadImage(image, imageFileName);

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.style = 'display:none;';
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };
};

const MessagePreview = ({ recipientAddress, message, twitter }) => {
  const exportRef = useRef();
  return (
    <div className='message-wrap' ref={exportRef}>
      <p>From: {recipientAddress}</p>
      <p>{message}</p>
      <p>Reply on Twitter: {twitter}</p>
      <button onClick={() => exportAsImage(exportRef.current, 'test')}>
        Export
      </button>
    </div>
  );
};

export default MessagePreview;
