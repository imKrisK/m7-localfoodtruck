import React from 'react';

const FormContainer = ({ children, style }) => {
  return <div style={style.container}>{children}</div>;
};

export default FormContainer;