import { useState, useEffect } from 'react';

const useForm = (callback, validateForm) => {
  const [values, setValues] = useState({
    toAddress: '',
    message: '',
    twitter: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(values));
    setIsSubmitting(true);
    // createNFT();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  });

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
