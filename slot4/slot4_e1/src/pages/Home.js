import { useMemo, useState, useCallback } from "react";
import Hero from "../components/Hero";
import Filters from "../components/Filters";
import RecipeGrid from "../components/RecipeGrid";
import recipesData from "../recipes";

export default function Home() {
  const [filters, setFilters] = useState({
    maxPrep: "",
    maxCook: "",
    searchTerm: ""
  });

  const handleFilterChange = useCallback((payload) => {
    setFilters(payload);
  }, []);

  const filtered = useMemo(() => {
    const { maxPrep, maxCook, searchTerm } = filters;
    const term = (searchTerm || "").trim().toLowerCase();

    return recipesData.filter((r) => {
      // filter thời gian
      if (maxPrep && r.prep > Number(maxPrep)) return false;
      if (maxCook && r.cook > Number(maxCook)) return false;

      if (term) {
        const haystack = (r.title + " " + r.description).toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <>
      <Hero />
      <Filters onFilterChange={handleFilterChange} />
      <RecipeGrid recipes={filtered} />
    </>
  );
}
