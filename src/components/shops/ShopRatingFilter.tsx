import { Box, Rating, Typography } from '@mui/material';

type ShopRatingFilterProps = {
  minRating: number;
  onMinRatingChange: (value: number) => void;
};

export function ShopRatingFilter({
  minRating,
  onMinRatingChange,
}: ShopRatingFilterProps) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Filter by rating
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={1.5}>
        Show shops rated {minRating}+ stars
      </Typography>

      <Rating
        precision={0.5}
        name="shop-rating-filter"
        value={minRating}
        onChange={(e, newValue) => onMinRatingChange(Number(newValue ?? 0))}
      />
    </Box>
  );
}
