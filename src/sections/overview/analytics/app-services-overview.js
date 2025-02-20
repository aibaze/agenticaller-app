import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

const colorLinear = [
  { colorPrimary: '#00A76F', barColorPrimary: '#00A76F3D' },
  { colorPrimary: '#00B8D9', barColorPrimary: '#00B8D93D' },
  { colorPrimary: '#FF5630', barColorPrimary: '#FF56303D' },
];

export default function AppServicesOverview({ title, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} />
      <Stack spacing={6} sx={{ p: 3, mb: 3 }}>
        {list && list.map((service, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">
                  {service.label}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <Typography variant="body2" component={'span'} fontWeight="bold">
                  {service.subtext} Clients
                  <Box fontWeight='fontWeightMedium' variant="body2" display='inline' sx={{ ml: 1 }}>(%{service.value})</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LinearProgress
                  variant="determinate"
                  value={service.value}
                  sx={{
                    bgcolor: colorLinear[index % colorLinear.length].barColorPrimary,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: colorLinear[index % colorLinear.length].colorPrimary,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        {!list && <Typography variant="h5" fontWeight="bold">
          No services available
        </Typography>}
      </Stack>
    </Card>
  );
}

AppServicesOverview.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      subtext: PropTypes.number.isRequired,  // Ensure this is required if it is used
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};
