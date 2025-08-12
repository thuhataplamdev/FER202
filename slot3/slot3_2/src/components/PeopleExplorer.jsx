import React from "react";
import PeopleList from "./PeopleList";
import { persons } from "../person"; // file person.js nằm trong src/

export default function PeopleExplorer() {
  return (
    <div className="pe-page">
      <div className="pe-container">
        <h1 className="pe-h1">People Explorer – Exercise 2</h1>
        <PeopleList data={persons} />
      </div>
    </div>
  );
}