import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import React from "react";

export const BusinessPageProfile = () => {
    const { id } = useParams()
    const { store, dispatch } = useGlobalReducer()
    const [business, setBusiness] = useState({})
    const BASE_URL = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const fetchBusiness = async () => {
            const Response = await fetch(BASE_URL + "/business/" + id)
            if (!Response.ok) {
                return
            }
            const data = await Response.json()
            setBusiness(data)
        }
        fetchBusiness()     
    }, [id])
  

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
            <h2 className="text-center fw-bold mb-4">Business Name</h2>

            <div className="row align-items-center">
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img
                  src="https://via.placeholder.com/300x220?text=Business+Image"
                  alt="Business"
                  className="img-fluid rounded"
                />
              </div>

              <div className="col-md-8">
                <p><strong>Business Name:</strong> Example Business</p>
                <p><strong>Address:</strong> 123 Main Street, Boca Raton, FL</p>
                <p><strong>Website:</strong> https://example.com</p>
                <p><strong>Email:</strong> business@email.com</p>
                <p><strong>Phone:</strong> (561) 000-0000</p>
                <p><strong>Services:</strong> Web Design, Branding, Marketing</p>
                <p className="mb-0">
                  <strong>Description:</strong> This business helps customers with
                  professional services and a clear local presence.
                </p>
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
                    className="d-flex align-items-center justify-content-center rounded"
                    style={{ height: "250px", backgroundColor: "#e9ecef" }}
                  >
                    Map Section
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded p-4 h-100 text-center">
                  <h4 className="fw-bold mb-3">Offers</h4>
                  <div
                    className="d-flex align-items-center justify-content-center rounded"
                    style={{ height: "250px", backgroundColor: "#e9ecef" }}
                  >
                    Offers Section
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="border rounded p-4 text-center">
                <h4 className="fw-bold mb-3">Reviews</h4>
                <div
                  className="d-flex align-items-center justify-content-center rounded"
                  style={{ height: "150px", backgroundColor: "#e9ecef" }}
                >
                  Reviews Section
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BusinessPageProfile;