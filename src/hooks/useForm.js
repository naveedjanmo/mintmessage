import { useState, useEffect } from 'react';

const useForm = (callback, validateForm) => {
  const [values, setValues] = useState({
    toAddress: '',
    message: '',
    twitter: '',
    discord: '',
  });
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
    setCharCount(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(values));
  };

  useEffect(() => {
    if (values.toAddress) {
      errors.toAddress = false;
    }

    if (values.message) {
      errors.message = false;
    }

    if (values.twitter) {
      errors.contact = false;
    }

    if (values.discord) {
      errors.contact = false;
    }
  }, [values, errors]);

  return { handleChange, handleSubmit, values, setValues, errors, charCount };
};

export default useForm;
