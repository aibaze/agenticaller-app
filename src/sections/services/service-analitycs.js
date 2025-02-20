import { useEffect, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Grid, Divider, Icon } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UsersRoundedIcon from 'src/assets/icons/users-rounded-icon';
import SvgColor from 'src/components/svg-color';
import { getRequestsByServiceId } from 'src/api/requests';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarIcon from 'src/assets/icons/calendar-icon';

export default function ServiceAnalitycs({ service }) {
  const [requests, setRequests] = useState({
    questions: 0,
    request: 0,
  });
  const theme = useTheme();

  const fetchRequests = useCallback(async () => {
    try {
      const { requests } = await getRequestsByServiceId(service._id);
      const questions = requests.filter((r) => r.priority === 'QUESTION').length;
      const request = requests.filter((r) => r.priority === 'REQUEST').length;
      setRequests({ questions, request });
    } catch (error) {
      console.error('Error fetching requests', error);
    }
  }, [service.id]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <Card>
      <Box sx={{ p: 3, borderRadius: 1, ...bgGradient(theme.palette.primary.main) }}>
        <Typography variant="h4" component="h4" sx={{ mb: 1 }}>
          Analytics
        </Typography>
        <Typography
          variant="subtitle2"
          component="subtitle2"
          sx={{ mb: 1, color: 'text.secondary', display: 'flex', alignItems: 'center' }}
        >
          <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            <VisibilityIcon fontSize="small" />
          </Box>
          Private to you
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              component="h6"
              sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
            >
              <Box
                component="span"
                sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'text.secondary' }}
              >
                <UsersRoundedIcon fontSize="small" />
              </Box>
              {service.views.totalVisits} Services views
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
              Discover when clients come check your service
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              component="h6"
              sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
            >
              <Box
                component="span"
                sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'text.secondary' }}
              >
                <SvgColor src="/assets/icons/navbar/ic_mail.svg" sx={{ width: 24, height: 24 }} />
              </Box>
              {requests.questions} Questions sent
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
              Track how many clients sent you a question
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              component="h6"
              sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
            >
              <Box
                component="span"
                sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'text.secondary' }}
              >
                <CalendarIcon fontSize="small" />
              </Box>
              {requests.request} Book sessions requests
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
              Monitor how frequently clients book sessions on your services
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Link
          href="/overview"
          underline="none"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{
              textAlign: 'center',
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              '&:hover': { color: 'text.secondary' },
            }}
          >
            All Analytics
          </Typography>
          <Box
            component="span"
            sx={{ ml: 1, display: 'flex', alignItems: 'center', color: 'text.primary' }}
          >
            <OpenInNewIcon fontSize="small" />
          </Box>
        </Link>
      </Box>
    </Card>
  );
}
