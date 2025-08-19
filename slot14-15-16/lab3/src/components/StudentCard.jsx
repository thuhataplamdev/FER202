import React from "react";
import PropTypes from "prop-types";

export default function StudentCard({ data, onView }) {
  return (
    <div className="card">
      <div className="card-media">
        {data.avatar ? (
          <img
            src={data.avatar}
            alt={`${data.name} avatar`}
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.src = "/images/students/placeholder.jpg"; }}
          />
        ) : (
          <div className="no-img">No Image</div>
        )}
      </div>

      <div className="card-body">
        <span className="chip">#{data.id}</span>
        <h3 className="title">{data.name}</h3>
        <p className="sub">{data.email}</p>
        <p className="sub">Age: {data.age}</p>
        <button className="btn-outline" onClick={() => onView(data)}>View Details</button>
      </div>
    </div>
  );
}

StudentCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onView: PropTypes.func.isRequired,
};