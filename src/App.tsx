import { Typography } from "@mui/material";
import "./App.css";
import ProductGallery from "./Components/ProductGallery";

function App() {
  return (
    <div className="App">
      <Typography sx={{fontSize:'36px',fontWeight:'700'}}>Photo Gallery</Typography>
      <ProductGallery />
    </div>
  );
}

export default App;
