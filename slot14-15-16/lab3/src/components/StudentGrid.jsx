import React from "react";
import PropTypes from "prop-types";
import StudentCard from "./StudentCard";

export default function StudentGrid({ list, onView }) {
  if (!list?.length) return <div className="empty">No students found.</div>;
  return (
    <div className="grid">
      {list.map((s) => <StudentCard key={s.id} data={s} onView={onView} />)}
    </div>
  );
}
StudentGrid.propTypes = {
  list: PropTypes.array.isRequired,
  onView: PropTypes.func.isRequired,
};
