import { Grid, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TitleDivider from '../TitleDivider/TitleDivider';
import SelfServe from './SelfServe/SelfServe';
import Guided from './Guided/Guided';
import BusinessServices from './BusinessServices/BusinessServices';
import { Container, GridContainer, Column } from './styles';

const Background = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 360,
        width: '100%',
        display: { xs: 'none', lg: 'block' },
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1726 1178" fill="none">
        <path
          d="M-4 0.499756L851 218.5L1726 0.499756V1177.5L920 837.5L-4 1177.5V0.499756Z"
          fill={theme.palette.landing.mintIce}
        />
      </svg>
    </Box>
  );
};

const Benefits = () => {
  return (
    <Container id="benefits">
      <TitleDivider
        label="SETUP & IMPLEMENTATION"
        title="High-performing benefit from using allwyse."
        subtitle="Solutions for any need."
      />
      <Background />
      <GridContainer>
        <Grid container>
          <Grid xs={12} lg={8} item>
            <Column>
              <SelfServe />
              <Guided />
            </Column>
          </Grid>

          <Grid xs={12} lg={4} sx={{ display: 'flex', justifyContent: 'center' }} item>
            <BusinessServices />
          </Grid>
        </Grid>
      </GridContainer>
    </Container>
  );
};

export default Benefits;
