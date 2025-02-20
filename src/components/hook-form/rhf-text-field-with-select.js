import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, InputAdornment, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function RHFTextFieldWithSelect({
  name,
  helperText,
  type,
  options,
  suffix,
  prefixIcon,
  maxValue,
  ...other
}) {
  const { control } = useFormContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (value, onChange) => {
    if (value <= maxValue) {
      onChange(value);
    }
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box display="flex" alignItems="center">
          <TextField
            {...field}
            inputProps={{ style: { textAlign: 'center' } }}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                const value = event.target.value;
                if (
                  (/^\d*$/.test(value) || value === '') &&
                  (value === '' || parseInt(value, 10) <= maxValue)
                ) {
                  field.onChange(Number(value));
                }
              } else {
                field.onChange(event.target.value === '' ? 0 : event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            InputProps={{
              ...(prefixIcon && {
                startAdornment: <InputAdornment position="start">{prefixIcon}</InputAdornment>,
              }),
              endAdornment: (
                <InputAdornment position="end">
                  {suffix}
                  <IconButton onClick={handleOpenMenu} size="small">
                    <ArrowDropDown />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...other}
          />
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            {options.map((option) => (
              <MenuItem key={option} onClick={() => handleMenuClick(option, field.onChange)}>
                {option} {suffix}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    />
  );
}

RHFTextFieldWithSelect.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
};
