import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Navbar from "../components/navbar";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (userPassword.length < 6) {
        setSubmitResult("Password must be at least 6 characters long.");
      } else {
        setSubmitResult("Registration successful!");
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <InputField
            label="Email:"
            type="email"
            id="register-email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            style={styles}
          />
          <InputField
            label="Password:"
            type="password"
            id="register-password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            style={styles}
          />
          <Button type="submit" style={styles.button} loading={loading} disabled={loading}>
            Register
          </Button>
        </form>
        {submitResult && <p style={styles.result}>{submitResult}</p>}
      </FormContainer>
    </>
  );
};

export default Register;