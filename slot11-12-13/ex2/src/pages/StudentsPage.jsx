import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Filters from "../components/Filters";
import SortDropdown from "../components/SortDropdown";
import StudentGrid from "../components/StudentGrid";
import StudentDetailModal from "../components/StudentDetailModal";
import { students } from "../students";

const ageRanges = [
  { key: "all", label: "All ages", test: () => true },
  { key: "<=20", label: "≤ 20",     test: (age) => age <= 20 },
  { key: "21-25", label: "21–25",   test: (age) => age >= 21 && age <= 25 },
  { key: ">25", label: "> 25",      test: (age) => age > 25 },
];

const sortOptions = [
  { key: "none",      label: "No sorting", cmp: null },
  { key: "age-asc",   label: "Age ↑",      cmp: (a, b) => a.age - b.age },
  { key: "age-desc",  label: "Age ↓",      cmp: (a, b) => b.age - a.age },
  { key: "name-asc",  label: "Name A→Z",   cmp: (a, b) => a.name.localeCompare(b.name, "vi") },
  { key: "name-desc", label: "Name Z→A",   cmp: (a, b) => b.name.localeCompare(a.name, "vi") },
];

export default function StudentsPage({ initialQ = "" }) {
  const [controls, setControls] = useState({ q: initialQ, range: "all", hasAvatar: false, sort: "none" });
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = controls.q.trim().toLowerCase();
    let arr = students.filter((s) => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchAge = (ageRanges.find((r) => r.key === controls.range) || ageRanges[0]).test(s.age);
      const matchAvatar = !controls.hasAvatar || Boolean(s.avatar);
      return matchQ && matchAge && matchAvatar;
    });
    const sorter = sortOptions.find((s) => s.key === controls.sort)?.cmp;
    if (sorter) arr = arr.slice().sort(sorter);
    return arr;
  }, [controls]);

  return (
    <section id="students" className="container" style={{ padding: "24px 16px 0" }}>
      <div className="toolbar">
        <Filters controls={controls} onChange={setControls} ranges={ageRanges} />
        <SortDropdown sort={controls.sort} onSort={(v) => setControls({ ...controls, sort: v })} options={sortOptions} />
      </div>

      <StudentGrid list={filtered} onView={setSelected} />
      <StudentDetailModal open={!!selected} onClose={() => setSelected(null)} data={selected} />

      <div style={{ marginTop: 16, color: "#64748b", fontSize: 14 }}>
        Showing {filtered.length} of {students.length} students
      </div>
    </section>
  );
}
StudentsPage.propTypes = { initialQ: PropTypes.string };
