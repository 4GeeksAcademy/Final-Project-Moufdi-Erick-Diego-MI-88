import React from "react";
import { Link } from "react-router-dom";
import profilePictureBusiness from "../assets/img/business-profile-picture.png";

export const BusinessCard = ({ 
    // moufdi put this to pass the business ID from the homepage so it can route to the details
    id, 
    business_name, 
    type_of_business, 
    business_phone_number, 
    business_address, 
    business_description, 
    business_image 
}) => {
    
    return (
        <div className="card h-100 border border-2 border-black" style={{ width: "18rem", background: "#ffde59" }}>
            <img src={business_image || profilePictureBusiness} className="card-img-top p-3" alt="Profile Picture" />
            <div className="card-body">
                <h5 className="card-title">{business_name || "No Business Name Available"}</h5>
                <p className="card-text">{business_description || "No Description Available"}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{type_of_business || "No Category Available"}</li>
                <li className="list-group-item">{business_phone_number || "No Phone Number Available"}</li>
                <li className="list-group-item">{business_address || "No Address Available"}</li>
            </ul>
            <div className="card-body">
                <button type="button" className="btn btn-dark me-1">Add Favorite</button>
                
                {/* moufdi put this to replace the dead button with a working route link to the Learn More page */}
                <Link to={`/offer/${id}`} className="btn btn-dark ms-1">More Info</Link>
            </div>
        </div>
    )
}