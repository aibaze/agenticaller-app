'use client';

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useAuthContext } from 'src/auth/hooks';

import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import { useOverviewData } from 'src/hooks/use-overview-data';
import Header from '../header';
import Agenda from '../agenda';
import Analytics from '../analytics';
// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { currentCoach } = useAuthContext();
  const {
    nextEvent,
    eventsLeftWeek,
    eventsForToday,
    students,
    previousEvents,
    coachStats,
    contactMessages,
  } = useOverviewData(currentCoach?._id);
  const theme = useTheme();

  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Header
        currentCoach={currentCoach}
        settings={settings}
        newClientsMonth={coachStats?.clientsCreatedThisMonth}
      />
      <Agenda
        nextEvent={nextEvent}
        eventsForToday={eventsForToday}
        eventsLeftWeek={eventsLeftWeek}
        previousEvents={previousEvents}
        theme={theme}
        settings={settings}
      />
      <Analytics
        students={students}
        coachStats={coachStats}
        contactMessages={contactMessages}
        settings={settings}
        theme={theme}
      />
    </Container>
  );
}
