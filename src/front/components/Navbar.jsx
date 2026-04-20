import { Link, useNavigate } from "react-router-dom";
import logoImageUrl from "../assets/img/logo.png";

export const Navbar = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        navigate("/");
    };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-2 border-dark border-buttom shadow">
      <div className="container-fluid fs-5 fw-medium">
        <a className="navbar-brand" href="/">
          <img src={logoImageUrl} style={{ width: "350px"}} />
          </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/category/AUTO_SERVICES">Auto Services</Link></li>
                <li><Link className="dropdown-item" to="/category/BEAUTY">Beauty</Link></li>
                <li><Link className="dropdown-item" to="/category/EDUCATION">Education</Link></li>
                <li><Link className="dropdown-item" to="/category/EVENTS">Events</Link></li>
                <li><Link className="dropdown-item" to="/category/FITNESS">Fitness</Link></li>
                <li><Link className="dropdown-item" to="/category/FOOD">Food</Link></li>
                <li><Link className="dropdown-item" to="/category/HEALTH">Health</Link></li>
                <li><Link className="dropdown-item" to="/category/HOME_SERVICES">Home Services</Link></li>
                <li><Link className="dropdown-item" to="/category/PET_SERVICES">Pet Services</Link></li>
                <li><Link className="dropdown-item" to="/category/PROFESSIONAL_SERVICES">Professional Services</Link></li>
                <li><Link className="dropdown-item" to="/category/REAL_ESTATE">Real Estate</Link></li>
                <li><Link className="dropdown-item" to="/category/RETAIL">Retail</Link></li>
                <li><Link className="dropdown-item" to="/category/TECHNOLOGY">Technology</Link></li>
                <li><Link className="dropdown-item" to="/category/TRAVEL">Travel</Link></li>
                <li><Link className="dropdown-item" to="/category/OTHER">Other</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about-us">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-us">Contact Us</a>
            </li>

            {/* dynamic buttons */} 
          
            {token ? (<>
            <li className="nav-item">
              <a className="nav-link" href="/user-profile">My Profile</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>Log Out</button>
            </li>
            </>) : (<>
            <li className="nav-item">
              <a className="nav-link" href="/login">Log In</a>
            </li>
            </>)} 
          </ul>
          

          {/*<form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search Services" aria-label="Search" />
            <button className="btn btn-outline-warning" type="submit">Search</button>
          </form>*/}
        
        </div>
      </div>
    </nav>
  );
};