import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import ProductItem from "./ProductItem";
import { Product } from "../../types/Product";

interface ProductDetailsProps {
  products: Product[];
  isFetching: boolean;
}
const PAGE_SIZE = 10;

const ProductDetails: React.FC<ProductDetailsProps> = ({
  products,
  isFetching,
}: ProductDetailsProps) => {
  const [scrollProducts, setScrollProducts] = useState<Product[]>([]);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const endOfListRef = useRef<HTMLDivElement>(null);
  const fetchMoreProducts = useCallback(() => {
    if (isScroll) return;
    setIsScroll(true);
    setTimeout(() => {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newProducts = products.slice(start, end);

      setScrollProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);
      setIsScroll(false);
    }, 1000);
  },[isScroll, page, products]);

  useEffect(() => {
    fetchMoreProducts();
  }, [fetchMoreProducts]);

  useEffect(() => {
    if (isScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          fetchMoreProducts();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 1.0,
      }
    );
    const endOfList=endOfListRef.current
    if (endOfList) {
      observer.observe(endOfList);
    }

    return () => {
      if (endOfList) {
        observer.unobserve(endOfList);
      }
    };
  }, [fetchMoreProducts, isScroll]);

  return (
    <>
      {isFetching ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {scrollProducts.map((productInfo: Product) => (
            <Grid item xs={2} sm={4} md={4} key={productInfo.id}>
              <ProductItem productInfo={productInfo} key={productInfo.id} />
            </Grid>
          ))}
        </Grid>
      )}
      <div ref={endOfListRef} style={{ height: "1px" }}></div>
      {isScroll && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
