import { styled } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '50vh',
  width: '100%',
  padding: theme.spacing(3),
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4),
  margin: theme.spacing(5),
  marginTop: '-40px',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const CustomLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px',
}));

export const IllustrationContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%',
  margin: '0 auto',
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
}));

export const CenteredStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: theme.spacing(0.5),
}));
