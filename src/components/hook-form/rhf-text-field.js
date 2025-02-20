import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, type, capital, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          sx={{
            '& .MuiAutocomplete-listbox': {
              maxHeight: 200,
            },
          }}
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            const value = event.target.value;
            if (type === 'number') {
              field.onChange(Number(value));
            } else {
              if (capital) {
                const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                return field.onChange(capitalizedValue);
              }

              if (name === 'email') {
                const lowerCaseValue = value.toLowerCase();
                return field.onChange(lowerCaseValue);
              }

              return field.onChange(value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

RHFTextField.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
};
