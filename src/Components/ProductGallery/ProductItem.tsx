import { Card, Typography } from "@mui/material";

import LazyImage from "../LazyImage";
import { Product } from "../../types/Product";

interface ProductItemProps {
  productInfo: Product;
}
const ProductItem: React.FC<ProductItemProps> = ({
  productInfo,
}: ProductItemProps) => {
  return (
    <Card sx={{height:'100%'}}>
      <LazyImage
        key={productInfo.id}
        src={productInfo.url}
        alt={productInfo.title}
      />
      <Typography
        variant="h6"
      >
        {productInfo?.title}
      </Typography>
    </Card>
  );
};

export default ProductItem;
