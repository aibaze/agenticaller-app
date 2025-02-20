import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import TableCell from '@mui/material/TableCell';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Label from 'src/components/label/label';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

export const StyledCard = styled(Card)(({ theme, noTopRadius, noBottomRadius }) => ({
  borderRadius: noTopRadius ? '0 0 16px 16px' : noBottomRadius ? '16px 16px 0 0' : '16px',
}));

export const StyledTableCell = styled(TableCell)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const StyledAvatar = styled(Avatar)({
  width: 60,
  height: 60,
});

export const StyledBox = styled(Box)(({ theme }) =>({
  textAlign: 'left',
  marginLeft: theme.spacing(2)
}));

export const StyledTypographyMessage = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  marginLeft: theme.spacing(1),
  marginBottom: theme.spacing(3),
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
  wordBreak: 'break-word',
}));

export const StyledTableCellDate = styled(TableCell)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  justifyContent: 'flex-end',
});

export const StyledLabel = styled(Label)(({ theme, priority }) => ({
  width: '100px',
  height: '24px',
  backgroundColor: priority === 'QUESTION' ? theme.palette.landing.facebookBlue : theme.palette.success.main,
  color: theme.palette.common.white,
}));

export const StyledIconButton = styled(IconButton)({
  paddingX: 2,
  right: 0,
});

export const StyledPopover = styled(Popover)({
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
});

export const StyledButton = styled(Button)({
  width: '100%',
});
