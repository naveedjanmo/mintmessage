import { useState, useEffect } from 'react';

// if value is ens address, resolve to address, use address
// if address address, then address

const useForm = (callback, validateForm) => {
  const [values, setValues] = useState({
    toAddress: '',
    message: '',
    twitter: '',
    discord: '',
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
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, setValues, errors };
};

export default useForm;
