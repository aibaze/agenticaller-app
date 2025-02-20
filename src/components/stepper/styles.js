import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  }));

export const StyledStepperWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  flex: 1,
  width: '70%',
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
export const StyledStepper = styled(Stepper)(({ theme }) => ({
    width: '90%',
    margin: '0 auto',
  
  [theme.breakpoints.down('sm')]: {
    width: '80%',
    margin: '0 auto',
  },
  '& .MuiStepLabel-root': {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiStepLabel-label': {
      marginTop: theme.spacing(1),
    },
  },
  '& .MuiStepIcon-root': {
    marginLeft: theme.spacing(1),
  },
}));


export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'inherit',
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end', 
  padding: theme.spacing(2),
  width: '100%',
  marginRight: theme.spacing(40),
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    marginRight: theme.spacing(0),
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


export const StyledHelpBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
}));
