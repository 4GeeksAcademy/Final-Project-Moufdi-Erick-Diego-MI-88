import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

export const BusinessPageProfile = () => {
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [business, setBusiness] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [reviews, setReviews] = useState([]); // ✅ Added reviews state
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [form, setForm] = useState({
    business_name: "",
    business_address: "",
    business_phone_number: "",
    business_description: "",
    type_of_business: ""
  });

  const fetchBusiness = async () => {
    const response = await fetch(BASE_URL + "/business/" + id);
    if (!response.ok) return;

    const data = await response.json();
    setBusiness(data);
    setForm({
      business_name: data.business_name || "",
      business_address: data.business_address || "",
      business_phone_number: data.business_phone_number || "",
      business_description: data.business_description || "",
      type_of_business: data.type_of_business || ""
    });
  };

  useEffect(() => {
    fetchBusiness();
  }, [id, BASE_URL]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await fetch(BASE_URL + "/business/" + id + "/discounts");
      if (!response.ok) return;

      const data = await response.json();
      setDiscounts(data);
    };

    fetchDiscounts();
  }, [id, BASE_URL]);

  // ✅ Added reviews fetch
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(BASE_URL + "/business/" + id + "/reviews");
      if (!response.ok) return;

      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, [id, BASE_URL]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    const response = await fetch(BASE_URL + "/business/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (!response.ok) return;

    let updatedBusiness = await response.json();

    if (selectedImage) {
      const imageData = new FormData();
      imageData.append("image", selectedImage);

      const imageResponse = await fetch(
        BASE_URL + "/business/" + id + "/upload-image",
        {
          method: "POST",
          body: imageData
        }
      );

      if (imageResponse.ok) {
        updatedBusiness = await imageResponse.json();
      }
    }

    setBusiness(updatedBusiness);
    setForm({
      business_name: updatedBusiness.business_name || "",
      business_address: updatedBusiness.business_address || "",
      business_phone_number: updatedBusiness.business_phone_number || "",
      business_description: updatedBusiness.business_description || "",
      type_of_business: updatedBusiness.type_of_business || ""
    });
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const imageData = new FormData();
    imageData.append("image", selectedImage);

    const imageResponse = await fetch(
      BASE_URL + "/business/" + id + "/upload-image",
      {
        method: "POST",
        body: imageData
      }
    );

    if (!imageResponse.ok) {
      alert("Image upload failed.");
      return;
    }

    const updatedBusiness = await imageResponse.json();
    setBusiness(updatedBusiness);
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setForm({
      business_name: business.business_name || "",
      business_address: business.business_address || "",
      business_phone_number: business.business_phone_number || "",
      business_description: business.business_description || "",
      type_of_business: business.type_of_business || ""
    });
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this business profile?\n\nThis will permanently remove the profile and cannot be undone."
    );
    if (!confirmed) return;

    const response = await fetch(BASE_URL + "/business/" + id, {
      method: "DELETE"
    });

    if (!response.ok) {
      alert("We couldn't delete the business profile. Please try again.");
      return;
    }

    window.location.href = "/";
  };

  if (!business) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const imageSrc = business.business_image
    ? `${BASE_URL.replace("/api", "")}/static/uploads/${business.business_image}`
    : "https://via.placeholder.com/300x220?text=Business+Image";

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}
    >
      <div className="container">
        <div className="card border-0 shadow-sm mb-4">
          <div
            className="card-body p-4"
            style={{ backgroundColor: "#8a8442", color: "white" }}
          >
            <h2 className="text-center fw-bold mb-4">
              {isEditing ? form.business_name : business.business_name}
            </h2>

            <div className="row align-items-center">
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img
                  src={selectedImage ? URL.createObjectURL(selectedImage) : imageSrc}
                  alt="Business"
                  className="img-fluid rounded"
                />

                {isEditing && (
                  <div className="mt-3">
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                  </div>
                )}
              </div>

              <div className="col-md-8">
                <div className="mb-3">
                  <strong>Business Name:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      name="business_name"
                      className="form-control mt-2"
                      value={form.business_name}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{business.business_name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <strong>Address:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      name="business_address"
                      className="form-control mt-2"
                      value={form.business_address}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{business.business_address}</div>
                  )}
                </div>

                <div className="mb-3">
                  <strong>Phone:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      name="business_phone_number"
                      className="form-control mt-2"
                      value={form.business_phone_number}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{business.business_phone_number}</div>
                  )}
                </div>

                <div className="mb-3">
                  <strong>Type of Business:</strong>
                  {isEditing ? (
                    <select
                      name="type_of_business"
                      className="form-control mt-2"
                      value={form.type_of_business}
                      onChange={handleChange}
                    >
                      <option value="">Select type of business</option>
                      <option value="food">Food</option>
                      <option value="retail">Retail</option>
                      <option value="beauty">Beauty</option>
                      <option value="health">Health</option>
                      <option value="fitness">Fitness</option>
                      <option value="home_services">Home Services</option>
                      <option value="auto_services">Auto Services</option>
                      <option value="professional_services">Professional Services</option>
                      <option value="education">Education</option>
                      <option value="pet_services">Pet Services</option>
                      <option value="events">Events</option>
                      <option value="technology">Technology</option>
                      <option value="real_estate">Real Estate</option>
                      <option value="travel">Travel</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div>{business.type_of_business}</div>
                  )}
                </div>

                <div className="mb-3">
                  <strong>Description:</strong>
                  {isEditing ? (
                    <textarea
                      name="business_description"
                      className="form-control mt-2"
                      rows="4"
                      value={form.business_description}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{business.business_description}</div>
                  )}
                </div>

                <div className="mt-4 text-end">
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-light fw-bold me-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-outline-light fw-bold me-2"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-danger fw-bold"
                        onClick={handleDelete}
                      >
                        Delete Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-light fw-bold me-2"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                      <button
                        className="btn btn-danger fw-bold"
                        onClick={handleDelete}
                      >
                        Delete Profile
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="border rounded p-4 h-100 text-center">
                  <h4 className="fw-bold mb-3">Location</h4>
                  <div
                    className="rounded overflow-hidden"
                    style={{ height: "250px", backgroundColor: "#e9ecef" }}
                  >
                    {form.business_address ? (
                      <iframe
                        title="Business Location"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${encodeURIComponent(form.business_address)}&output=embed`}
                      ></iframe>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100">
                        Map Section
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded p-4 h-100 text-center">
                  <h4 className="fw-bold mb-3">Offers</h4>
                  <div
                    className="rounded p-3"
                    style={{ minHeight: "250px", backgroundColor: "#e9ecef" }}
                  >
                    {discounts.length > 0 ? (
                      <>
                        {discounts.map((discount) => (
                          <div key={discount.id} className="border rounded bg-white p-2 mb-2 text-start">
                            <h6 className="fw-bold mb-1">{discount.discount_title}</h6>
                            <p className="mb-1">{discount.description}</p>
                            <p className="mb-0 fw-bold">{discount.percentage_rate}% OFF</p>
                          </div>
                        ))}

                        <a href={`/business/${id}/discounts`} className="btn btn-dark fw-bold mt-2">
                          Manage Offers
                        </a>
                      </>
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <p className="mb-3">No offers yet</p>
                        <a href={`/business/${id}/discounts`} className="btn btn-dark fw-bold">
                          Manage Offers
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Reviews section — now fetches and displays real data */}
            <div className="mt-4">
              <div className="border rounded p-4">
                <h4 className="fw-bold mb-3">Reviews</h4>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="border rounded bg-light p-3 mb-3">
                      <h6 className="fw-bold mb-1">{review.user_name}</h6>
                      <div className="mb-2 text-muted">Rating: {review.rating}/5</div>
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
    </div>
  );
};

export default BusinessPageProfile;
