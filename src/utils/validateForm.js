const validateForm = (values) => {
  let errors = {};
  if (!values.toAddress) {
    errors.toAddress = 'Address required';
  }

  if (!values.message) {
    errors.message = 'Message required';
  }

  if (!values.twitter && !values.discord) {
    errors.contact = 'One social required';
  }

  return errors;
};

export default validateForm;
