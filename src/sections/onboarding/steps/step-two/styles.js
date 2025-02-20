import { styled } from '@mui/material/styles';
import { Button, Grid, Typography, Paper, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';



export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'inherit',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  width: '100%',
  fontSize: '0.75rem',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 5),
  },
}));

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

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: 'black',
}));
