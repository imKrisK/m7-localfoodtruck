import React from 'react';

const InputField = ({ label, type, id, value, onChange, required, style }) => {
  return (
    <div style={style.inputGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        style={style.input}
      />
    </div>
  );
};

export default InputField;