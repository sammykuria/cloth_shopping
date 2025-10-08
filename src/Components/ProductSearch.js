import { useState } from "react";
import { supabase} from './supabaseClient'


function ProductSearch() { 
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSearch(e) {
    const term = e.target.value;
    setSearchTerm(term);

    const { data, error } = term.trim() === ""
      ? await supabase.from("products").select("*")
      : await supabase.from("products").select("*").ilike("name", `%${term}%`);

    if (error) console.error(error);
    else setProducts(data || []); // <-- works now
  }

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search Product"
      style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
    />
  );
}

export default ProductSearch;
