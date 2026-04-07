import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DiscountPage = () => {
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [discounts, setDiscounts] = useState([]);
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

    const createDiscount = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/business/${id}/discounts`, {
                method: "POST",
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
                const newDiscount = await response.json();
                setDiscounts([...discounts, newDiscount]);
                setFormData({
                    discount_title: "",
                    description: "",
                    percentage_rate: ""
                });
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
            <h1>Discount Page</h1>

            <form onSubmit={createDiscount} className="mb-4">
                <input
                    type="text"
                    placeholder="Discount title"
                    value={formData.discount_title}
                    onChange={(e) =>
                        setFormData({ ...formData, discount_title: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Percentage rate"
                    value={formData.percentage_rate}
                    onChange={(e) =>
                        setFormData({ ...formData, percentage_rate: e.target.value })
                    }
                />

                <button type="submit">Create Discount</button>
            </form>

            <div>
                {discounts.map((discount) => (
                    <div key={discount.id} className="border p-3 mb-3 rounded">
                        <h3>{discount.discount_title}</h3>
                        <p>{discount.description}</p>
                        <p>{discount.percentage_rate}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};