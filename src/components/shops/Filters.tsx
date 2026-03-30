import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
  MenuItem,
} from '@mui/material';

type FiltersProps = {
  categories: string[];
  selectedShopId: string | null;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  sortOption: string;
  onSortChange: (value: string) => void;
};

export function Filters({
  categories,
  selectedShopId,
  selectedCategories,
  setSelectedCategories,
  sortOption,
  onSortChange,
}: FiltersProps) {
  return (
    <Grid>
      <Box mb={3}>
        <Typography variant="h6">Filters</Typography>
        <Box display="flex" gap={2} mt={1}>
          <ButtonGroup>
            {categories.map((cat) => (
              <Button
                disabled={!selectedShopId}
                key={cat}
                variant={selectedCategories.includes(cat) ? 'contained' : 'outlined'}
                onClick={() => {
                  setSelectedCategories((prev) =>
                    prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
                  );
                }}
              >
                {cat}
              </Button>
            ))}
          </ButtonGroup>

          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
              <InputLabel id="product-sort-by-select-label">Sort by</InputLabel>
              <Select
                fullWidth
                disabled={!selectedShopId}
                value={sortOption}
                label="Sort by"
                onChange={(e) => onSortChange(e.target.value)}
              >
                <MenuItem value="price-asc">Price ↑</MenuItem>
                <MenuItem value="price-desc">Price ↓</MenuItem>
                <MenuItem value="name">Name A-Z</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            disabled={!selectedShopId}
            onClick={() => {
              setSelectedCategories([]);
              onSortChange('');
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
