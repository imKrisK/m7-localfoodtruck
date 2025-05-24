const FormContainer = ({ children, style = {} }) => {
  // Support both style.container and direct style prop
  const containerStyle = style.container || style;
  return <div style={containerStyle}>{children}</div>;
};

export default FormContainer;