import React from "react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DetailsPage = () => {
  // Check if location.state and location.state.data are defined

  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || !location.state.data) {
    navigate("/"); // Redirect to homepage if directly went to this page
    // return <div>Error: Invalid navigation</div>;
  } else {
    const data = location.state.data;

    return (
      <div className="listPage page-wrapper">
        <h1 className="page-title">{data.name}</h1>
        <div className="page-content">
          <div className="info-display">
            <label className="label">Code</label>
            <div className="value">{data.alpha_two_code}</div>
          </div>

          <div className="info-display">
            <label className="label">country</label>
            <div className="value">{data.country}</div>
          </div>

          <div className="info-display">
            <label className="label">Web pages</label>
            <div className="value">
              <a href={data.web_pages} target="_blank" rel="noopener noreferrer">
                {data.web_pages}
              </a>
            </div>
          </div>
          {/* <p>{data?.state_province}</p> */}
        </div>
        <div className="d-flex row-reverse v-space">
          <Link to="/" className="btn btn-view">
            Back
          </Link>
        </div>
      </div>
    );
  }
};

export default DetailsPage;
