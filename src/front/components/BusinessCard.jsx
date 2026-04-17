import React from "react";
import profilePictureBusiness from "../assets/img/business-profile-picture.png"

export const BusinessCard = ({
    id,
    business_name,
    type_of_business,
    business_phone_number,
    business_address,
    business_description,
    business_image,
    isFavorite,
    onToggleFavorite
}) => {

    return (

        <div className="card h-100 shadow border border-2 border-black" style={{ width: "18rem", background: "#ffde59" }}>
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
                <button
                    href="#"
                    type="button"
                    className={`btn ${isFavorite ? "btn-danger" : "btn-dark"}`}
                    onClick={() => onToggleFavorite(id, isFavorite)}
                >
                    {isFavorite ? "Remove Favorite" : "Add Favorite"}
                </button>

                <button
                    href="#"
                    type="button"
                    className="btn btn-dark ms-1"
                >
                    More Info
                </button>
            </div>
        </div>



    )
}