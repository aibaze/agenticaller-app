import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useDebounce } from 'src/hooks/use-debounce';

export function RequestHeader({ sx, options, setSelectedOption, onSearch, ...other }) {
  const [open, setOpen] = useState(false);
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
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{ py: 1, ...sx }}
      {...other}
    >
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        getOptionLabel={(option) => option}
        onChange={handleAutocompleteChange}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Your Services" variant="outlined" />
        )}
      />
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
    </Stack>
  );
}

RequestHeader.propTypes = {
  sx: PropTypes.object,
  options: PropTypes.array.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
};
