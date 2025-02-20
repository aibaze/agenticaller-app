import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';

export const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'lg',
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(5, 3),
  margin: 'auto',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));


export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  fullWidth: true,
  marginTop: theme.spacing(2),
}));

export const StyledSeoIllustration = styled(SeoIllustration)(({ theme }) => ({
  maxWidth: 350,
}));
