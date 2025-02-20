import { useState } from 'react';
import { Grid, Container, Stack, Typography, Box } from '@mui/material';
import { _appFeatured } from 'src/_mock';
import { fTimehourMinutes } from 'src/utils/format-time';
import AppWidgetSummary from './app-widget-summary/app-widget-summary';
import AppWidgetTimeline from './app-widget-timeline';
import AppWidgetList from './app-widget-list/app-widget-list';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { CalendarIconOverview } from 'src/assets/icons';
import UsersRoundedIcon from 'src/assets/icons/users-rounded-icon';

export default function Agenda({
  nextEvent,
  eventsForToday,
  eventsLeftWeek,
  previousEvents,
  settings,
  theme,
}) {
  const [showTotalClients, setShowTotalClients] = useState(false);
  const uniqueClients = Object.values(
    eventsLeftWeek.reduce((acumulator, currentValue) => {
      if (!acumulator[currentValue.studentEmail])
        acumulator[currentValue.studentEmail] = currentValue;
      return acumulator;
    }, {})
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box mt={3}>
            <Typography variant="h4">Your agenda</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={5}>
            <AppWidgetSummary
              title="Upcoming Clients today"
              icon={<WatchLaterIcon sx={{ color: theme.palette.primary.main }} />}
              secondaryContent={
                nextEvent
                  ? fTimehourMinutes(new Date(nextEvent.startDate))
                  : 'No upcoming clients today'
              }
              primaryContent={nextEvent ? nextEvent.studentName : '0'}
              avatar={nextEvent && nextEvent.studentName}
              avatarColor={theme.palette.primary.main}
            />
            <AppWidgetSummary
              title="Pending Meetings Today"
              icon={<CalendarIconOverview sx={{ color: theme.palette.primary.main }} />}
              secondaryContent={nextEvent ? fTimehourMinutes(new Date(nextEvent.startDate)) : ''}
              primaryContent={eventsForToday ? eventsForToday.length.toString() : ''}
              avatar={eventsForToday && eventsForToday}
              avatarColor={theme.palette.primary.main}
            />
            <AppWidgetSummary
              title="Pending Meetings this week"
              icon={<UsersRoundedIcon sx={{ color: theme.palette.primary.main }} />}
              secondaryContent={uniqueClients.length ? uniqueClients.length.toString() : ''}
              primaryContent={eventsLeftWeek ? eventsLeftWeek.length.toString() : ''}
              avatar={eventsLeftWeek && eventsLeftWeek}
              avatarColor={theme.palette.primary.main}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetList
            title="Clients"
            subtitle={`You have ${uniqueClients.length} clients pending this week`}
            list={showTotalClients ? uniqueClients : uniqueClients.slice(0, 6)}
            handleShowMore={() => setShowTotalClients(!showTotalClients)}
            isExpanded={showTotalClients}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetTimeline
            title="Agenda Timeline"
            subtitle={`You had ${previousEvents.length} apointments this week`}
            list={previousEvents}
            limit={5}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
