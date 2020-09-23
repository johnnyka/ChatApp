// eslint-disable-next-line
import React from 'react';

const InputField = ({ label, name, value, onChange }: { 
  label: string,
  name: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}): JSX.Element => {

  return (
    <label>
      {`${label}:`}
      <input 
        type='text'
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </label>
  );
};

export default InputField;
