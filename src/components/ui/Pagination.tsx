import { Box, Button, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
};

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const hasPrevious = page > 1;
  const hasNext = page < totalPages && totalPages > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        p: 1.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,250,1) 100%)',
      }}
    >
      <Stack
        direction={{ xs: 'row', sm: 'row' }}
        spacing={1.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="outlined"
          disabled={!hasPrevious}
          onClick={() => setPage((p) => p - 1)}
          startIcon={!isMobile ? <ChevronLeftIcon /> : undefined}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            minWidth: { xs: 44, sm: 120 },
            px: { xs: 1, sm: 2 },
          }}
        >
          {isMobile ? <ChevronLeftIcon /> : 'Previous'}
        </Button>

        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 999,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            minWidth: { xs: 96, sm: 120 },
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary" lineHeight={1}>
            Page
          </Typography>
          <Typography variant="subtitle1" fontWeight={800} lineHeight={1.1}>
            {page} / {totalPages || 1}
          </Typography>
        </Box>

        <Button
          variant="contained"
          disabled={!hasNext}
          onClick={() => setPage((p) => p + 1)}
          endIcon={!isMobile ? <ChevronRightIcon /> : undefined}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            minWidth: { xs: 44, sm: 120 },
            px: { xs: 1, sm: 2 },
          }}
        >
          {isMobile ? <ChevronRightIcon /> : 'Next'}
        </Button>
      </Stack>
    </Paper>
  );
}
