import { styled } from '@mui/material/styles';
import { Card, TextField, IconButton, Chip, Grid } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 400,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.common.white,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
