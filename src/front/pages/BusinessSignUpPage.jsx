import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import businessSignUpPicture from "../assets/img/businessSignUp-Picture.png";

export const BusinessSignUp = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const response = await fetch(BASE_URL + "/business-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        business_name: businessName,
        address: address,
        website: website,
        email: email,
        phone: phone,
        services: services,
        business_description: businessDescription,
        type_of_business: typeOfBusiness,
        security_question: securityQuestion,
        security_answer: securityAnswer,
        password: password
      })
    });

    if (!response.ok) {
      setSignUpFailed(true);
      setSignUpSuccess(false);
      return;
    }

    const data = await response.json();
    setSignUpFailed(false);
    setSignUpSuccess(true);

    setTimeout(() => {
      navigate("/business/" + data.business_id);
    }, 1200);
  };

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
                className="card-body p-4 p-md-5"
                style={{ backgroundColor: "#8a8442", color: "white" }}
              >
                <h2 className="text-center fw-bold mb-5 display-5">
                  Business Sign Up
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
                    <form onSubmit={handleSignUp}>
                      <div className="mb-4">
                        <label className="form-label text-white fw-bold fs-5">
                          Business Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-4 border-0 shadow"
                          placeholder="Enter business name"
                          onChange={(e) => setBusinessName(e.target.value)}
                          value={businessName}
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
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
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
                          onChange={(e) => setWebsite(e.target.value)}
                          value={website}
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
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
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
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
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
                          onChange={(e) => setServices(e.target.value)}
                          value={services}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label text-white fw-bold fs-5">
                          Business Description
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-4 border-0 shadow"
                          placeholder="Enter a short business description"
                          onChange={(e) => setBusinessDescription(e.target.value)}
                          value={businessDescription}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label text-white fw-bold fs-5">
                          Type of Business
                        </label>
                        <select
                          className="form-control form-control-lg rounded-4 border-0 shadow"
                          onChange={e => setTypeOfBusiness(e.target.value)}
                          value={typeOfBusiness}
                        >
                          <option value="">Select type of business</option>
                          <option value="FOOD">Food</option>
                          <option value="RETAIL">Retail</option>
                          <option value="BEAUTY">Beauty</option>
                          <option value="HEALTH">Health</option>
                          <option value="FITNESS">Fitness</option>
                          <option value="HOME_SERVICES">Home Services</option>
                          <option value="AUTO_SERVICES">Auto Services</option>
                          <option value="PROFESSIONAL_SERVICES">Professional Services</option>
                          <option value="EDUCATION">Education</option>
                          <option value="PET_SERVICES">Pet Services</option>
                          <option value="EVENTS">Events</option>
                          <option value="TECHNOLOGY">Technology</option>
                          <option value="REAL_ESTATE">Real Estate</option>
                          <option value="TRAVEL">Travel</option>
                          <option value="OTHER">Other</option>
                        </select>
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
                          className="form-control form-control-lg rounded-4 border-0 shadow"
                          placeholder="Enter password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
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