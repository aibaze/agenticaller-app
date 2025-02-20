import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, Button, Modal, Stack } from '@mui/material';
import Label from 'src/components/label/label';

export const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  overflowY: 'auto',
  height: '90%',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('md')]: {
    width: 360,
  },
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
}));

export const LabelsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export const StyledLabel = styled(Label)(({ theme, ownerState }) => ({
  height: '24px',
  backgroundColor: ownerState.bgColor || theme.palette.grey[900],
  color: theme.palette.common.white,
}));

export const DateTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.grey[500],
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const MessageTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: 'fit-content',
  overflowY: 'auto',
  overflowX: 'hidden',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
}));

export const EditorContainer = styled(Box)({
  marginBottom: '24px',
  height: '220px',
});

export const DateTimeContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
});

export const DateTimeBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
