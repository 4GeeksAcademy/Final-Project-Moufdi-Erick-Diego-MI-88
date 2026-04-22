import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const DiscountPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [discounts, setDiscounts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        discount_title: "",
        description: "",
        percentage_rate: ""
    });

    const getDiscounts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/business/${id}/discounts`);
            const data = await response.json();
            setDiscounts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const resetForm = () => {
        setFormData({
            discount_title: "",
            description: "",
            percentage_rate: ""
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = editingId
                ? `${BASE_URL}/business/${id}/discounts/${editingId}`
                : `${BASE_URL}/business/${id}/discounts`;

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    discount_title: formData.discount_title,
                    description: formData.description,
                    percentage_rate: parseFloat(formData.percentage_rate)
                })
            });

            if (response.ok) {
                await getDiscounts();
                resetForm();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (discount) => {
        setEditingId(discount.id);
        setFormData({
            discount_title: discount.discount_title,
            description: discount.description,
            percentage_rate: discount.percentage_rate
        });
    };

    const handleDelete = async (discountId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/business/${id}/discounts/${discountId}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                setDiscounts(discounts.filter(discount => discount.id !== discountId));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDiscounts();
    }, []);

    return (
        <div className="container mt-4">

            {/* ✅ Back button */}
            <button
                className="btn btn-outline-secondary mb-3"
                onClick={() => navigate(`/business/${id}`)}
            >
                ← Back to Business Profile
            </button>

            <h1 className="mb-4">Manage Offers</h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Discount title"
                    value={formData.discount_title}
                    onChange={(e) =>
                        setFormData({ ...formData, discount_title: e.target.value })
                    }
                    className="form-control mb-2"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="form-control mb-2"
                />

                <input
                    type="number"
                    placeholder="Percentage rate"
                    value={formData.percentage_rate}
                    onChange={(e) =>
                        setFormData({ ...formData, percentage_rate: e.target.value })
                    }
                    className="form-control mb-2"
                />

                <button type="submit" className="btn btn-dark me-2">
                    {editingId ? "Save Changes" : "Create Discount"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div>
                {discounts.map((discount) => (
                    <div key={discount.id} className="border p-3 mb-3 rounded">
                        <h3>{discount.discount_title}</h3>
                        <p>{discount.description}</p>
                        <p>{discount.percentage_rate}%</p>

                        <button
                            className="btn btn-warning me-2"
                            onClick={() => handleEdit(discount)}
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(discount.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};