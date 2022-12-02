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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
    if (e.target.id === 'message') {
      setCharCount(value.length);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(values));
    setIsSubmitting(true);
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

  return { handleChange, handleSubmit, values, errors, charCount };
};

export default useForm;
