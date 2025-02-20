import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppwidgetStatBox({
  title,
  stat,
  icon,
  backgroundColor,
  subtitle,
  labelColor,
  ...other
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
      }}
      {...other}
    >
      <Box sx={{ textAlign: 'center', p: 3 }}>
        {icon}
        <Stack spacing={0}>
          <Typography color={labelColor} variant="h2">
            {stat}
          </Typography>
          <Typography color={labelColor} variant="body2">
            {title}
          </Typography>
          {subtitle && (
            <Typography color={labelColor} variant="caption">
              {subtitle}
            </Typography>
          )}
        </Stack>
      </Box>
    </Card>
  );
}

AppwidgetStatBox.propTypes = {
  title: PropTypes.string.isRequired,
  stat: PropTypes.string,
};
