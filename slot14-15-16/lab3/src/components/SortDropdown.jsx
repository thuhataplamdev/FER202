import React from "react";
import PropTypes from "prop-types";

export default function SortDropdown({ sort, onSort, options }) {
  return (
    <div className="field sort-wrap">
      <label className="label">Sort</label>
      <select className="select" value={sort} onChange={(e) => onSort(e.target.value)}>
        {options.map((s) => (
          <option key={s.key} value={s.key}>{s.label}</option>
        ))}
      </select>
    </div>
  );
}
SortDropdown.propTypes = {
  sort: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
