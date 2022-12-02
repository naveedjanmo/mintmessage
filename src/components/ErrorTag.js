import React from 'react';

const ErrorTag = ({ errors }) => {
  return (
    <div className={`tag-error ${errors ? 'show' : ''}`}>
      <img src='/images/alert-icon.svg' alt='alert icon' />
      <span>{errors}</span>
    </div>
  );
};

export default ErrorTag;
