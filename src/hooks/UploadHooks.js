import {useState} from 'react';

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState(
      {
        title: '',
        description: '',
        file: null,
        dataUrl: '',
      },
  );

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.files[0],
    }));
  };

  return {inputs, handleSubmit, handleInputChange, handleFileChange, setInputs};
};

export default useUploadForm;
