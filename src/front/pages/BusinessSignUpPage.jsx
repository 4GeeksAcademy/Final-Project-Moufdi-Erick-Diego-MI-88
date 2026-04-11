import React, { useState } from "react";

export const BusinessSignUp = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState("");
  const [password, setPassword] = useState("");
  const [signUpFailed, setSignUpFailed] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const response = await fetch(BASE_URL + "/business-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business_name: businessName,
        address: address,
        website: website,
        email: email,
        phone: phone,
        services: services,
        password: password,
      }),
    });

    if (!response.ok) {
      setSignUpFailed(true);
      return;
    }

    const data = await response.json();
    return data;
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}
    >
      <div className="container">
        <div className="card border-0 shadow-sm">
          <div
            className="card-body p-4 p-md-5"
            style={{ backgroundColor: "#8a8442", color: "white" }}
          >
            <h2 className="text-center fw-bold mb-4">Business Sign Up</h2>

            <div className="row align-items-center g-4">
              <div className="col-md-5 text-center">
                <img
                  src="https://via.placeholder.com/350x260?text=Business+Image"
                  alt="Business sign up"
                  className="img-fluid rounded"
                />
              </div>

              <div className="col-md-7">
                <form onSubmit={handleSignUp}>
                  <div className="mb-3">
                    <label className="form-label text-white">Business Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Services</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter services"
                      value={services}
                      onChange={(e) => setServices(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {signUpFailed && (
                    <p className="text-danger bg-white p-2 rounded">
                      Sign up failed
                    </p>
                  )}

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-light fw-bold px-4">
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
  );
};

export default BusinessSignUp;