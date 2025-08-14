import { useMemo, useState, useCallback } from "react";
import Hero from "../components/Hero";
import Filters from "../components/Filters";
import RecipeGrid from "../components/RecipeGrid";
import recipesData from "../recipes";
import { Carousel } from "react-bootstrap";

function sortRecipes(list, sortBy) {
  const arr = [...list];
  switch (sortBy) {
    case "name-asc":  return arr.sort((a,b)=>a.title.localeCompare(b.title));
    case "name-desc": return arr.sort((a,b)=>b.title.localeCompare(a.title));
    case "prep-asc":  return arr.sort((a,b)=>a.prep-b.prep);
    case "prep-desc": return arr.sort((a,b)=>b.prep-a.prep);
    case "cook-asc":  return arr.sort((a,b)=>a.cook-b.cook);
    case "cook-desc": return arr.sort((a,b)=>b.cook-a.cook);
    default: return arr;
  }
}

export default function Home({ onAddFav, favs }) {
  const [filters, setFilters] = useState({ maxPrep:"", maxCook:"", searchTerm:"", sortBy:"" });
  const handleFilterChange = useCallback((payload) => setFilters(payload), []);

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

  const sorted = useMemo(() => sortRecipes(filtered, filters.sortBy), [filtered, filters.sortBy]);

  return (
    <>
      <Hero />

      <Carousel className="mb-4 rounded-xl shadow-soft">
        {recipesData.slice(0, 5).map((r, i) => (
          <Carousel.Item key={i}>
            <img className="d-block w-100" src={r.image} alt={r.title} style={{maxHeight: 360, objectFit:"cover"}} />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded-pill px-3">
              <h5 className="mb-0">{r.title}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Filters onFilterChange={handleFilterChange} />
      <RecipeGrid recipes={sorted} onAddFav={onAddFav} favs={favs} />
    </>
  );
}
