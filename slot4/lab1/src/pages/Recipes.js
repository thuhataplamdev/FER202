import { useMemo, useState, useCallback } from "react";
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

export default function Recipes({ onAddFav, favs }) {
  const [filters, setFilters] = useState({ maxPrep:"", maxCook:"", searchTerm:"", sortBy:"" });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const handleFilterChange = useCallback((payload) => { setFilters(payload); setPage(1); }, []);

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

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const start = (page - 1) * perPage;
  const paged = sorted.slice(start, start + perPage);

  const goFirst = () => setPage(1);
  const goPrev  = () => setPage(p => Math.max(1, p-1));
  const goNext  = () => setPage(p => Math.min(totalPages, p+1));
  const goLast  = () => setPage(totalPages);

  return (
    <>
      <Carousel className="mb-4 rounded-xl shadow-soft">
        {recipesData.slice(0, 3).map((r, i) => (
          <Carousel.Item key={i}>
            <img className="d-block w-100" src={r.image} alt={r.title} style={{maxHeight: 360, objectFit: "cover"}} />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded-pill px-3">
              <h5 className="mb-0">{r.title}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="py-2">
        <h2 className="mb-2">Browse Recipes</h2>
      </div>

      <Filters
        onFilterChange={handleFilterChange}
        showItemsPerPage
        perPage={perPage}
        onPerPageChange={(n)=>{ setPerPage(n); setPage(1); }}
      />

      <RecipeGrid recipes={paged} onAddFav={onAddFav} favs={favs} />

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page===1?'disabled':''}`}>
              <button className="page-link" onClick={goFirst}>&laquo;</button>
            </li>
            <li className={`page-item ${page===1?'disabled':''}`}>
              <button className="page-link" onClick={goPrev}>&lsaquo;</button>
            </li>

            {Array.from({length: totalPages}, (_,i)=>i+1).map(n=>(
              <li key={n} className={`page-item ${page===n?'active':''}`}>
                <button className="page-link" onClick={()=>setPage(n)}>{n}</button>
              </li>
            ))}

            <li className={`page-item ${page===totalPages?'disabled':''}`}>
              <button className="page-link" onClick={goNext}>&rsaquo;</button>
            </li>
            <li className={`page-item ${page===totalPages?'disabled':''}`}>
              <button className="page-link" onClick={goLast}>&raquo;</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
