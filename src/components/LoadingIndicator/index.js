import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = ({ color }) => {
  const ldsRing = () => `${color === 'dark' ? 'lds-ring dark' : 'lds-ring'}`;

  return (
    <div className={ldsRing()}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;
