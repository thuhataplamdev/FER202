import React, { useMemo, useState } from "react";

export default function PeopleList({ data }) {
  // controls
  const [firstNameAsc, setFirstNameAsc] = useState(true);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [skill, setSkill] = useState("");
  const [query, setQuery] = useState("");
  const [useMultiSort, setUseMultiSort] = useState(true); // ưu tiên isActive ⇒ age ↑ ⇒ lastName A→Z

  // tất cả skills (unique)
  const allSkills = useMemo(() => {
    const s = new Set();
    data.forEach(p => p.skills.forEach(sk => s.add(sk)));
    return Array.from(s).sort();
  }, [data]);

  // pipeline: search -> age range + skill filter -> sort -> output
  const list = useMemo(() => {
    // search theo họ tên
    const q = query.trim().toLowerCase();
    let result = data.filter(({ firstName, lastName }) =>
      `${firstName} ${lastName}`.toLowerCase().includes(q)
    );

    // filter theo tuổi + skill (destructure)
    const min = minAge === "" ? -Infinity : Number(minAge);
    const max = maxAge === "" ? Infinity : Number(maxAge);
    result = result.filter(({ age, skills }) => {
      const inRange = age >= min && age <= max;
      const matchSkill = skill ? skills.includes(skill) : true;
      return inRange && matchSkill;
    });

    // sort
    if (useMultiSort) {
      result.sort((a, b) => {
        if (a.isActive !== b.isActive) return a.isActive ? -1 : 1; // active trước
        if (a.age !== b.age) return a.age - b.age;                  // tuổi tăng dần
        return a.lastName.localeCompare(b.lastName);                 // lastName A→Z
      });
    } else {
      result.sort((a, b) =>
        firstNameAsc
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName)
      );
    }

    return result;
  }, [data, query, minAge, maxAge, skill, useMultiSort, firstNameAsc]);

  // statistics bằng reduce
  const stats = useMemo(() => {
    const { total, ageSum, active } = data.reduce(
      (acc, p) => ({
        total: acc.total + 1,
        ageSum: acc.ageSum + p.age,
        active: acc.active + (p.isActive ? 1 : 0),
      }),
      { total: 0, ageSum: 0, active: 0 }
    );
    return { total, avgAge: total ? (ageSum / total).toFixed(1) : 0, active };
  }, [data]);

  // ranking skill bằng reduce
  const skillRanking = useMemo(() => {
    const freq = data.reduce((acc, { skills }) => {
      skills.forEach(s => (acc[s] = (acc[s] || 0) + 1));
      return acc;
    }, {});
    return Object.entries(freq).sort((a, b) => b[1] - a[1]);
  }, [data]);
  const topCount = skillRanking[0]?.[1] ?? 0;

  return (
    <section className="pe-card">
      {/* Controls */}
      <div className="pe-row" style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <input
          className="pe-input w-full"
          placeholder="Search first + last name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ maxWidth: 380 }}
        />

        <div>
          <label className="pe-label">Min age</label>
          <input
            className="pe-input w-100"
            type="number"
            value={minAge}
            onChange={e => setMinAge(e.target.value)}
          />
        </div>
        <div>
          <label className="pe-label">Max age</label>
          <input
            className="pe-input w-100"
            type="number"
            value={maxAge}
            onChange={e => setMaxAge(e.target.value)}
          />
        </div>
        <div>
          <label className="pe-label">Skill</label>
          <select
            className="pe-input w-150"
            value={skill}
            onChange={e => setSkill(e.target.value)}
          >
            <option value="">All skills</option>
            {allSkills.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <label className="pe-label" style={{ display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
          <input
            type="checkbox"
            checked={useMultiSort}
            onChange={e => setUseMultiSort(e.target.checked)}
          />
          Dùng sort đa tiêu chí 
        </label>

        {!useMultiSort && (
          <button className="pe-btn" onClick={() => setFirstNameAsc(v => !v)}>
            Sort firstName: {firstNameAsc ? "A→Z" : "Z→A"}
          </button>
        )}
      </div>
      {list.length === 0 ? (
        <div className="pe-italic">No found.</div>
      ) : (
        <ul className="pe-list" style={{ marginBottom: 16 }}>
          {list.map(({ id, firstName, lastName, age, city, skills }) => (
            <li key={id} className="pe-item-row">
              <span className={`pe-badge ${true ? "active" : ""}`} style={{ visibility: "hidden" }} />
              <div className="pe-bold">Full name: {firstName} {lastName}</div>
              <div className="pe-muted">Age: {age}</div>
              <div className="pe-muted">City: {city}</div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {skills.map(sk => <span key={sk} className="pe-chip">{sk}</span>)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Statistics + Ranking (hiển thị cạnh dưới, vẫn 1 list duy nhất ở trên) */}
      <div className="pe-grid-3">
        <div className="pe-stat">
          <div className="label">Tổng người</div>
          <div className="value">{stats.total}</div>
        </div>
        <div className="pe-stat">
          <div className="label">Tuổi trung bình</div>
          <div className="value">{stats.avgAge}</div>
        </div>
        <div className="pe-stat">
          <div className="label">Số người active</div>
          <div className="value">{stats.active}</div>
        </div>
      </div>

      <div style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="pe-table">
          <thead>
            <tr>
              <th className="pe-th">Skill</th>
              <th className="pe-th">Count</th>
            </tr>
          </thead>
          <tbody>
            {skillRanking.map(([sk, c]) => (
              <tr key={sk}>
                <td className="pe-td" style={{ fontWeight: c === topCount ? 700 : 400 }}>{sk}</td>
                <td className="pe-td" style={{ fontWeight: c === topCount ? 700 : 400 }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
