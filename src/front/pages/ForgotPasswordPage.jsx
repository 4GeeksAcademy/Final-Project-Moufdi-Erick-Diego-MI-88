import React, { useState } from "react";

export const ForgotPassword = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);
  const [resetFailed, setResetFailed] = useState(false);

  const handleResetPassword = async () => {
    const response = await fetch(BASE_URL + "/reset-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        new_password: newPassword
      })
    });

    if (!response.ok) {
      setResetFailed(true);
      setResetDone(false);
      return;
    }

    setResetDone(true);
    setResetFailed(false);
  };

  return (
    <div className="container signUpandLoginPages">
      <h1>Reset Password</h1>

      {resetDone ? <h2 className="text-success">Password updated</h2> : null}
      {resetFailed ? <h2 className="text-danger">Reset failed</h2> : null}

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-3"></div>
      </div>

      <button className="btn btn-success" onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ForgotPassword;