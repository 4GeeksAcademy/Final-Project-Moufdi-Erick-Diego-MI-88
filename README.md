# 🗺️ Vendor Discovery Platform

> *A modern digital directory Platform — enhanced with offers, business profiles, and location-based discovery.*


---

## 📌 Overview

**Vendor Discovery Platform** is a full-stack web application that connects users with local businesses. Businesses can create profiles and promote their services, while users can discover vendors, explore offerings, and find relevant services based on category and location.

---

## 🧩 The Problem

Local businesses struggle with visibility. At the same time, users have no simple, centralized way to find nearby services and promotions in one place.

## 💡 The Solution

This platform provides a centralized system where businesses can present their services and users can easily browse, search, and discover them — all in one modern interface.

---

## ✨ Features

### 🏢 Business Features
- Create and manage business profiles
- Add services and descriptions
- Create and manage offers and discounts

### 👤 User Features
- Browse and discover local businesses
- View detailed business profiles and active offers

### ⚙️ System Features
- Authentication system for users and businesses (JWT)
- Role-based conditional routing (user vs. business)
- RESTful API integration between React frontend and Flask backend
- Location-based discovery via Google Maps integration

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Vite, React Router, Bootstrap, HTML, JavaScript |
| **Backend** | Flask, SQLAlchemy, Flask-CORS, JWT, Python |
| **Database** | PostgreSQL / SQLite |
| **External APIs** | Google Maps API |

---

## 🚀 Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/4GeeksAcademy/Final-Project-Moufdi-Erick-Diego-MI-88.git
cd Final-Project-Moufdi-Erick-Diego-MI-88
```

### 2. Start the frontend
```bash
cd src/front
npm install
npm run dev
```

### 3. Start the backend
```bash
cd src/api
pipenv install
pipenv shell
flask db upgrade
flask run
```

### 4. Open the app
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001

---

## 🧱 What Was Built

- ✅ Business signup and profile creation
- ✅ User signup and login functionality
- ✅ Conditional routing based on user or business role
- ✅ Business profiles with services, descriptions, and details
- ✅ Offers and discounts linked to each business
- ✅ Google Maps integration for location-based discovery
- ✅ Frontend (React) communicating with backend (Flask) through REST APIs
- ✅ Database models for users, businesses, and relationships
- ✅ End-to-end testing of full user and business flows
- ✅ Reviews feature

---

## 🔮 Future Improvements


- ❤️ Favorites

- 🔍 Advanced search & filters
- 📊 Business analytics dashboard
- 🤖 Recommendation system

---

## 👥 Team

| Name | Role |
|---|---|
| **Diego Osuna** | Project Management, Backend & Frontend |
| **Erick De Los Reyes** | Frontend & Backend Support |
| **Moufdi EN SAADOUNE** | Backend & Frontend Support |

---

## 📋 Project Status

> **Core functionality is complete.** The platform fully supports business onboarding, user discovery workflows, and reviews.

---

*Built with ❤️ at 4Geeks Academy*
