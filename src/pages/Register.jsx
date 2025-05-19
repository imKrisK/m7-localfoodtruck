import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Navbar from "../components/navbar";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRePassword, setUserRePassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Add styles for InputField
  const styles = {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (userPassword.length < 6) {
        setSubmitResult("Password must be at least 6 characters long.");
      } else if (userPassword !== userRePassword) {
        setSubmitResult("Passwords do not match.");
      } else {
        setSubmitResult("Registration successful!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="form_container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <InputField
            label="Name:"
            type="text"
            id="register-name"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            autoComplete="off"
            style={styles}
          />
          <InputField
            label="Email:"
            type="email"
            id="register-email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            autoComplete="off"
            style={styles}
          />
          <InputField
            label="Password:"
            type="password"
            id="register-password"
            name="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            autoComplete="new-password"
            style={styles}
          />
          <InputField
            label="Re-enter Password:"
            type="password"
            id="register-repassword"
            name="re-password"
            value={userRePassword}
            onChange={(e) => setUserRePassword(e.target.value)}
            required
            autoComplete="new-password"
            style={styles}
          />
          <Button type="submit" className="form-btn" loading={loading} disabled={loading}>
            Register
          </Button>
        </form>
        {submitResult && <p style={{ marginTop: '15px', color: submitResult.includes('successful') ? 'green' : 'red' }}>{submitResult}</p>}
      </div>
    </>
  );
};

export default Register;