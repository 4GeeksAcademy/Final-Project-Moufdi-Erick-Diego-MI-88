import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import businessSignUpPicture from "../assets/img/businessSignUp-Picture.png";

export const BusinessSignUp = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signUpFailed, setSignUpFailed] = useState(false)


    const handleSignUp = async () => {
        const Response = await fetch(BASE_URL + "/bussiness-signup", {
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
    className="container-fluid d-flex align-items-center py-5"
    style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-11 col-xl-10">
          <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
            <div
              className="card-body p-4 p-md-5 p-lg-6"
              style={{ backgroundColor: "#8a8442", color: "white" }}
            >
              <h2 className="text-center fw-bold mb-5 display-5">
                Business Sign Up
              </h2>

              <div className="row align-items-center g-5">
                <div className="col-md-5 text-center">
                  <div className="p-3 bg-white bg-opacity-10 rounded-5 shadow">
                    <img
                      src={businessSignUpPicture}
                      alt="Business sign up"
                      className="img-fluid rounded-4"
                    />
                  </div>
                </div>

                <div className="col-md-7">
                  <form>
                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        Business Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                        placeholder="Enter business name"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                        placeholder="Enter address"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        Website
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                        placeholder="Enter website"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                        placeholder="Enter email"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-white fw-bold fs-5">
                        Services
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-4 border-0 shadow"
                        placeholder="Enter services"
                      />
                    </div>

                    <div className="text-center mt-5">
                      <button
                        type="submit"
                        className="btn btn-light btn-lg fw-bold px-5 py-3 rounded-pill shadow"
                      >
                        Sign Up as Business
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default BusinessSignUp;