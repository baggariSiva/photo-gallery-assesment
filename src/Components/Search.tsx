import { useCallback, useEffect, useState, ChangeEvent } from "react";
import { TextField } from "@mui/material";
import { Product } from "../types/Product";

interface SearchBarProps {
  setFilteredProducts: (products: Product[]) => void;
  products: Product[];
}

function SearchBar({ setFilteredProducts, products }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const filterProducts = useCallback(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  useEffect(() => {
    const filtered = filterProducts();
    setFilteredProducts(filtered);
  }, [filterProducts, setFilteredProducts]);

  return (
    <TextField
      label="Search by title"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
}

export default SearchBar;
