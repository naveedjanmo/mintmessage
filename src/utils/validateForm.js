import { ethers } from 'ethers';

const validateForm = (values) => {
  let errors = {};
  if (!values.toAddress.trim()) {
    errors.toAddress = 'Address required';
  } else if (!ethers.utils.isAddress(values.toAddress)) {
    errors.toAddress = 'Invalid address';
  }

  if (!values.message) {
    errors.message = 'Message required';
  }

  if (!values.twitter && !values.discord) {
    errors.twitter = 'Contact method required';
    errors.discord = 'Contact method required';
  }

  return errors;
};

export default validateForm;
