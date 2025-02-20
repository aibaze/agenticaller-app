import { styled } from '@mui/material/styles';
import { Box, Modal } from '@mui/material';

export const StyledModalContainer = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2, 
  boxShadow: theme.shadows[24],
  minWidth: 500,
  textAlign: 'center',
}));
