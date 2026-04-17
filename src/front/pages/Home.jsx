import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Hero } from "../components/Hero.jsx";
import { BusinessCard } from "../components/BusinessCard.jsx";


export const Home = () => {

	const BASE_URL = import.meta.env.VITE_BACKEND_URL
	const [businesses, setBusinesses] = useState([]);
	const [favoriteIds, setFavoriteIds] = useState([]);
	const { store, dispatch } = useGlobalReducer()

	const loadBusinesses = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/businesses")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_businesses", payload: data })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch businesses from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

const loadUserFavorites = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;

			const response = await fetch(`${BASE_URL}/user`, {
				headers: {
					Authorization: "Bearer " + token
				}
			});

			const data = await response.json();

			const ids = (data.favorite_businesses || []).map(b => b.id);
			setFavoriteIds(ids);

		} catch (error) {
			console.error(error);
		}
	};

const handleToggleFavorite = async (businessId, isFavorite) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      return;
    }

    const method = isFavorite ? "DELETE" : "POST";

    const response = await fetch(`${BASE_URL}/favorite/business/${businessId}`, {
      method,
      headers: {
        Authorization: "Bearer " + token
      }
    });
	if (!response.ok) return;
    const data = await response.json();

    const updatedIds = (data.favorite_businesses || []).map(b => b.id);
    setFavoriteIds(updatedIds);

  } catch (error) {
    console.error(error);
  }
};

	useEffect(() => {
		loadBusinesses();
		loadUserFavorites();
	}, [])

	return (

		<div className="text-center">
			<Hero />

			<div className="container py-5">
				<div className="row g-4">
					{store?.businesses.map((business) => (
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

			</div>
		</div>


	);
}; 