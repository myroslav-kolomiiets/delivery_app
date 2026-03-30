import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
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
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h6" mb={0.5}>
            Filters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Refine shops and products
          </Typography>
        </Box>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2" color="text.secondary">
            Categories
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: { xs: 'nowrap', sm: 'wrap' },
              overflowX: { xs: 'auto', sm: 'visible' },
              pb: { xs: 0.5, sm: 0 },
              '&::-webkit-scrollbar': { height: 6 },
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategories.includes(cat);

              return (
                <Chip
                  key={cat}
                  label={cat}
                  clickable
                  color={active ? 'primary' : 'default'}
                  variant={active ? 'filled' : 'outlined'}
                  disabled={!selectedShopId}
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
                    );
                  }}
                  sx={{
                    flexShrink: 0,
                    borderRadius: 2,
                    fontWeight: active ? 600 : 400,
                  }}
                />
              );
            })}
          </Box>
        </Stack>

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <FormControl fullWidth sx={{ minWidth: { sm: 180 } }}>
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

          <Button
            variant="contained"
            disabled={!selectedShopId}
            onClick={() => {
              setSelectedCategories([]);
              onSortChange('');
            }}
            sx={{
              whiteSpace: 'nowrap',
              minHeight: 56,
            }}
          >
            Clear all
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
