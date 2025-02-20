import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

export const StyledModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  maxWidth: 500,
  width: '100%',
}));

export const StyledLinkTypography = styled(Typography)(({ theme }) => ({
  textDecoration: 'underline',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  '&:visited': {
    color: theme.palette.primary.main,
  },
}));
export const StyledLinkTypography2 = styled(Typography)(({ theme }) => ({
    marginBottom: 1, 
    textAlign: 'left'
  }));

export const StyledModalContentBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const StyledIllustrationBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: 'left',
}));