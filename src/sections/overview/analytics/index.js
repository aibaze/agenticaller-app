import { Grid, Container, Stack, Typography } from '@mui/material';
import { _appFeatured } from 'src/_mock';
import AppWidgetSummary from '../agenda/app-widget-summary/app-widget-summary';
import AppwidgetStatBox from './app-widget-stat-box';
import AppCurrentDownload from './app-current-download';
import AppServicesOverview from './app-services-overview';
import AppWidget from './app-widget';
import AppAreaInstalled from './app-area-installed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UsersRoundedIcon from 'src/assets/icons/users-rounded-icon-green';
import StackShopsIcon from 'src/assets/icons/stack-shops-icon';
import UserIcon from 'src/assets/icons/user-icon';
import PurpleUserIcon from 'src/assets/icons/purple-user-icon';
import UsersRoundedIconBlue from 'src/assets/icons/users-rounded-icon-blue';
import StackArrowDownIcon from 'src/assets/icons/stack-arrow-down-icon';
import JobIcon from 'src/assets/icons/job-icon';

const mockedChart = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      year: '2019',
      data: [
        {
          name: 'Asia',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
        },
      ],
    },
    {
      year: '2020',
      data: [
        {
          name: 'Asia',
          data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
        },
      ],
    },
  ],
};

export default function Analytics({ students, coachStats, contactMessages, settings, theme }) {
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} disableGutters>
      <Grid container spacing={3}>
        <Grid item mt={3} xs={12}>
          <Typography variant="h4">Analytics</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <AppwidgetStatBox
            title="Total service conversion "
            subtitle={'(Coming soon)'}
            icon={<StackShopsIcon />}
            stat="-"
            // stat={coachStats ? coachStats.totalServiceConversion.toString() : '0'}
            backgroundColor={'#C8FAD6'}
            labelColor={'#004B50'}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <AppwidgetStatBox
            title="Total users"
            icon={<UsersRoundedIconBlue />}
            stat={students?.length?.toString()}
            backgroundColor={theme.palette.landing.lightBLue}
            labelColor={'#003768'}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <AppwidgetStatBox
            title="Total profile views"
            icon={<PurpleUserIcon />}
            stat={coachStats && coachStats.totalVisits ? coachStats.totalVisits.toString() : '0'}
            backgroundColor={theme.palette.landing.lavenderMist}
            labelColor={'#7A4100'}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <AppwidgetStatBox
            title="Open contact messages"
            icon={<StackArrowDownIcon />}
            stat={
              contactMessages
                ? contactMessages.filter((item) => item.state !== 'ANSWERED').length.toString()
                : '0'
            }
            backgroundColor={theme.palette.error.lighter}
            labelColor={'#7A0916'}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            disabled
            title="Services visits this month"
            subtitle="(Coming soon)"
            icon={<VisibilityIcon sx={{ color: theme.palette.primary.main }} />}
            secondaryContent={'Organic views'}
            primaryContent={
              coachStats && coachStats.serviceVisitsThisMonth
                ? coachStats.serviceVisitsThisMonth.toString()
                : '0'
            }
            cardIcon={<JobIcon sx={{ color: theme.palette.primary.main, fontSize: 50 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            disabled
            subtitle="(Coming soon)"
            title="Profile visits this month"
            icon={<VisibilityIcon sx={{ color: theme.palette.primary.main }} />}
            secondaryContent={'Organic views'}
            primaryContent={
              coachStats && coachStats.profileVisitsThisMonth
                ? coachStats.profileVisitsThisMonth.toString()
                : '0'
            }
            cardIcon={<UserIcon sx={{ color: theme.palette.primary.main, fontSize: 50 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="New client this month"
            icon={<PersonAddIcon sx={{ color: theme.palette.primary.main }} />}
            secondaryContent={'Client acquisition'}
            primaryContent={
              coachStats && coachStats.clientsCreatedThisMonth
                ? coachStats.clientsCreatedThisMonth.toString()
                : '0'
            }
            cardIcon={<UsersRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 50 }} />}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Service rate"
            chart={{
              series:
                coachStats && coachStats.servicesStats.byServices
                  ? coachStats.servicesStats.byServices.map((service) => ({
                      label: service.title,
                      value: service.totalVisits,
                    }))
                  : [],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppAreaInstalled
            disabled
            title="Profile visits by month (Coming Soon)"
            chart={mockedChart}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Stack spacing={2}>
            <AppServicesOverview
              title="Top Services Overview"
              list={
                coachStats && coachStats.servicesStats.byServices
                  ? coachStats.servicesStats.byServices.map((service) => ({
                      label: service.title,
                      value: service.completionPercentage || 0,
                      subtext: service.bookedSeats,
                    }))
                  : []
              }
            />

            <AppWidget
              sx={{
                opacity: '.3',
              }}
              title="Conversion per visit (Coming Soon)"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{
                series: 48,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
