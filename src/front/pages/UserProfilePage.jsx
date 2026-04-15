import React, { useEffect } from "react";
import { BusinessCard } from "../components/BusinessCard";
import { HeroSubPages } from "../components/HeroSubPages";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const initials = user ? user.first_name[0] + user.last_name[0] : ""

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const BASE_URL = import.meta.env.VITE_BACKEND_URL;

            const response = await fetch(BASE_URL + "/user", {
                methods: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } 
        };
        fetchUser();
    
    }, [])


    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        navigate("/")
    }

    return (

        <div className="container-fluid min-vh-100 bg-light pt-5">
<HeroSubPages title="My Profile" />
            <div className="container">
                
                <div className="row g-4">

                    {/* ── Sidebar ── */}
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm text-center p-3">

                            {/* profile picture */}
                            <div className="d-flex justify-content-center mb-3">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "90px", height: "90px", fontSize: "2rem", background: "#ffde59" }}
                                >
                                    {initials}
                                </div>
                            </div>

                            <h6 className="fw-bold mb-0">{user?.first_name} {user?.last_name}</h6>
                            <small className="text-muted">{user?.email}</small>

                            <hr />

                            {/* tabs */}
                            <div className="d-flex flex-column gap-2">
                                <button
                                    className={`btn btn-sm text-start ${activeTab === "personal" ? "button fw-bold" : "btn-outline-secondary"}`}
                                    onClick={() => setActiveTab("personal")}
                                >
                                    Personal Info
                                </button>
                                <button
                                    className={`btn btn-sm text-start ${activeTab === "favorites" ? "button fw-bold" : "btn-outline-secondary"}`}
                                    onClick={() => setActiveTab("favorites")}
                                >
                                    Favorites
                                </button>
                                <button
                                    className={`btn btn-sm text-start ${activeTab === "settings" ? "button fw-bold" : "btn-outline-secondary"}`}
                                    onClick={() => setActiveTab("settings")}
                                >
                                    Settings
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
                                            <input type="text" className="form-control" defaultValue={user?.first_name} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Last name</label>
                                            <input type="text" className="form-control" defaultValue={user?.last_name} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Email</label>
                                            <input type="email" className="form-control" defaultValue={user?.email} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Phone</label>
                                            <input type="tel" className="form-control" defaultValue={user?.phone} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">City</label>
                                            <input type="text" className="form-control" defaultValue={user?.city} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Date of birth</label>
                                            <input type="text" className="form-control" defaultValue={user?.date_of_birth} readOnly />
                                        </div>
                                    </div>
                                    <button className="button btn btn-warning mt-4">Edit profile</button>
                                    <button className="ms-2 btn btn-danger mt-4" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                               
                            )}

                            {/* ── Favorites ── */}
                            {activeTab === "favorites" && (
                                <div>
                                    <h5 className="fw-bold mb-4">Favorites</h5>
                                    <div className="row g-3">
                                        {favorites.map((biz, i) => (
                                            <div className="col-md-6" key={i}>
                                                <BusinessCard
                                                    business_name={biz.business_name}
                                                    type_of_business={biz.type_of_business}
                                                    business_phone_number={biz.business_phone_number}
                                                    business_address={biz.business_address}
                                                />
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
                                            Send me SMS offers
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" />
                                            </div>
                                        </li>

                                    </ul>

                                    <p className="text-muted small fw-bold mb-2">Account</p>
                                    <ul className="list-group mb-4">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Change password
                                            <button className="button btn btn-sm">Change</button>
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
