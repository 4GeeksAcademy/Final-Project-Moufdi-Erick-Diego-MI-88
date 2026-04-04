import React from "react";
import heroImageUrl from "../assets/img/heroimg.webp";

export const Hero = () => {
    return (
        
        <section className="container-fluid min-vh-100 d-flex align-items-center bg-light">
    <div className="container">
        <div className="row align-items-center">

            {/* Columna izquierda - Texto */}
            <div className="col-md-6 text-start">
                <h1 className="display-4 fw-bold">Welcome to MYP</h1>
                <p className="lead mt-2">
                    All your services in your pocket
                </p>
                <button className="btn btn-warning btn-lg me-2">
                    Log In
                </button>
                <button className="btn btn-warning btn-lg ms-2">
    Sign Up
</button>
            </div>

            {/* Columna derecha - Imagen */}
            <div className="col-md-6 text-center">
                <img 
                    src={heroImageUrl} 
                    className="img-fluid rounded shadow border border-black border-2"
                    alt="Hero image"
                />
            </div>

        </div>
    </div>
</section>
    )
}