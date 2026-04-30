import React from "react";

const AboutUsPage = () => {
  return (
    <div className="container py-5">
      <div className="bg-dark text-white rounded-4 p-5 mb-5 shadow">
        <h1 className="display-5 fw-bold mb-3">About Our Project</h1>
        <p className="lead mb-0">
          Our platform helps users discover businesses more easily while giving
          businesses a better way to present their information, location, and
          offers in one place.
        </p>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="h3 mb-3">What This Project Does</h2>
              <p className="mb-0">
                This project connects users with businesses through a cleaner
                and more organized digital experience. Businesses can create
                profiles, share useful details, and improve visibility, while
                users can explore businesses by type, location, and available
                information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="h3 mb-4 text-center">Main Features</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">Business Profiles</h3>
                <p className="card-text mb-0">
                  Businesses can sign up and manage a profile with important
                  information for users.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">Location Integration</h3>
                <p className="card-text mb-0">
                  Map and location features help users find businesses more
                  easily and improve search by area.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">Business Categories</h3>
                <p className="card-text mb-0">
                  Businesses can be organized by type to make browsing and
                  filtering more useful.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">User Access</h3>
                <p className="card-text mb-0">
                  Users can sign up and interact with the platform through a
                  more personalized experience.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">Discounts and Offers</h3>
                <p className="card-text mb-0">
                  The platform is being built to support deals or discounts for
                  businesses when available.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">Scalable Structure</h3>
                <p className="card-text mb-0">
                  The project is structured to support both frontend and backend
                  growth as more features are added.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="h3 mb-4 text-center">Our Team</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">Project Management</h3>
                <p className="card-text mb-0">
                  Coordinating progress, planning features, and guiding the
                  overall development process.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">Frontend Development</h3>
                <p className="card-text mb-0">
                  Building the visual interface and improving the user
                  experience across the platform.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title">Backend & API Work</h3>
                <p className="card-text mb-0">
                  Handling models, routes, logic, and external integrations such
                  as maps and location services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;