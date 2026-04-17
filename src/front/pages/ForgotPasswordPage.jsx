import React, { useState } from "react";

export const ForgotPassword = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [questionLoaded, setQuestionLoaded] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [resetFailed, setResetFailed] = useState(false);
  const [questionFailed, setQuestionFailed] = useState(false);

  const handleGetQuestion = async () => {
    setResetDone(false);
    setResetFailed(false);
    setQuestionFailed(false);

    const response = await fetch(BASE_URL + "/forgot-password/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    });

    if (!response.ok) {
      setQuestionFailed(true);
      setQuestionLoaded(false);
      return;
    }

    const data = await response.json();
    setSecurityQuestion(data.security_question);
    setQuestionLoaded(true);
  };

  const handleResetPassword = async () => {
    const response = await fetch(BASE_URL + "/reset-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        security_answer: securityAnswer,
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

      {questionFailed ? <h2 className="text-danger">Email not found</h2> : null}
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

          {!questionLoaded ? (
            <button className="btn btn-success mt-3" onClick={handleGetQuestion}>
              Continue
            </button>
          ) : (
            <>
              <div className="mt-3">
                <label>Security Question</label>
                <input
                  type="text"
                  value={securityQuestion}
                  disabled
                />
              </div>

              <div>
                <label htmlFor="securityAnswer">Answer</label>
                <input
                  type="text"
                  name="securityAnswer"
                  value={securityAnswer}
                  onChange={e => setSecurityAnswer(e.target.value)}
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

              <button className="btn btn-success mt-3" onClick={handleResetPassword}>
                Reset Password
              </button>
            </>
          )}
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;