import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface SortProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const Sort: React.FC<SortProps> = ({ sortOrder, setSortOrder }: SortProps) => {
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
  };

  return (
    <FormControl variant="outlined" sx={{ width: "200px" }}>
      <Select value={sortOrder} onChange={handleSortChange}>
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
