import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BusinessCard } from "../components/BusinessCard";
import { HeroSubPages } from "../components/HeroSubPages";

export const CategoryPage = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const { category } = useParams();
    const [businesses, setBusinesses] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [loading, setLoading] = useState(true);

    // Format category for display (HOME_SERVICES → Home Services)
    const formatCategory = (cat) => {
        return cat
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await fetch(`${BASE_URL}/businesses`);
                const data = await response.json();

                // Filter by category — case insensitive
                const filtered = data.filter(
                    (b) => b.type_of_business?.toUpperCase() === category.toUpperCase()
                );
                setBusinesses(filtered);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                const response = await fetch(`${BASE_URL}/user`, {
                    headers: { Authorization: "Bearer " + token }
                });
                if (!response.ok) return;
                const data = await response.json();
                const ids = (data.favorite_businesses || []).map((b) => b.id);
                setFavoriteIds(ids);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBusinesses();
        fetchFavorites();
    }, [category]);

    const handleToggleFavorite = async (businessId, isFavorite) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) { alert("Login first"); return; }
            const method = isFavorite ? "DELETE" : "POST";
            const response = await fetch(`${BASE_URL}/favorite/business/${businessId}`, {
                method,
                headers: { Authorization: "Bearer " + token }
            });
            if (!response.ok) return;
            const data = await response.json();
            const updatedIds = (data.favorite_businesses || []).map((b) => b.id);
            setFavoriteIds(updatedIds);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="pt-5 min-vh-100 bg-light">
            <HeroSubPages title={formatCategory(category) + " Businesses"} />
            <div className="container py-2">
                {loading ? (
                    <p className="text-muted">Loading...</p>
                ) : businesses.length === 0 ? (
                    <div className="text-center py-5">
                        <h4 className="text-muted">No businesses found in this category yet.</h4>
                    </div>
                ) : (
                    <div className="row g-4">
                        {businesses.map((business) => (
                            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={business.id}>
                                <BusinessCard
                                    id={business.id}
                                    business_name={business.business_name}
                                    type_of_business={business.type_of_business}
                                    business_phone_number={business.business_phone_number}
                                    business_address={business.business_address}
                                    business_description={business.business_description}
                                    business_image={business.business_image}
                                    isFavorite={favoriteIds.includes(business.id)}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
