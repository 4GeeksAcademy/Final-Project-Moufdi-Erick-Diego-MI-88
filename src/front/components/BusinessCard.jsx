import React from "react";
import profilePictureBusiness from "../assets/img/business-profile-picture.png"

export const BusinessCard = ({ business_name, type_of_business, business_phone_number, business_address }) => {
    return (
        <div className="container pt-5">
            <div className="row">

                <div className="card border border-2 border-black" style={{width: "18rem", background: "#ffde59"}}>
                <img src={profilePictureBusiness} className="card-img-top mt-2" alt="Profile Picture" />
                <div className="card-body">
                    <h5 className="card-title">business_name</h5>
                    <p className="card-text">A short description of what the business does, sell or services that they provide.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">type_of_business</li>
                    <li className="list-group-item">business_phone_number</li>
                    <li className="list-group-item">business_address</li>
                </ul>
                <div className="card-body">
                    <button href="#" type="button" className="btn btn-dark me-1">Add Favorite</button>
                    <button href="#" type="button" className="btn btn-dark ms-1">More Info</button>
                </div>
            </div>

        </div>

</div >
        
    )
}