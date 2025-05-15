import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import FormContainer from '../components/FormContainer';
import Navbar from '../components/navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitResult, setSubmitResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (!email || !password) {
        setSubmitResult('Please enter both email and password.');
      } else {
        setSubmitResult('Login successful!');
      }
      setLoading(false);
    }, 1000);
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputGroup: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginTop: '5px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: loading ? 'not-allowed' : 'pointer',
    },
    result: {
      marginTop: '15px',
      color: submitResult.includes('successful') ? 'green' : 'red',
    },
  };

  return (
    <>
      <Navbar />
      <FormContainer style={styles}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <InputField
            label="Email:"
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles}
          />
          <InputField
            label="Password:"
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles}
          />
          <Button type="submit" style={styles.button} loading={loading} disabled={loading}>
            Login
          </Button>
        </form>
        {submitResult && <p style={styles.result}>{submitResult}</p>}
      </FormContainer>
    </>
  );
};

export default Login;