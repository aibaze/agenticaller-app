import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme, minWidth }) => ({
  minWidth: `${minWidth}px`,
}));

export const Label = styled('label')(({ theme }) => ({
  color: theme.palette.common.black,
  cursor: 'pointer',
  position: 'relative',
}));

export const CustomCheckbox = styled('input')(({ theme }) => ({
  WebkitAppearance: 'none',
  appearance: 'none',
  width: '22px',
  height: '22px',
  border: '2px solid #000',
  outline: 'none',
  cursor: 'pointer',
  marginBottom: '-1px',
  marginRight: '8px',
}));

export const TickContainer = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: '4px',
  bottom: '-2px',
}));

export const Text = styled(Typography)(({ theme }) => ({
  display: 'inline',
  fontSize: '19px',
  fontWeight: 500,

  [theme.breakpoints.up('md')]: {
    fontSize: '29px',
  },
}));
