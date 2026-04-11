import React from "react";
import { BusinessCard } from "../components/BusinessCard";

import { useState } from "react";

export const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState("personal");

     const favorites = [
        {
            business_name: "Casa Juancho",
            type_of_business: "Restaurant",
            business_phone_number: "(305) 555-0101",
            business_address: "2436 SW 8th St, Miami FL"
        },
        {
            business_name: "LegalEdge",
            type_of_business: "Professional Services",
            business_phone_number: "(305) 555-0202",
            business_address: "1200 Brickell Ave, Miami FL"
        },
        {
            business_name: "FixIt Pro",
            type_of_business: "Home Services",
            business_phone_number: "(305) 555-0303",
            business_address: "870 NW 42nd Ave, Miami FL"
        },
        {
            business_name: "Nail Studio",
            type_of_business: "Beauty",
            business_phone_number: "(305) 555-0404",
            business_address: "3250 NE 1st Ave, Miami FL"
        },
    ];


    return (
        <div className="container-fluid min-vh-100 bg-light pt-5">
            <div className="container">
                <div className="row g-4">

                    {/* ── Sidebar ── */}
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm text-center p-3">

                            {/* profile picture */}
                            <div className="d-flex justify-content-center mb-3">
                                <div
                                    className="rounded-circle bg-warning d-flex align-items-center justify-content-center"
                                    style={{ width: "90px", height: "90px", fontSize: "2rem" }}
                                >
                                    ER
                                </div>
                            </div>

                            <h6 className="fw-bold mb-0">Erick de los Reyes</h6>
                            <small className="text-muted">erick@email.com</small>

                            <hr />

                            {/* tabs */}
                            <div className="d-flex flex-column gap-2">
                                <button
                                    className={`btn btn-sm text-start ${activeTab === "personal" ? "btn-warning fw-bold" : "btn-outline-secondary"}`}
                                    onClick={() => setActiveTab("personal")}
                                >
                                    👤 Personal Info
                                </button>
                                <button
                                    className={`btn btn-sm text-start ${activeTab === "favorites" ? "btn-warning fw-bold" : "btn-outline-secondary"}`}
                                    onClick={() => setActiveTab("favorites")}
                                >
                                    ★ Favorites
                                </button>
                                <button
                                    className={`btn btn-sm text-start ${activeTab === "settings" ? "btn-warning fw-bold" : "btn-outline-secondary"}`}
                                    onClick={() => setActiveTab("settings")}
                                >
                                    ⚙ Settings
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Main content ── */}
                    <div className="col-md-9">
                        <div className="card border-0 shadow-sm p-4">

                            {/* ── Personal Info ── */}
                            {activeTab === "personal" && (
                                <div>
                                    <h5 className="fw-bold mb-4">Personal Info</h5>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">First name</label>
                                            <input type="text" className="form-control" defaultValue="Erick" readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Last name</label>
                                            <input type="text" className="form-control" defaultValue="de los Reyes" readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Email</label>
                                            <input type="email" className="form-control" defaultValue="erick@email.com" readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Phone</label>
                                            <input type="tel" className="form-control" defaultValue="+1 (305) 555-0101" readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">City</label>
                                            <input type="text" className="form-control" defaultValue="Miami, FL" readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Date of birth</label>
                                            <input type="text" className="form-control" defaultValue="Jan 1, 1990" readOnly />
                                        </div>
                                    </div>
                                    <button className="btn btn-warning mt-4">Edit profile</button>
                                </div>
                            )}

                            {/* ── Favorites ── */}
                            {activeTab === "favorites" && (
                                <div>
                                    <h5 className="fw-bold mb-4">Favorites</h5>
                                    <div className="row g-3">
                                        {[
                                            { name: "Casa Juancho", category: "Restaurant" },
                                            { name: "LegalEdge", category: "Lawyers" },
                                            { name: "FixIt Pro", category: "Home Improve" },
                                            { name: "Nail Studio", category: "Beauty" },
                                        ].map((biz, i) => (
                                            <div className="col-md-4" key={i}>
                                                <div className="card border h-100">
                                                    <div
                                                        className="bg-secondary d-flex align-items-center justify-content-center text-white"
                                                        style={{ height: "120px", fontSize: "13px" }}
                                                    >
                                                        No image
                                                    </div>
                                                    <div className="card-body p-2">
                                                        <p className="fw-bold mb-0 small">{biz.name}</p>
                                                        <small className="text-muted">{biz.category}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Settings ── */}
                            {activeTab === "settings" && (
                                <div>
                                    <h5 className="fw-bold mb-4">Settings</h5>

                                    <p className="text-muted small fw-bold mb-2">Notifications</p>
                                    <ul className="list-group mb-4">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Email notifications
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Promotional offers
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" />
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            New businesses near me
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                            </div>
                                        </li>
                                    </ul>

                                    <p className="text-muted small fw-bold mb-2">Account</p>
                                    <ul className="list-group mb-4">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Change password
                                            <button className="btn btn-sm btn-outline-secondary">Change</button>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Language
                                            <select className="form-select form-select-sm w-auto">
                                                <option>English</option>
                                                <option>Español</option>
                                            </select>
                                        </li>
                                    </ul>

                                    <button className="btn btn-outline-danger btn-sm">Delete account</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
