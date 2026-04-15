import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SignUp = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [signUpFailed, setSignUpFailed] = useState(false)

    const handleSignUp = async () => {
        const Response = await fetch(BASE_URL + "/signup", {
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
                date_of_birth: dateOfBirth
            })
        })

        if (!Response.ok) {
            setSignUpFailed(true)
            return
        }

        const data = await Response.json()
        setSignUpFailed(false)
        return data
    }

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

                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <div className="mb-4">
                                            <label className="form-label text-white fw-bold fs-5">
                                                First Name
                                            </label>
                                            <input
                                                type="first_name"
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
                                                type="last_name"
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
                                                placeholder="Enter date of birth"
                                                onChange={e => setDateOfBirth(e.target.value)}
                                                value={dateOfBirth}
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
    )
}