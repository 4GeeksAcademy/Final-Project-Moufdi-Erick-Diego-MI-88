import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const LearnMore = () => {
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [business, setBusiness] = useState(null);
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                setLoading(true);

                // Fetch main business details (Existing Endpoint)
                const bizResponse = await fetch(`${BASE_URL}/business/${id}`);
                if (!bizResponse.ok) throw new Error("Business not found.");
                const bizData = await bizResponse.json();
                setBusiness(bizData);

                // Fetch discounts (Existing Endpoint)
                const discResponse = await fetch(`${BASE_URL}/business/${id}/discounts`);
                if (discResponse.ok) {
                    const discData = await discResponse.json();
                    setDiscounts(discData);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessData();
    }, [id, BASE_URL]);

    // --- Loading State ---
    if (loading) {
        return (
            <div className="text-center mt-5 pt-5">
                <div className="spinner-border text-secondary" role="status"></div>
                <p className="mt-2 text-muted">Loading business details...</p>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">{error}</div>
                <Link to="/" className="btn btn-outline-secondary">Back to Directory</Link>
            </div>
        );
    }

    // --- EXACT SAME image logic from BusinessPageProfile ---
    const imageSrc = business.business_image
        ? `${BASE_URL.replace("/api", "")}/static/uploads/${business.business_image}`
        : "https://via.placeholder.com/800x400?text=No+Image+Available";

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}>
            <div className="container">

                {/* Back Link */}
                <Link to="/" className="text-decoration-none mb-4 d-inline-block" style={{ color: "#8a8442" }}>
                    &larr; Back to Directory
                </Link>

                {/* Top Card: Image & Details */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                        <div className="row">

                            {/* Image Column */}
                            <div className="col-md-5 mb-4 mb-md-0">
                                <img
                                    src={imageSrc}
                                    alt={business.business_name}
                                    className="img-fluid rounded w-100"
                                    style={{ objectFit: 'cover', maxHeight: '400px' }}
                                />
                            </div>

                            {/* Details Column */}
                            <div className="col-md-7 d-flex flex-column justify-content-center">
                                <span className="badge mb-2 align-self-start" style={{ backgroundColor: "#8a8442", width: 'fit-content' }}>
                                    {business.type_of_business ? business.type_of_business.replace(/_/g, " ") : "N/A"}
                                </span>

                                <h2 className="fw-bold text-dark mb-3">{business.business_name}</h2>

                                <p className="text-muted mb-3" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                                    {business.business_description || "No description provided."}
                                </p>

                                <div className="mb-2">
                                    <strong>Address:</strong> {business.business_address || "N/A"}
                                </div>
                                <div className="mb-4">
                                    <strong>Phone:</strong> {business.business_phone_number || "N/A"}
                                </div>

                                <div>
                                    <a
                                        href={`tel:${business.business_phone_number}`}
                                        className="btn btn-lg fw-bold text-white"
                                        style={{ backgroundColor: "#8a8442", border: 'none' }}
                                    >
                                        Call Business
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom Row: Map & Offers */}
                <div className="row g-4">

                    {/* Map Section (Using exact iframe logic from Profile) */}
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <h4 className="fw-bold mb-3">Location</h4>
                                <div className="rounded overflow-hidden" style={{ height: "300px", backgroundColor: "#e9ecef" }}>
                                    {business.business_address ? (
                                        <iframe
                                            title="Business Location"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            allowFullScreen
                                            src={`https://www.google.com/maps?q=${encodeURIComponent(business.business_address)}&output=embed`}
                                        ></iframe>
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                            No address provided
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Offers Section */}
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4 d-flex flex-column">
                                <h4 className="fw-bold mb-3">Current Offers</h4>
                                <div className="flex-grow-1" style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    {discounts.length > 0 ? (
                                        discounts.map((d) => (
                                            <div key={d.id} className="border rounded bg-light p-3 mb-3">
                                                <h6 className="fw-bold mb-1">{d.discount_title}</h6>
                                                <p className="mb-1 text-muted small">{d.description}</p>
                                                <span className="badge" style={{ backgroundColor: "#8a8442" }}>
                                                    {d.percentage_rate}% OFF
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                            <p className="mb-0">No active offers at this time.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LearnMore;