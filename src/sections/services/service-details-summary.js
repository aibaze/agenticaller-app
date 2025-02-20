import { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { getPublicEventsByCoach } from 'src/api/event';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import ServiceRequestDetails from 'src/components/ServiceRequestDetails';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { fCurrency, fShortenNumber } from 'src/utils/format-number';
import { Info } from '@mui/icons-material';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import FormProvider from 'src/components/hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import QuestionForm from './service-details-question-form';
import {
  shouldDisableDate,
  getAvaiableHoursFromDate,
  convertLocalToUTC,
  isWithinMorningHours,
  getNextWorkingDay,
} from 'src/utils/dates';
import { useSnackbar } from 'src/components/snackbar';
import { sendRequest } from 'src/api/requests';
import { calculateRatingStats } from 'src/utils/ratings';
import SuccessClient from 'src/assets/illustrations/success-client';
// ----------------------------------------------------------------------

export default function ServiceDetailsSummary({ service, isPublic, handleEditClick }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState('');
  const [hourLoading, setHourLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [openBookingForm, setOpenBookingForm] = useState(false);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [questionnaire, setQuestionnaire] = useState({});
  const { copy } = useCopyToClipboard();

  const { currentCoach } = useAuthContext();
  const {
    seatsLeft,
    title,
    salePrice,
    endDate,
    price,
    workDays,
    sessionDuration,
    sessionPeriodicity,
    customSessionMinutes,
    sessionAmount,
  } = service;
  const { totalReviews, averageRating } = calculateRatingStats(service?.reviews);
  const hasSeatsLeft = typeof seatsLeft === 'number' && seatsLeft > 0;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    requestedDate: yup.string().required('Session date is required'),
    requestedTime: yup.string().required('Session time is required'),
    message: yup.string().optional(),
  });

  const defaultValues = {
    name: '',
    email: '',
    requestedDate: getNextWorkingDay(workDays),
    requestedTime: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { watch, control, handleSubmit, setValue } = methods;

  const values = watch();

  const handleChangeQuestionnarie = (questionKey, value) => {
    setQuestionnaire({
      ...questionnaire,
      [questionKey]: value,
    });
  };
  const onOpenBookingForm = useCallback(() => {
    trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
      widget_name: 'service_actions',
      actions: 'open_session_request_modal',
    });
    setOpenBookingForm(true);
  }, []);

  const onCloseBookingForm = useCallback(() => {
    setOpenBookingForm(false);
    setIsSubmitSuccess(false);
  }, []);

  const onOpenQuestionForm = useCallback(() => {
    trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
      widget_name: 'service_actions',
      actions: 'open_question_modal',
    });
    setOpenQuestionForm(true);
  }, []);
  const onSubmit = handleSubmit(async (data) => {
    setTabValue('1');
    setIsSubmitting(true);
    try {
      const localDate = new Date(data.requestedDate);
      const localOffset = localDate.getTimezoneOffset() * 60000;
      const requestDataIsoString = new Date(localDate.getTime() - localOffset).toISOString();

      trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
        widget_name: 'service_actions',
        actions: 'create_session_request',
      });
      const body = {
        ...data,
        priority: 'REQUEST',
        type: 'SERVICE',
        coachId: service.coachId,
        serviceId: service._id,
        requestedDate: requestDataIsoString,
        questionnaire: service.questionnaire
          ? Object.entries(questionnaire).map(([question, answer]) => ({
              question: question,
              answer,
            }))
          : [],
      };

      await sendRequest(body);
      enqueueSnackbar('Sent Request successfully!', { variant: 'success' });
      setIsSubmitSuccess(true);
    } catch (e) {
      enqueueSnackbar(error?.message || 'Error', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  });

  const helperWithIcon = (text) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Info sx={{ width: '20px' }} />
      {text}
    </Box>
  );

  const handleCopy = useCallback(
    (url) => {
      enqueueSnackbar('URL copied to your clipboard, feel free to share it !', {
        variant: 'success',
        autoHideDuration: 6000,
      });
      copy(url);
    },
    [copy, enqueueSnackbar]
  );

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      <Box
        component="span"
        sx={{
          color: salePrice && 'text.disabled',
          textDecoration: salePrice && 'line-through',
          mr: 0.5,
        }}
      >
        {fCurrency(price)}
      </Box>

      {salePrice && fCurrency(salePrice)}
    </Box>
  );

  const disableDateFunction = shouldDisableDate(workDays);

  const renderSessionDate = (
    <Stack gap={1} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
      <Typography variant="subtitle2"> Session Date</Typography>
      <Controller
        name="requestedDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            shouldDisableDate={disableDateFunction}
            format="MM-DD-YYYY"
            slotProps={{
              textField: {
                error: !!error,
                helperText: helperWithIcon('Please select one available date '),
              },
            }}
          />
        )}
      />
    </Stack>
  );

  const renderTimeSelector = (
    <Stack direction="column" spacing={2}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Available hours on {dayjs(values.requestedDate).format('dddd D MMM, YYYY')}{' '}
      </Typography>
      <Stack
        direction="row"
        sx={{
          position: 'relative',
          flexWrap: 'wrap',
        }}
        spacing={1}
      >
        <>
          {hourLoading && (
            <Grid
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: ' 50%',
                left: ' 50%',
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircularProgress />
            </Grid>
          )}
          {availableHours.map((hourObj) => (
            <Grid
              sx={
                showDisclaimer
                  ? { width: '90px', marginLeft: '5px', marginRight: '10px' }
                  : {
                      width: '70px',
                    }
              }
            >
              <Chip
                sx={{ width: '100%' }}
                label={showDisclaimer ? `${hourObj.time} AM` : hourObj.time}
                disabled={hourObj.isDisabled}
                color={'info'}
                variant={hourObj.time === selectedHour ? 'filled' : 'outlined'}
                onClick={() => {
                  setSelectedHour(hourObj.time);
                  const isoString = convertLocalToUTC(hourObj.time, true);

                  setValue('requestedTime', isoString);
                  onOpenBookingForm();
                }}
              />
            </Grid>
          ))}
        </>
      </Stack>
    </Stack>
  );

  const renderActions = isPublic ? (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Button
        fullWidth
        size="large"
        color="primary"
        variant="contained"
        startIcon={<Iconify icon="solar:calendar-date-bold" width={24} />}
        sx={{ whiteSpace: 'nowrap', borderRadius: 50, color: 'black' }}
        onClick={onOpenBookingForm}
        disabled={!(values.requestedTime && values.requestedDate) || !hasSeatsLeft}
      >
        Book Session
      </Button>

      <Button
        fullWidth
        size="large"
        variant="contained"
        sx={{ whiteSpace: 'nowrap', borderRadius: 50 }}
        onClick={onOpenQuestionForm}
      >
        I have a question
      </Button>
    </Stack>
  ) : (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Button
        fullWidth
        size="large"
        color="primary"
        variant="contained"
        startIcon={<Iconify icon="solar:share-bold" width={24} />}
        sx={{ whiteSpace: 'nowrap', borderRadius: 50, color: 'black' }}
        onClick={() => {
          trackMixPanelEvent(MIXPANEL_ACTION.USER_SHARED, {
            widget_name: 'shared_service',
            from: 'main_button',
          });
          handleCopy(`${window.location.host}/info/${currentCoach?.slug}/services/${service._id}`);
        }}
      >
        Share service
      </Button>

      <Button
        fullWidth
        size="large"
        startIcon={<Iconify icon="fa-solid:edit" width={24} />}
        variant="contained"
        sx={{ whiteSpace: 'nowrap', borderRadius: 50 }}
        onClick={handleEditClick}
      >
        Edit service
      </Button>
    </Stack>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={averageRating} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${fShortenNumber(totalReviews) || 0} reviews)`}
    </Stack>
  );
  const renderAvailability = (
    <Stack spacing={0.5} direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
      <Label
        variant="soft"
        color={!service.published || !hasSeatsLeft ? 'error' : 'success'}
        sx={{ width: '82px', height: '32px' }}
      >
        {!service.published ? 'Draft' : hasSeatsLeft ? 'Available' : 'Unavailable'}
      </Label>
      <Chip key={service.category} label={service.category} variant="soft" />
    </Stack>
  );

  const renderBookingForm = (
    <>
      <DialogTitle sx={{ minHeight: 76 }}>Book Session</DialogTitle>
      <Tabs
        value={tabValue}
        sx={{ px: 3, mb: 2 }}
        textColor="primary"
        indicatorColor="primary"
        TabIndicatorProps={{
          style: {
            backgroundColor: theme.palette.primary.main, // Replace with your desired color
          },
        }}
        onChange={(event, newValue) => {
          setTabValue(newValue);
        }}
        aria-label="secondary tabs example"
      >
        <Tab value="1" label="Booking data" />
        <Tab value="2" label="Questionnaire" />
      </Tabs>
      {tabValue === '1' && (
        <Stack spacing={3} sx={{ px: 3 }}>
          <RHFTextField placeholder="Ex: George Smith..." name="name" label="Name" />
          <RHFTextField placeholder="example@gmail.com" name="email" label="Email" />

          <RHFTextField
            placeholder="Write your inquire here..."
            name="message"
            label="About (optional)"
            multiline
            rows={3}
          />
        </Stack>
      )}
      {tabValue === '2' && (
        <Stack spacing={3} sx={{ px: 3 }}>
          {service.questionnaire?.map((question) => (
            <Stack spacing={2} key={question}>
              <Typography variant="subtitle2">{question}</Typography>
              <TextField
                value={questionnaire[question]}
                onChange={(event) => {
                  handleChangeQuestionnarie(question, event.target.value);
                }}
                placeholder={question}
                fullWidth
                sx={{ mr: 2 }}
              />
            </Stack>
          ))}
        </Stack>
      )}

      <ServiceRequestDetails
        service={{
          sessionPeriodicity,
          sessionAmount,
          endDate,
          sessionDuration,
          customSessionMinutes,
        }}
        action={'BOOK'}
      />
      <DialogActions>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 3,
          }}
        >
          <Stack direction="row" gap={4}>
            <Box>
              <Typography variant="subtitle2">Date Selected</Typography>
              <Typography variant="body2">
                {dayjs(values.requestedDate).format('D MMMM YYYY')}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Time Selected</Typography>

              <Typography variant="body2">
                {' '}
                {dayjs(values.requestedTime).format('HH:mm')}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" gap={4}>
            <Button variant="outlined" color="inherit" onClick={onCloseBookingForm}>
              Back
            </Button>

            {(service.questionnaire || [])?.length > 0 &&
            Object.keys(questionnaire).length !== service.questionnaire?.length ? (
              <Tooltip title="Fill the questionnaire tab">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={tabValue === '2'}
                  onClick={() => {
                    setTabValue('2');
                  }}
                >
                  Send Book Request
                </LoadingButton>
              </Tooltip>
            ) : (
              <LoadingButton
                type="submit"
                variant="contained"
                disabled={
                  ((service.questionnaire || [])?.length > 0 &&
                    Object.keys(questionnaire).length !== service.questionnaire?.length) ||
                  isSubmitting
                }
                loading={isSubmitting}
                onClick={() => {
                  setTabValue('1');
                  handleSubmit(onSubmit)();
                }}
              >
                Send Book Request
              </LoadingButton>
            )}
          </Stack>
        </Box>
      </DialogActions>
    </>
  );

  const renderSubmitBookingSuccess = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '420px',
        textAlign: 'center',
        padding: theme.spacing(3),
      }}
    >
      <Box sx={{ mb: (theme) => theme.spacing(3) }}>{<SuccessClient />}</Box>

      <Typography variant="h4" sx={{ mb: (theme) => theme.spacing(2) }}>
        Request sent!
      </Typography>

      <Typography variant="subtitle2" sx={{ mb: (theme) => theme.spacing(4) }}>
        Book Request Sent Correctly ✅
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="outlined"
          onClick={onCloseBookingForm}
          sx={(theme) => ({
            borderRadius: theme.shape.borderRadius * 5,
            padding: theme.spacing(1, 2),
          })}
        >
          Close
        </Button>
      </Box>
    </Box>
  );

  useEffect(() => {
    const getEvents = async () => {
      if (!values.requestedDate) {
        return;
      }
      setHourLoading(true);
      setSelectedHour('');
      setValue('requestedTime', '');
      const { data: events } = await getPublicEventsByCoach(
        currentCoach?._id,
        values.requestedDate
      );

      const availableHours = getAvaiableHoursFromDate(
        service.startTime,
        service.endTime,
        events.events,
        Number(service.sessionDuration)
      );

      const { hasOnlyMorningHours } = isWithinMorningHours(
        availableHours?.map((item) => item.time) || []
      );

      if (hasOnlyMorningHours) {
        setShowDisclaimer(true);
      }
      setAvailableHours(availableHours);
      setHourLoading(false);
    };
    getEvents();
  }, [currentCoach, values.requestedDate]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} p={2} pb={4}>
          <Stack spacing={2} alignItems="flex-start">
            {renderAvailability}

            <Typography variant="h5">{title}</Typography>

            {renderRating}

            {renderPrice}
          </Stack>

          <>
            <Divider sx={{ borderStyle: 'dashed' }} />

            {renderSessionDate}

            <Divider sx={{ borderStyle: 'dashed' }} />

            {renderTimeSelector}

            <Divider sx={{ borderStyle: 'dashed' }} />
            {renderActions}

            {!hasSeatsLeft && (
              <Typography variant="caption" sx={{ mt: 1, color: 'error.main' }}>
                No seats left
              </Typography>
            )}
          </>
        </Stack>

        <Dialog
          fullWidth
          maxWidth="sm"
          open={openBookingForm}
          onClose={onCloseBookingForm}
          transitionDuration={{
            enter: theme.transitions.duration.shortest,
            exit: theme.transitions.duration.shortest - 80,
          }}
        >
          {isSubmitSuccess ? renderSubmitBookingSuccess : renderBookingForm}
        </Dialog>
      </FormProvider>
      <QuestionForm
        openQuestionForm={openQuestionForm}
        setOpenQuestionForm={setOpenQuestionForm}
        service={service}
      />
    </>
  );
}
