import { Link } from "react-router-dom";
import logoImageUrl from "../assets/img/logo.png";

export const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-2 border-dark border-buttom shadow">
      <div className="container-fluid fs-5 fw-medium">
        <a className="navbar-brand" href="#">
          <img src={logoImageUrl} style={{ width: "350px"}} />
          </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Restaurants</a></li>
                <li><a className="dropdown-item" href="#">Home Improve</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="#">Lawyers</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact Us</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search Services" aria-label="Search" />
            <button className="btn btn-outline-warning" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};