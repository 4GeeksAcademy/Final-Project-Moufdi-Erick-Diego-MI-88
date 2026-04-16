import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Hero } from "../components/Hero.jsx";
import { BusinessCard } from "../components/BusinessCard.jsx";


export const Home = () => {

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



    useEffect(() => {
        loadBusinesses();
    }, [])

    return (

        <div className="text-center">
            <Hero />

            <div className="container py-5">
                <div className="row g-4">
                    {store?.businesses.map((business) => {
                        
                        // moufdi put this to build the full image URL so the cards display the actual uploaded pictures correctly
                        const fullImageUrl = business.business_image 
                            ? `${import.meta.env.VITE_BACKEND_URL.replace("/api", "")}/static/uploads/${business.business_image}` 
                            : null;

                        return (
                            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={business.id}>
                                <BusinessCard
                                    // moufdi put this to pass the business ID to the card so the "More Info" link works
                                    id={business.id}
                                    business_name={business.business_name}
                                    type_of_business={business.type_of_business}
                                    business_phone_number={business.business_phone_number}
                                    business_address={business.business_address}
                                    business_description={business.business_description}
                                    // moufdi put this to pass the full URL instead of just the filename
                                    business_image={fullImageUrl}
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>


    );
};