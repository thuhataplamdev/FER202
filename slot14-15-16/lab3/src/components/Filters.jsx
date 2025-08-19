import React from "react";
import PropTypes from "prop-types";

export default function Filters({ controls, onChange, ranges }) {
  const set = (patch) => onChange({ ...controls, ...patch });

  return (
    <>
      <div className="field">
        <label className="label">Search</label>
        <input
          className="input"
          value={controls.q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="Name or email"
        />
      </div>

      <div className="field">
        <label className="label">Age range</label>
        <select
          className="select"
          value={controls.range}
          onChange={(e) => set({ range: e.target.value })}
        >
          {ranges.map((r) => (
            <option key={r.key} value={r.key}>{r.label}</option>
          ))}
        </select>
      </div>

      <div className="checkbox-wrap">
        <input
          id="hasAvatar"
          type="checkbox"
          className="checkbox"
          checked={controls.hasAvatar}
          onChange={(e) => set({ hasAvatar: e.target.checked })}
        />
        <label htmlFor="hasAvatar">Has avatar only</label>
      </div>
    </>
  );
}

Filters.propTypes = {
  controls: PropTypes.shape({
    q: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
    hasAvatar: PropTypes.bool.isRequired,
    sort: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  ranges: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, label: PropTypes.string })
  ).isRequired,
};
