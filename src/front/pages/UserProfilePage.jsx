import React, { useEffect, useState } from "react";
import { BusinessCard } from "../components/BusinessCard";
import { HeroSubPages } from "../components/HeroSubPages";
import { useNavigate } from "react-router-dom";

export const UserProfilePage = () => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const [activeTab, setActiveTab] = useState("personal");
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //Edit Profile
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        date_of_birth: ""
    });

    //Change Password
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");

    //Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Generate initials for avatar
    const initials = user
        ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
        : "";

    //Fetch user
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

    //Save profile
    const handleSaveProfile = async () => {
        const confirmed = window.confirm("Are you sure you want to save changes to your profile?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/user/${user?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });

            if (!response.ok) {
                alert("Failed to save profile. Please try again."); return;
            }

            const updated = await response.json();
            setUser(updated);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    //Change password
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordMsg("Passwords do not match.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/user/${user.id}/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: user.email,
                    new_password: newPassword
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error changing password:", response.status, errorText);
                setPasswordMsg("Failed to change password. Please try again.");
                return;
            }

            setPasswordMsg("Password changed successfully!");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error changing password:", error);
        }
    };

    //Delete account
    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/${user.id}`, {
                method: "DELETE"
            });
            if (!response.ok) { alert("Error deleting account."); return; }
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            navigate("/");
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    // ✅ Remove favorite — calls DELETE /favorite/business/<business_id>
    const handleRemoveFavorite = async (businessId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/favorite/business/${businessId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                alert("Failed to remove favorite. Please try again.");
                return;
            }

            // Remove it from local state so UI updates instantly
            setFavorites(prev => prev.filter(biz => biz.id !== businessId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    // Handle logout
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
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={isEditing ? editForm.first_name : user?.first_name || ""}
                                                readOnly={!isEditing}
                                                onChange={e => setEditForm({ ...editForm, first_name: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Last name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={isEditing ? editForm.last_name : user?.last_name || ""}
                                                readOnly={!isEditing}
                                                onChange={e => setEditForm({ ...editForm, last_name: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={user?.email || ""}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Phone</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                value={isEditing ? editForm.phone : user?.phone || ""}
                                                readOnly={!isEditing}
                                                onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={isEditing ? editForm.city : user?.city || ""}
                                                readOnly={!isEditing}
                                                onChange={e => setEditForm({ ...editForm, city: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small">Date of birth</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={isEditing ? editForm.date_of_birth : user?.date_of_birth || ""}
                                                readOnly={!isEditing}
                                                onChange={e => setEditForm({ ...editForm, date_of_birth: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 d-flex gap-2 flex-wrap">
                                        {!isEditing ? (
                                            <button className="button btn btn-warning mt-4" onClick={() => setIsEditing(true)}>Edit profile</button>
                                        ) : (
                                            <>
                                                <button className="btn btn-success mt-4" onClick={handleSaveProfile}>
                                                    Save changes
                                                </button>
                                                <button className="btn btn-outline-secondary mt-4" onClick={() => setIsEditing(false)}>
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        <button className="ms-2 btn btn-danger mt-4" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
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
                                                        business_image={
                                                            biz.business_image
                                                                ? `${BASE_URL.replace("/api", "")}/static/uploads/${biz.business_image}`
                                                                : null
                                                        }
                                                        isFavorite={true}
                                                        // ✅ Now wired to actually remove the favorite
                                                        onToggleFavorite={() => handleRemoveFavorite(biz.id)}
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
                                    <div className="list-group mb-4">
                                        <div className="list-group-item d-flex justify-content-between align-items-center">
                                            Email notifications
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Change password section */}
                                    <p className="text-muted small fw-bold mb-2">Change Password</p>
                                    <div className="card border-0 bg-light p-3 mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label className="form-label mb-0">New password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter new password"
                                                value={newPassword}
                                                onChange={e => { setNewPassword(e.target.value); setPasswordMsg(""); }}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <label className="form-label mb-0">Confirm password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Confirm new password"
                                                value={confirmPassword}
                                                onChange={e => { setConfirmPassword(e.target.value); setPasswordMsg(""); }}
                                            />
                                        </div>
                                        {passwordMsg && (
                                            <p className={`small mb-2 ${passwordMsg.includes("successfully") ? "text-success" : "text-danger"}`}>
                                                {passwordMsg}
                                            </p>
                                        )}
                                        <button className="button btn btn-sm mt-2" onClick={handleChangePassword}>Change</button>
                                    </div>

                                    {/* Delete Account */}
                                    <p className="text-muted small fw-bold mb-2">Danger Zone</p>
                                    <div className="card border-danger p-3">
                                        <p className="small text-danger mb-2">
                                            Once you delete your account, there is no going back.
                                        </p>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => setShowDeleteModal(true)}>
                                            Delete account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete confirmation modal */}
            {showDeleteModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
                >
                    <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "90%" }}>
                        <h5 className="fw-bold text-danger mb-3">Delete Account</h5>
                        <p className="text-muted">
                            Are you sure you want to delete your account? This action <strong>cannot be undone</strong>.
                        </p>
                        <div className="d-flex gap-2 justify-content-end mt-3">
                            <button className="btn btn-outline-secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={handleDeleteAccount}>
                                Yes, delete my account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
