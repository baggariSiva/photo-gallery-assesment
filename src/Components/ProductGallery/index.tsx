import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import ProductDetails from "./ProductDetails";
import SearchBar from "../Search";

import { Product } from "../../types/Product";
import Sort from "../Sort";

function ProductGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const fetchProducts = async () => {
    setIsFetching(true);
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const sortMultiplier = sortOrder === "asc" ? 1 : -1;

    const sortedItems = filteredProducts.sort(
      (product1: Product, product2: Product) =>
        (product1.albumId - product2.albumId) * sortMultiplier
    );
    setFilteredProducts(sortedItems);
  }, [sortOrder, filteredProducts]);

  return (
    <Box sx={{ margin: "10px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px 0px",
          gap: "10px",
        }}
      >
        <SearchBar
          setFilteredProducts={setFilteredProducts}
          products={products}
        />
        <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </Box>
      <ProductDetails products={filteredProducts} isFetching={isFetching} />
    </Box>
  );
}

export default ProductGallery;
