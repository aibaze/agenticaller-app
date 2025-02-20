import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Autocomplete, TextField, InputAdornment, Grid } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useDebounce } from 'src/hooks/use-debounce';
import { useResponsive } from 'src/hooks/use-responsive';

export function ClientHeader({ sx, options, setSelectedOption, onSearch, ...other }) {
  const [open, setOpen] = useState(false);
  const smDown = useResponsive('down', 'sm');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOption(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <Stack spacing={2} direction="row" alignItems="center" sx={{ py: 1, ...sx }} {...other}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            getOptionLabel={(option) => option}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField {...params} label="Service name" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              height: 50,
              '& .MuiInputBase-root': {
                height: '100%',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

ClientHeader.propTypes = {
  sx: PropTypes.object,
  options: PropTypes.array.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
};
