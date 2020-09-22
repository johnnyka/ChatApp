import React from 'react';

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log('Handle change')
  console.log(event.target.value)
  
  // Dispatch action to update the name in Redux store.
  // Use the state in Redux store to set the value of the input element.
};

const InputField = ({ label, name }: { 
  label: string,
  name: string
}) => {

  return (
    <label>
      {`${label}:`}
      <input type='text' name={name} onChange={(e) => handleChange(e)} />
    </label>
  );
};

export default InputField;
