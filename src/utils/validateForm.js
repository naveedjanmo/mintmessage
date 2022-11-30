import { ethers } from 'ethers';
import { useEnsAddress, useEnsName } from 'wagmi';

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);

const validateForm = (values) => {
  const EnsAddress = () => {
    const ensAddress = useEnsAddress({
      name: values.toAddress,
    });
    return ensAddress.data;
  };

  let errors = {};
  if (!values.toAddress) {
    errors.toAddress = 'Address required';
  }

  if (!ethers.utils.isAddress(values.toAddress)) {
    errors.toAddress = 'Invalid address';
  } else if (!EnsAddress) {
    errors.toAddress = 'Invalid address';
  }

  if (!values.message) {
    errors.message = 'Message required';
  }

  if (!values.twitter && !values.discord) {
    errors.contact = 'At least one contact method required';
    // errors.discord = 'Contact method required';
  }

  return errors;
};

export default validateForm;
