import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

export const StyledBox = styled(Box)({
  flexGrow: 1,
  padding: '24px',
});

export const StyledGridContainer = styled(Grid)({
  alignItems: 'center',
});

export const StyledGridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-end',
  },
}));

export const StyledTypographyTitle = styled(Typography)({
  cursor: 'pointer',
});

export const StyledTypographySubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledListItem = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  flex: 1,
  '& .MuiListItemText-secondary': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export const StyledListItemAvatar = styled(ListItemAvatar)({
  marginRight: '16px',
});

export const StyledAvatar = styled(Avatar)({});
