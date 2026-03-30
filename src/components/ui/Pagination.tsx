import { Box, Button, Typography } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
};

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
  return (
    <Box mt={3} display="flex" gap={2} alignItems="center" justifyContent="center">
      <Button
        variant="outlined"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Prev
      </Button>

      <Typography>
        Page {page} of {totalPages || 1}
      </Typography>

      <Button
        variant="outlined"
        disabled={page === totalPages || totalPages === 0}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </Button>
    </Box>
  );
}
