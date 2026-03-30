import { Box, Button, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  compact?: boolean;
};

export function Pagination({
  page,
  setPage,
  totalPages,
  compact = false,
}: PaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const hasPrevious = page > 1;
  const hasNext = page < totalPages && totalPages > 0;
  const isCompact = compact || isMobile;

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        p: isCompact ? 1 : 1.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,250,1) 100%)',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="outlined"
          disabled={!hasPrevious}
          onClick={() => setPage((p) => p - 1)}
          aria-label="Previous page"
          startIcon={isCompact ? undefined : <ChevronLeftIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            minWidth: isCompact ? 40 : 120,
            px: isCompact ? 0 : 2,
          }}
        >
          {isCompact ? <ChevronLeftIcon /> : 'Previous'}
        </Button>

        {!isCompact && (
          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: 999,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              minWidth: 120,
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
        )}

        {isCompact && (
          <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
            {page}/{totalPages || 1}
          </Typography>
        )}

        <Button
          variant="contained"
          disabled={!hasNext}
          onClick={() => setPage((p) => p + 1)}
          aria-label="Next page"
          endIcon={isCompact ? undefined : <ChevronRightIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            minWidth: isCompact ? 40 : 120,
            px: isCompact ? 0 : 2,
          }}
        >
          {isCompact ? <ChevronRightIcon /> : 'Next'}
        </Button>
      </Stack>
    </Paper>
  );
}
