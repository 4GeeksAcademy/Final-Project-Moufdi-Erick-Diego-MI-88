import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SignUp = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signUpFailed, setSignUpFailed] = useState(false)


    const handleSignUp = async () => {
        const Response = await fetch(BASE_URL + "/signup", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
        })
        if (!Response.ok) {
            setSignUpFailed(true)
            return
        }
        const data = await Response.json()
        return data
    }


    return (
        <div
            className="container-fluid py-5 d-flex align-items-center"
            style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div
                            className="card border-0 shadow-lg rounded-4"
                            style={{ backgroundColor: "#8a8442", color: "white" }}
                        >
                            <div className="card-body p-4 p-md-5">
                                <h1 className="text-center fw-bold mb-4">Welcome to the Sign Up Page</h1>

                                {signUpFailed ? (
                                    <h2 className="text-danger text-center mb-4 bg-white rounded-3 p-2">
                                        Sign up failed
                                    </h2>
                                ) : null}

                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <div className="mb-4">
                                            <label className="form-label text-white fw-semibold">Email</label>
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control form-control-lg rounded-3 border-0 shadow-sm"
                                                onChange={e => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-semibold">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control form-control-lg rounded-3 border-0 shadow-sm"
                                                onChange={e => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    <button
                                        className="btn btn-light btn-lg fw-bold px-5 py-2 rounded-3 shadow-sm"
                                        onClick={handleSignUp}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}