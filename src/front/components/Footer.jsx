import logoImageUrl from "../assets/img/logo.png";
export const Footer = () => {


  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">

       
        
        <div className="container pt-2 d-flex">
          <div className="text-center col-4">
             {/* Brand */} {/*  Links */}
            <div className="justify-content-center gap-3">
               <a className="navbar-brand" href="#">
          <img src={logoImageUrl} style={{ width: "220px" }} />
        </a><br></br>
              <a href="/" className="text-white-50 small">Home</a><br></br>
              <a href="/about-us" className="text-white-50 small">About Us</a><br></br>
              <a href="/contact-us" className="text-white-50 small">Contact Us</a>
            </div>
          </div>

          <div className="text-center col-4">
            {/* Subscribe */}
            <h3 className="fs-4">Subscribe Newsletter</h3>
            <div className="d-flex justify-content-center">

              <input
                type="email"
                className="form-control w-auto me-2"
                placeholder="Email"
                style={{ maxWidth: "200px" }}
              />
              <button className="button btn btn-warning btn-sm">Join</button>
            </div>
          </div>
          <div className="col-4">
            {/*  Links */}
            <h3 className="text-center fs-4">Social Media</h3>
            <div className="d-flex justify-content-center gap-3 mb-3">
              
              <a href="https://www.instagram.com"><i className="col-4 fa-brands fa-square-instagram fa-2xl" style={{color: "#ffde59"}}></i></a><br></br>
              <a href="https://www.facebook.com"><i className="col-4 fa-brands fa-square-facebook fa-2xl" style={{color: "#ffde59"}}></i></a><br></br>
              <a href="https://www.linkedin.com"><i className="col-4 fa-brands fa-linkedin fa-2xl" style={{color: "#ffde59"}}></i></a>
            </div>
          </div>
        </div>


        {/* Copyright */}
        <p className="text-center small text-white mb-0">
          <strong>© 2026 My Yellow Pages </strong>
        </p>
      </div>
    </footer>
  );
};
