import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)(({ theme }) => ({
    alignItems: 'center',
    padding: theme.spacing(3),
}));

export const StyledBox = styled(Box)({
    flexGrow: 1,
});

export const StyledGridContainer = styled(Grid)({
    alignItems: 'center',
});

export const StyledGridItem = styled(Grid)(({ alignStart }) => ({
    display: 'flex',
    alignItems: alignStart ? 'flex-start' : 'center',
    justifyContent: alignStart ? 'flex-start' : 'center',
}));

export const StyledTypographySubtitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 60,
    height: 60,
}));
