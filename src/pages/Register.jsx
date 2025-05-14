import React, { useState } from "react";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission behavior
    if (userPassword.length < 6) {
      setSubmitResult("Password must be at least 6 characters long.");
    } else {
      setSubmitResult("Registration successful!"); // simulate a successful registration
    }
  };
    return (
        <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Email:
            <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
            />
            </label>
            <br />
            <label>
            Password:
            <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
            />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
        {submitResult && <p>{submitResult}</p>}
        </div>
    );
}

export default Register;