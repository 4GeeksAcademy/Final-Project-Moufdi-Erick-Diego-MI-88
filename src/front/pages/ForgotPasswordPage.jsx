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
    <div
      className="container-fluid d-flex align-items-center justify-content-center py-5"
      style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}
    >
      <div className="col-lg-7 col-xl-6">
        <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
          <div
            className="card-body p-4 p-md-5"
            style={{ backgroundColor: "#8a8442", color: "white" }}
          >
            <h2 className="text-center fw-bold mb-4 display-6">
              Reset Password
            </h2>

            {resetDone ? (
              <div className="alert alert-success text-center mb-0">
                Password updated successfully
              </div>
            ) : (
              <>
                {questionFailed ? (
                  <div className="alert alert-danger text-center">
                    Email not found
                  </div>
                ) : null}

                {resetFailed ? (
                  <div className="alert alert-danger text-center">
                    Reset failed
                  </div>
                ) : null}

                <div className="mb-4">
                  <label className="form-label text-white fw-bold fs-5">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control form-control-lg rounded-4 border-0 shadow"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                {!questionLoaded ? (
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-light btn-lg fw-bold px-5 py-3 rounded-pill shadow"
                      onClick={handleGetQuestion}
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        Security Question
                      </label>
                      <input
                        type="text"
                        value={securityQuestion}
                        disabled
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        Answer
                      </label>
                      <input
                        type="text"
                        name="securityAnswer"
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                        placeholder="Enter your answer"
                        value={securityAnswer}
                        onChange={e => setSecurityAnswer(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className="text-center mt-4">
                      <button
                        className="btn btn-light btn-lg fw-bold px-5 py-3 rounded-pill shadow"
                        onClick={handleResetPassword}
                      >
                        Reset Password
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;