import React, { useState } from "react";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/forgot-password", { email });
      alert("A password reset link has been sent to your email address.");
    } catch (error) {
      alert("There was an error sending the password reset link.");
    }
  };
  return (
    <div className="container">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default ForgotPassword;