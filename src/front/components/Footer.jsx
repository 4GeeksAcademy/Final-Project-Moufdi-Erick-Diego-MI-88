import { useState } from "react";
import logoImageUrl from "../assets/img/logo.png";

export const Footer = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      setNewsletterMsg("Please enter your email.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
      });

      const data = await response.json();

      if (!response.ok) {
        setNewsletterMsg(data.msg || "Something went wrong.");
        setIsSuccess(false);
        return;
      }

      setNewsletterMsg("You are now subscribed!");
      setIsSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
      setNewsletterMsg("Connection error. Try again.");
      setIsSuccess(false);
    }
  };


  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">



        <div className="container pt-2 d-flex">
          

            {/* Brand +  Links */}
            <div className="text-center col-4">
            <div className="justify-content-center gap-3">
              <a className="navbar-brand" href="#">
                <img src={logoImageUrl} style={{ width: "220px" }} />
              </a><br></br>
              <a href="/" className="text-white-50 small">Home</a><br></br>
              <a href="/about-us" className="text-white-50 small">About Us</a><br></br>
              <a href="/contact-us" className="text-white-50 small">Contact Us</a>
            </div>
          </div>

          

            {/* Subscribe Newsletter */}
            <div className="text-center col-4">
            <h3 className="fs-4">Subscribe Newsletter</h3>
            <div className="d-flex justify-content-center">

              <input
                type="email"
                className="form-control w-auto me-2"
                placeholder="Email"
                style={{ maxWidth: "200px" }}
                value={email}
                onChange={e => { setEmail(e.target.value); setNewsletterMsg(""); }}
              />
              <button className="button btn btn-warning btn-sm" onClick={handleSubscribe}>
                Join
              </button>
            </div>
             {newsletterMsg && (
              <p className={`small mt-2 ${isSuccess ? "text-success" : "text-danger"}`}>
                {newsletterMsg}
              </p>
            )}
          </div>
          
            
            {/*  Links */}
            <div className="col-4">
            <h3 className="text-center fs-4">Social Media</h3>
            <div className="d-flex justify-content-center gap-3 mb-3">

              <a href="https://www.instagram.com" target="_blank"><i className="col-4 fa-brands fa-square-instagram fa-2xl" style={{ color: "#ffde59" }}></i></a><br></br>
              <a href="https://www.facebook.com" target="_blank"><i className="col-4 fa-brands fa-square-facebook fa-2xl" style={{ color: "#ffde59" }}></i></a><br></br>
              <a href="https://www.linkedin.com" target="_blank"><i className="col-4 fa-brands fa-linkedin fa-2xl" style={{ color: "#ffde59" }}></i></a>
            </div>
          </div>
        </div>


        {/* Copyright */}
        <p className="text-center small text-white mb-0">
          <strong>© 2026 My Yellow Pages </strong>
        </p>
      </div>
    </footer>
  );
};
