import React from "react";
import { Link } from "react-router-dom";
import "./UniversityItem.css"; // Import CSS file for styling

const UniversityItem = ({ data, className = "", onDelete }) => {
  return (
    <div className={`university-view ${className}`}>
      <Link
        to={{
          pathname: "/details",
        }}
        state={{ data }} // Pass the data here
      >
        <h2>{data.name}</h2>
      </Link>
      <div className="d-flex">
        <Link className="btn btn-view h-space"
          to={{
            pathname: "/details",
          }}
          state={{ data }} // Pass the data here
        >
          View
        </Link>
        <button className="btn btn-danger" onClick={() => onDelete(data.name)}>Delete</button>
      </div>
    </div>
  );
};

export default UniversityItem;
