'use client';
import Calendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useState, useEffect } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import { getCoachStudents } from 'src/api/student';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import { GoogleScopeAuthModal } from 'src/components/GoogleScopeAuthModal/GoogleScopeAuthModal';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { fTimestamp } from 'src/utils/format-time';

import { useAuthContext } from 'src/auth/hooks';
import { updateEvent, useGetEvents } from 'src/api/calendar';

import { useSettingsContext } from 'src/components/settings';

import { StyledCalendar } from 'src/sections/calendar/styles';
import CalendarLoggedForm from 'src/sections/calendar/calendar-logged-form';
import CalendarPublicForm from 'src/sections/calendar/calendar-public-form';
import { useEvent, useCalendar } from 'src/sections/calendar/hooks';
import CalendarToolbar from 'src/sections/calendar/calendar-toolbar';
import dayjs from 'dayjs';
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock';

// ----------------------------------------------------------------------

const defaultFilters = {
  colors: [],
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function ProfileCalendar({ services, isPublic }) {
  const theme = useTheme();
  const { currentCoach } = useAuthContext();
  const settings = useSettingsContext();

  const smUp = useResponsive('up', 'sm');

  const openFilters = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);
  const [students, setStudents] = useState([]);

  const { events, eventsLoading } = useGetEvents(currentCoach?._id, isPublic);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    onSelectRange,
    onClickEvent,
    onResizeEvent,
    onInitialView,
    //
    openForm,
    onOpenForm,
    onCloseForm,
    //
    selectEventId,
    selectedRange,
  } = useCalendar({ isPublic });

  const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);

  useEffect(() => {
    onInitialView();
  }, [onInitialView]);

  useEffect(() => {
    const getStudents = async () => {
      const { data } = await getCoachStudents(currentCoach?._id);
      setStudents(data.students);
    };
    getStudents();
  }, []);

  const dataFiltered = applyFilter({
    inputData: events,
    filters,
    dateError,
  });

  const eventType = openForm
    ? currentEvent?.id
      ? `Edit ${isPublic ? 'Request' : 'Session'}`
      : `New ${isPublic ? 'Request' : 'Session'}`
    : '';

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Typography variant="h4">Calendar</Typography>
          {/*  {!isPublic && (
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={onOpenForm}
            >
              New Event
            </Button>
          )}  */}
        </Stack>

        <Card>
          <StyledCalendar>
            <CalendarToolbar
              date={date}
              view={view}
              loading={eventsLoading}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onToday={onDateToday}
              onChangeView={onChangeView}
              onOpenFilters={openFilters.onTrue}
            />

            <Calendar
              weekends
              editable
              droppable
              selectable
              rerenderDelay={10}
              allDayMaintainDuration
              eventResizableFromStart
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              events={dataFiltered}
              headerToolbar={false}
              select={onSelectRange}
              eventClick={onClickEvent}
              height={smUp ? 720 : 'auto'}
              eventDrop={(arg) => {
                onDropEvent(arg, updateEvent);
              }}
              eventResize={(arg) => {
                onResizeEvent(arg, updateEvent);
              }}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
              validRange={{ start: dayjs().format('YYYY-MM-DD') }}
            />
          </StyledCalendar>
        </Card>
      </Container>

      {!isPublic && <GoogleScopeAuthModal />}

      <Dialog
        fullWidth
        maxWidth="xs"
        open={openForm}
        onClose={onCloseForm}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
      >
        <DialogTitle sx={{ minHeight: 76 }}>{eventType}</DialogTitle>
        {isPublic ? (
          <CalendarPublicForm
            students={students}
            currentEvent={currentEvent}
            services={services}
            onClose={onCloseForm}
          />
        ) : (
          <CalendarLoggedForm
            students={students}
            currentEvent={currentEvent}
            services={services}
            onClose={onCloseForm}
            colorOptions={CALENDAR_COLOR_OPTIONS}
          />
        )}
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters, dateError }) {
  const { colors, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  inputData = stabilizedThis.map((el) => el[0]);

  if (colors.length) {
    inputData = inputData.filter((event) => colors.includes(event.color));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (event) =>
          fTimestamp(event.start) >= fTimestamp(startDate) &&
          fTimestamp(event.end) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
