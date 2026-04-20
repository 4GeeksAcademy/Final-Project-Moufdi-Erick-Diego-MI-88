import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const LearnMore = () => {
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [business, setBusiness] = useState(null);
    const [discounts, setDiscounts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [reviewRating, setReviewRating] = useState("");
    const [reviewComment, setReviewComment] = useState("");
    const [reviewFailed, setReviewFailed] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);

    const loggedUserId = localStorage.getItem("user_id");

    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                setLoading(true);

                const bizResponse = await fetch(`${BASE_URL}/business/${id}`);
                if (!bizResponse.ok) throw new Error("Business not found.");
                const bizData = await bizResponse.json();
                setBusiness(bizData);

                const discResponse = await fetch(`${BASE_URL}/business/${id}/discounts`);
                if (discResponse.ok) {
                    const discData = await discResponse.json();
                    setDiscounts(discData);
                }

                const reviewResponse = await fetch(`${BASE_URL}/business/${id}/reviews`);
                if (reviewResponse.ok) {
                    const reviewData = await reviewResponse.json();
                    setReviews(reviewData);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessData();
    }, [id, BASE_URL]);

    const handleReviewSubmit = async () => {
        setReviewFailed(false);
        setReviewSuccess(false);

        const response = await fetch(`${BASE_URL}/business/${id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: loggedUserId,
                rating: Number(reviewRating),
                comment: reviewComment
            })
        });

        if (!response.ok) {
            setReviewFailed(true);
            setReviewSuccess(false);
            return;
        }

        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setReviewRating("");
        setReviewComment("");
        setReviewFailed(false);
        setReviewSuccess(true);
    };

    if (loading) {
        return (
            <div className="text-center mt-5 pt-5">
                <div className="spinner-border text-secondary" role="status"></div>
                <p className="mt-2 text-muted">Loading business details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">{error}</div>
                <Link to="/" className="btn btn-outline-secondary">Back to Directory</Link>
            </div>
        );
    }

    const imageSrc = business.business_image
        ? `${BASE_URL.replace("/api", "")}/static/uploads/${business.business_image}`
        : "https://via.placeholder.com/800x400?text=No+Image+Available";

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}>
            <div className="container">

                <Link to="/" className="text-decoration-none mb-4 d-inline-block" style={{ color: "#8a8442" }}>
                    &larr; Back to Directory
                </Link>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">
                        <div className="row">

                            <div className="col-md-5 mb-4 mb-md-0">
                                <img
                                    src={imageSrc}
                                    alt={business.business_name}
                                    className="img-fluid rounded w-100"
                                    style={{ objectFit: 'cover', maxHeight: '400px' }}
                                />
                            </div>

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

                <div className="row g-4">

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

                <div className="card border-0 shadow-sm mt-4">
                    <div className="card-body p-4">
                        <h4 className="fw-bold mb-3">Reviews</h4>

                        {loggedUserId ? (
                            <div className="border rounded p-3 bg-light mb-4">
                                <h5 className="fw-bold mb-3">Leave a Review</h5>

                                {reviewFailed ? (
                                    <div className="alert alert-danger">Review failed</div>
                                ) : null}

                                {reviewSuccess ? (
                                    <div className="alert alert-success">Review submitted</div>
                                ) : null}

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Rating</label>
                                    <select
                                        className="form-control"
                                        value={reviewRating}
                                        onChange={(e) => setReviewRating(e.target.value)}
                                    >
                                        <option value="">Select rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Review</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                    />
                                </div>

                                <button
                                    className="btn fw-bold text-white"
                                    style={{ backgroundColor: "#8a8442", border: "none" }}
                                    onClick={handleReviewSubmit}
                                >
                                    Submit Review
                                </button>
                            </div>
                        ) : null}

                        <div>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review.id} className="border rounded bg-light p-3 mb-3">
                                        <h6 className="fw-bold mb-1">{review.user_name}</h6>
                                        <div className="mb-2">Rating: {review.rating}/5</div>
                                        <p className="mb-0">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-muted">No reviews yet.</div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LearnMore;