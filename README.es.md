# 🗺️ Plataforma de Descubrimiento de Proveedores

> *Un directorio digital moderno — mejorado con ofertas, perfiles de negocios y descubrimiento basado en ubicación.*

---

## 📌 Descripción General

**Vendor Discovery Platform** es una aplicación web full-stack que conecta a usuarios con negocios locales. Las empresas pueden crear perfiles y promocionar sus servicios, mientras que los usuarios pueden descubrir proveedores, explorar ofertas y encontrar servicios relevantes según categoría y ubicación.

---

## 🧩 El Problema

Los negocios locales tienen dificultades para ganar visibilidad. Al mismo tiempo, los usuarios no cuentan con una forma sencilla y centralizada de encontrar servicios y promociones cercanas en un solo lugar.

## 💡 La Solución

Esta plataforma ofrece un sistema centralizado donde las empresas pueden presentar sus servicios y los usuarios pueden explorar, buscar y descubrirlos fácilmente — todo en una interfaz moderna.

---

## ✨ Funcionalidades

### 🏢 Para Negocios
- Crear y gestionar perfiles de negocio
- Agregar servicios y descripciones
- Crear y gestionar ofertas y descuentos

### 👤 Para Usuarios
- Explorar y descubrir negocios locales
- Ver perfiles detallados de negocios y sus ofertas activas

### ⚙️ Del Sistema
- Sistema de autenticación para usuarios y negocios (JWT)
- Enrutamiento condicional según rol (usuario o negocio)
- Integración RESTful entre el frontend en React y el backend en Flask
- Descubrimiento por ubicación mediante integración con Google Maps

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|---|---|
| **Frontend** | React, Vite, React Router, Bootstrap |
| **Backend** | Flask, SQLAlchemy, Flask-CORS, JWT |
| **Base de Datos** | PostgreSQL / SQLite |
| **APIs Externas** | Google Maps API |

---

## 🚀 Correr Localmente

### 1. Clonar el repositorio
```bash
git clone https://github.com/4GeeksAcademy/Final-Project-Moufdi-Erick-Diego-MI-88.git
cd Final-Project-Moufdi-Erick-Diego-MI-88
```

### 2. Iniciar el frontend
```bash
cd src/front
npm install
npm run dev
```

### 3. Iniciar el backend
```bash
cd src/api
pipenv install
pipenv shell
flask db upgrade
flask run
```

### 4. Abrir la aplicación
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001

---

## 🧱 Lo que se Construyó

- ✅ Registro de negocios y creación de perfiles
- ✅ Registro e inicio de sesión de usuarios
- ✅ Enrutamiento condicional según rol (usuario o negocio)
- ✅ Perfiles de negocio con servicios, descripciones y detalles
- ✅ Ofertas y descuentos vinculados a cada negocio
- ✅ Integración con Google Maps para descubrimiento por ubicación
- ✅ Frontend (React) comunicándose con backend (Flask) mediante APIs REST
- ✅ Modelos de base de datos para usuarios, negocios y sus relaciones
- ✅ Pruebas de flujos completos de usuario y negocio de extremo a extremo
- ✅ Funcionalidad de reseñas

---

## 🔮 Mejoras Futuras

- ❤️ Favoritos
- 🔍 Búsqueda avanzada y filtros
- 📊 Panel de analíticas para negocios
- 🤖 Sistema de recomendaciones

---

## 👥 Equipo

| Nombre | Rol |
|---|---|
| **Diego Osuna** | Gestión de Proyecto, Backend y Frontend |
| **Erick De Los Reyes** | Frontend y Soporte Backend |
| **Moufdi EN SAADOUNE** | Backend y Soporte Frontend |

---

## 📋 Estado del Proyecto

> **La funcionalidad principal está completa.** La plataforma soporta completamente el proceso de incorporación de negocios y los flujos de descubrimiento de usuarios.

---

*Hecho con ❤️ en 4Geeks Academy*
