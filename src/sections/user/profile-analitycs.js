import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography, Grid, Divider, Icon } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UsersRoundedIcon from 'src/assets/icons/users-rounded-icon';
import SvgColor from 'src/components/svg-color';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useAuthContext } from 'src/auth/hooks';


export default function ProfileAnalytics() {
  const { currentCoach } = useAuthContext();
  const theme = useTheme();

  return (
    <Card>
      <Box sx={{ p: 3, borderRadius: 1, ...bgGradient(theme.palette.primary.main) }}>
        <Typography variant="h4" component="h4" sx={{ mb: 3 }}>
          Analytics
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          sx={{ mb: 3, color: 'text.secondary', display: 'flex', alignItems: 'center' }}
        >
          <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            <VisibilityIcon fontSize="small" />
          </Box>
          Private to you
        </Typography>
        <Divider />
        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="h4"
              sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
            >
              <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <UsersRoundedIcon fontSize="small" />
              </Box>
             {currentCoach.profileViews.totalVisits} Profile views
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
              Discover when clients visit your profile
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="h4"
              sx={{ mb: 1, display: 'flex', alignItems: 'center'}}
            >
              <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'text.secondary'  }}>
                <SvgColor
                  src="/assets/icons/navbar/ic_ecommerce.svg"
                  sx={{ width: 24, height: 24 }}
                />
              </Box>
              Service views
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
              Track how often your profile is shared to expand your network
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="h4"
              sx={{ mb: 1, display: 'flex', alignItems: 'center'}}
            >
              <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'text.secondary'  }}>
                <ShareIcon fontSize="small" />
              </Box>
              Links shared
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
              Monitor how frequently clients share your services
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Link
          href="/overview"
          underline="none"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography
            variant="h5"
            component="h4"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              '&:hover': { color: 'text.secondary' },
            }}
          >
            All Analytics
          </Typography>
          <Box component="span" sx={{ ml: 1, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <OpenInNewIcon fontSize="small" />
          </Box>
        </Link>
      </Box>
    </Card>
  );
}
