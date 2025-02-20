import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Add, Remove } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export default function RHFTextFieldStepper({ name, helperText, type, disableLess, ...other }) {
  const { control, getValues } = useFormContext();

  const handleIncrement = (field) => {
    const currentValue = getValues(name) || 0;
    field.onChange(currentValue + 1);
  };

  const handleDecrement = (field) => {
    const currentValue = getValues(name) || 0;
    if (currentValue > 0) {
      field.onChange(currentValue - 1);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          height="10"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 0 || disableLess}
                  size="small"
                >
                  <Remove />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleIncrement(field)} size="small">
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ min: 0, style: { textAlign: 'center' } }}
        />
      )}
    />
  );
}

RHFTextFieldStepper.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
};
