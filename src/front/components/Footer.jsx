import logoImageUrl from "../assets/img/logo.png";
export const Footer = () => {


  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">

        {/* Brand */}
         <a className="navbar-brand" href="#">
          <img src={logoImageUrl} style={{ width: "200px"}} />
          </a>
        <p className="small text-white-50">
          Find the best local businesses and offers.
        </p>

        {/*  Links */}
        <div className="d-flex justify-content-center gap-3 mb-3">
          <a href="#" className="text-white-50 small">Home</a>
          <a href="#" className="text-white-50 small">Businesses</a>
          <a href="#" className="text-white-50 small">Contact</a>
        </div>

        {/* Subscribe */}
        <div className="d-flex justify-content-center mb-3">
          <input 
            type="email" 
            className="form-control w-auto me-2" 
            placeholder="Email"
            style={{ maxWidth: "200px" }}
          />
          <button className="btn btn-warning btn-sm">Join</button>
        </div>

        

        {/* Copyright */}
        <p className="small text-white-50 mb-0">
          © 2026 My Yellow Pages
        </p>
      </div>
    </footer>
  );
};
