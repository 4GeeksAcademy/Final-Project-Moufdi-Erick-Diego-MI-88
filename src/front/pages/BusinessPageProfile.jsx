import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useDiscountCalculator } from "../hooks/useDiscountCalculator";
import DiscountPage from "../components/DiscountPage";
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
        <div className="conatiner border border rounded text-center mt-4">
            <div className="row mt-5">
                <div className="col-4">
                    <img src="placeholder" className="rounded cardImage float-start mb-5 img-fluid rounde placeholder"></img>
                </div>
                <div className="col-4">
                    <h1 className="text-light">Business Name: {business.name}</h1>
                    <h1 className="text-light">Category: {business.category}</h1>
                    <h1 className="text-light">Phone Number: {business.phone_number}</h1>
                    <h1 className="text-light">Business Address: {business.address}</h1>
                    <h1 className="text-light">Business Website: {business.website}</h1>
                    <h1 className="text-light">Discounts and Offers: {business.discounts}</h1>
                </div>
            </div>
        </div>
    )}

