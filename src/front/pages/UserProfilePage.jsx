import React, { useEffect, useState } from "react";
import { BusinessCard } from "../components/BusinessCard";
import { HeroSubPages } from "../components/HeroSubPages";
import { useNavigate } from "react-router-dom";

export const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const initials = user
        ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
        : "";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const BASE_URL = import.meta.env.VITE_BACKEND_URL;

                if (!token) {
                    console.error("No token found in localStorage");
                    navigate("/login");
                    return;
                }

                const response = await fetch(`${BASE_URL}/user`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error fetching user data:", response.status, errorText);
                    navigate("/login");
                    return;
                }

                const data = await response.json();
                console.log("USER DATA:", data);

                setUser(data);
                setFavorites(data.favorite_businesses || []);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        navigate("/");
    };

    if (loading) {
        return (
            <div className="container py-5">
                <h4>Loading profile...</h4>
            </div>
        );
    }

    return (
        <div className="container-fluid min-vh-100 bg-light pt-5">
            <HeroSubPages title="My Profile" />
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm text-center p-3">
                            <div className="d-flex justify-content-center mb-3">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        fontSize: "2rem",
                                        background: "#ffde59"
                                    }}
                                >
                                    {initials}
                                </div>
                            </div>

                            <h6 className="fw-bold mb-0">
                                {user?.first_name || ""} {user?.last_name || ""}
                            </h6>
                            <small className="text-muted">{user?.email || ""}</small>

                            <hr />

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

                    <div className="col-md-9">
                        <div className="card border-0 shadow-sm p-4">
                            {activeTab === "personal" && (
                                <div>
                                    <h5 className="fw-bold mb-4">Personal Info</h5>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">First name</label>
                                            <input type="text" className="form-control" value={user?.first_name || ""} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Last name</label>
                                            <input type="text" className="form-control" value={user?.last_name || ""} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Email</label>
                                            <input type="email" className="form-control" value={user?.email || ""} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Phone</label>
                                            <input type="tel" className="form-control" value={user?.phone || ""} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">City</label>
                                            <input type="text" className="form-control" value={user?.city || ""} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Date of birth</label>
                                            <input type="text" className="form-control" value={user?.date_of_birth || ""} readOnly />
                                        </div>
                                    </div>
                                    <button className="button btn btn-warning mt-4">Edit profile</button>
                                    <button className="ms-2 btn btn-danger mt-4" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}

                            {activeTab === "favorites" && (
                                <div>
                                    <h5 className="fw-bold mb-4">Favorites</h5>
                                    {favorites.length === 0 ? (
                                        <p className="text-muted">You have no favorite businesses yet.</p>
                                    ) : (
                                        <div className="row g-3">
                                            {favorites.map((biz) => (
                                                <div className="col-md-6" key={biz.id}>
                                                    <BusinessCard
                                                        id={biz.id}
                                                        business_name={biz.business_name}
                                                        type_of_business={biz.type_of_business}
                                                        business_phone_number={biz.business_phone_number}
                                                        business_address={biz.business_address}
                                                        business_description={biz.business_description}
                                                        business_image={biz.business_image}
                                                        isFavorite={true}
                                                        onToggleFavorite={() => {}}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

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