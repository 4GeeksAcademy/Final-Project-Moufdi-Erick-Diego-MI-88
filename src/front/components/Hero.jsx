import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import heroImageUrl from "../assets/img/heroimg.webp";

export const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    const modalElement = document.getElementById("exampleModal");

    if (modalElement && window.bootstrap) {
      const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");

    navigate(path);
  };


  return (

    <section className="container-fluid min-vh-70 d-flex align-items-center bg-light border-bottom border-black border-1 shadow">
      <div className="container-fluid">
        <div className="row align-items-center g-5">

          {/* Left column - Text */}
          <div className="col-md-6 text-start p-5">
            <h1 className="display-4 fw-bold">Welcome to MYP</h1>
            <p className="lead mt-2">
              All your services in your pocket
            </p>
            <button className="button btn btn-warning btn-lg me-2" 
            onClick={() => handleNavigate("/login")}
                    >
              Log In
            </button>

            {/* Button trigger modal */}
            <button type="button" className="button btn btn-warning btn-lg me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Sign Up
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Sign Up</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <strong>Would you like to create a personal or a business account?</strong>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-dark btn-lg me-2"
                      onClick={() => handleNavigate("/signup")}
                    >
                      Personal
                    </button>

                    <button
                      type="button"
                      className="button btn btn-warning btn-lg me-2"
                      onClick={() => handleNavigate("/business-signup")}
                    >
                      Business
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Imagen */}
          <div
   className="col-md-6 d-none d-md-block"
  style={{
    backgroundImage: `
      linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(248,249,250,1) 100%),
      url(${heroImageUrl})
    `,
    backgroundSize: "cover",
    backgroundPosition: "top",
    minHeight: "600px"
  }}
></div>

        </div>
      </div>
    </section>
  )
}