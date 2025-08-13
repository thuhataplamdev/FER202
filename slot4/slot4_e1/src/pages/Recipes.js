import { useMemo, useState, useCallback } from "react";
import Filters from "../components/Filters";
import RecipeGrid from "../components/RecipeGrid";
import recipesData from "../recipes";

export default function Recipes() {
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
      <div className="py-3">
        <h2 className="mb-3">Browse Recipes</h2>
        <p className="text-muted">
          Filter by max prep/cook time or search by name/description.
        </p>
      </div>
      <Filters onFilterChange={handleFilterChange} />
      <RecipeGrid recipes={filtered} />
    </>
  );
}
