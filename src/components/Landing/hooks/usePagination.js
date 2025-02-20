import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Pagination as PaginationMui } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';

const usePagination = ({ totalPages, tabSection, currentTab }) => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const smDown = useResponsive('down', 'md');

  const handleChange = (e, page) => {
    setPage(page);
  };

  const Pagination = () => (
    <PaginationMui
      count={totalPages}
      page={page}
      onChange={handleChange}
      size={smDown ? 'medium' : 'large'}
      sx={{
        padding: '4px',
        margin: '20px auto 0 auto',
        backgroundColor: theme.palette.landing.pearlGray,
        width: 'fit-content',
        '& .MuiPaginationItem-root': {
          color: theme.palette.common.black,
        },
        '& .MuiPaginationItem-page': {
          '&.Mui-selected': {
            backgroundColor: theme.palette.landing.forestGreen,
          },
          '&:hover': {
            backgroundColor: theme.palette.landing.mintIce,
          },
        },
      }}
    />
  );

  return {
    Pagination,
    page,
  };
};

export default usePagination;
