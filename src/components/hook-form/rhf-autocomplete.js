import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export default function RHFAutocomplete({
  name,
  label,
  placeholder,
  helperText,
  objectFreeSoloValue,
  capital,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue, type, currentValue) => {
            if (objectFreeSoloValue && typeof currentValue.option === 'string') {
              const updatedValue = [
                ...newValue.filter((item) => typeof item !== 'string'),
                { [objectFreeSoloValue]: currentValue.option },
              ];
              setValue(name, updatedValue, { shouldValidate: true });
            } else {
              setValue(name, newValue, { shouldValidate: true });
            }
          }}
          renderInput={(params) => (
            <TextField
              label={label}
              onChange={(event) => {
                const value = event.target.value;
                if (capital) {
                  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                  field.onChange(capitalizedValue);
                } else {
                  field.onChange(event.target.value);
                }
              }}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}

RHFAutocomplete.propTypes = {
  helperText: PropTypes.node,
  label: PropTypes.string,
  objectFreeSoloValue: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};
