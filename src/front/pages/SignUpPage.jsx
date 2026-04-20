import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SignUp = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [signUpFailed, setSignUpFailed] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const handleSignUp = async () => {
        const response = await fetch(BASE_URL + "/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                phone: phone,
                city: city,
                date_of_birth: dateOfBirth,
                security_question: securityQuestion,
                security_answer: securityAnswer
            })
        });

        if (!response.ok) {
            setSignUpFailed(true);
            setSignUpSuccess(false);
            return;
        }

        setSignUpFailed(false);
        setSignUpSuccess(true);

        setTimeout(() => {
            navigate("/user-profile");
        }, 1200);
    };

    return (
        <div
            className="container-fluid d-flex align-items-center py-5"
            style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
                            <div
                                className="card-body p-4 p-md-5"
                                style={{ backgroundColor: "#8a8442", color: "white" }}
                            >
                                <h2 className="text-center fw-bold mb-5 display-5">
                                    User Sign Up
                                </h2>

                                {signUpFailed ? (
                                    <div className="alert alert-danger text-center">
                                        Sign up failed
                                    </div>
                                ) : null}

                                {signUpSuccess ? (
                                    <div className="alert alert-success text-center">
                                        Sign up successful
                                    </div>
                                ) : null}

                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                placeholder="Enter first name"
                                                onChange={e => setFirstName(e.target.value)}
                                                value={firstName}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                placeholder="Enter last name"
                                                onChange={e => setLastName(e.target.value)}
                                                value={lastName}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                placeholder="Enter email"
                                                onChange={e => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                placeholder="Enter phone number"
                                                onChange={e => setPhone(e.target.value)}
                                                value={phone}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                placeholder="Where do you live?"
                                                onChange={e => setCity(e.target.value)}
                                                value={city}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                onChange={e => setDateOfBirth(e.target.value)}
                                                value={dateOfBirth}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                Security Question
                                            </label>
                                            <select
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                value={securityQuestion}
                                                onChange={(e) => setSecurityQuestion(e.target.value)}
                                            >
                                                <option value="">Select a question</option>
                                                <option value="What is your favorite color?">What is your favorite color?</option>
                                                <option value="What city were you born in?">What city were you born in?</option>
                                                <option value="What was your first pet’s name?">What was your first pet’s name?</option>
                                                <option value="What is your mother’s maiden name?">What is your mother’s maiden name?</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                Answer
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                placeholder="Enter your answer"
                                                value={securityAnswer}
                                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control form-control-lg rounded-4 border-0 shadow"
                                                placeholder="Set a password"
                                                onChange={e => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-5">
                                    <button
                                        className="btn btn-light btn-lg fw-bold px-5 py-3 rounded-pill shadow"
                                        onClick={handleSignUp}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};