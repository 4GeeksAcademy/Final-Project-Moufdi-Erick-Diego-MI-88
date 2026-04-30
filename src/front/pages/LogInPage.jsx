import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const LogIn = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [logInFailed, setLogInFailed] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        const Response = await fetch(BASE_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (!Response.ok) {
            setLogInFailed(true)
            return
        }

        const data = await Response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_id", data.user_id)
        setLogInFailed(false)

        if (data.business_id) {
            navigate("/business/" + data.business_id)
        } else {
            navigate("/user-profile")
        }
    }

    return (
        <>
            <div
                className="container-fluid d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh", backgroundColor: "#f3f3f3" }}
            >
                <div className="col-md-6 col-lg-5">
                    <div
                        className="card shadow-lg border-0 rounded-5 p-4"
                        style={{ backgroundColor: "#8a8442", color: "white" }}
                    >
                        <h2 className="text-center mb-4 fw-bold">Log In</h2>

                        {logInFailed ? (
                            <div className="alert alert-danger text-center">
                                Login Failed
                            </div>
                        ) : null}

                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                placeholder="Enter your email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                placeholder="Enter your password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <div className="d-grid">
                            <button
                                className="btn btn-light fw-bold py-2 rounded-pill shadow"
                                onClick={handleLogin}
                            >
                                Log In
                            </button>
                        </div>

                        <p className="text-center mt-4 mb-0">
                            <a href="/forgot-password" style={{ color: "white", textDecoration: "underline" }}>
                                Forgot password?
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}