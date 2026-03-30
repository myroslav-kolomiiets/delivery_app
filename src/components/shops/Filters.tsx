import {
  Box,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

type FiltersProps = {
  categories: string[];
  selectedShopId: string | null;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  sortOption: string;
  onSortChange: (value: string) => void;
};

const sortLabels: Record<string, string> = {
  'price-asc': 'Price ↑',
  'price-desc': 'Price ↓',
  name: 'Name A-Z',
};

export function Filters({
  categories,
  selectedShopId,
  selectedCategories,
  setSelectedCategories,
  sortOption,
  onSortChange,
}: FiltersProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const selectedSortLabel = sortLabels[sortOption] ?? 'Sort by';

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (value: string) => {
    onSortChange(value);
    handleMenuClose();
  };

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

        <Divider />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Sort by
            </Typography>

            <Chip
              label={selectedSortLabel}
              onClick={handleMenuOpen}
              disabled={!selectedShopId}
              icon={<ArrowDropDownIcon />}
              variant={sortOption ? 'filled' : 'outlined'}
              color={sortOption ? 'primary' : 'default'}
              sx={{
                borderRadius: 999,
                fontWeight: 700,
                px: 0.5,
              }}
            />

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2.5,
                  minWidth: 180,
                  border: '1px solid',
                  borderColor: 'divider',
                },
              }}
            >
              <MenuItem
                selected={sortOption === 'price-asc'}
                onClick={() => handleSortSelect('price-asc')}
              >
                Price ↑
              </MenuItem>
              <MenuItem
                selected={sortOption === 'price-desc'}
                onClick={() => handleSortSelect('price-desc')}
              >
                Price ↓
              </MenuItem>
              <MenuItem
                selected={sortOption === 'name'}
                onClick={() => handleSortSelect('name')}
              >
                Name A-Z
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSortSelect('')}>Reset sorting</MenuItem>
            </Menu>
          </Box>

          <Button
            variant="contained"
            disabled={!selectedShopId}
            onClick={() => {
              setSelectedCategories([]);
              onSortChange('');
            }}
            sx={{
              whiteSpace: 'nowrap',
              minHeight: 40,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Clear all
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
