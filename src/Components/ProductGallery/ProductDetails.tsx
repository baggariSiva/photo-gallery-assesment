import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";

import ProductItem from "./ProductItem";
import { Product } from "../../types/Product";

interface ProductDetailsProps {
  products: Product[];
  isFetching: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  products,
  isFetching,
}: ProductDetailsProps) => {
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
          {products.map((productInfo: Product) => (
            <Grid item xs={2} sm={4} md={4} key={productInfo.id}>
              <ProductItem productInfo={productInfo} key={productInfo.id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProductDetails;