import React from "react";
import profilePictureBusiness from "../assets/img/business-profile-picture.png"

export const BusinessCard = () => {
    return (
        <div className="container pt-5">
            <div className="row">

                <div className="card border border-2 border-black" style={{width: "18rem", background: "#ffde59"}}>
                <img src={profilePictureBusiness} className="card-img-top mt-2" alt="Profile Picture" />
                <div className="card-body">
                    <h5 className="card-title">Business Name</h5>
                    <p className="card-text">A short description of what the business does, sell or services that they provide.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">What they do</li>
                    <li className="list-group-item">(305) 000-0000</li>
                    <li className="list-group-item">123 Street. Miami, FL 33333</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Add Favorite</a>
                    <a href="#" className="card-link">More Info</a>
                </div>
            </div>

        </div>

</div >
        
    )
}