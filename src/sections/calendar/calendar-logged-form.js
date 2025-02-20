import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useEffect, useCallback, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Info, AccessTimeFilled } from '@mui/icons-material';
import { ColorPicker } from 'src/components/color-utils';

import uuidv4 from 'src/utils/uuidv4';
import { fTimestamp } from 'src/utils/format-time';

import { useAuthContext } from 'src/auth/hooks';
import { createEvent, updateEvent, deleteEvent } from 'src/api/calendar';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFRadioGroup,
  RHFTextFieldWithSelect,
} from 'src/components/hook-form';
import { SERVICE_TIME_OPTIONS } from 'src/_mock';

export default function CalendarLoggedForm({ currentEvent, colorOptions, onClose, services }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { currentCoach } = useAuthContext();

  const EventSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    studentName: Yup.string().max(255).required('Client Name is required'),
    studentEmail: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    sendEmail: Yup.boolean(),
    date: Yup.mixed().required('Start date required'),
    startDate: Yup.mixed().required('Start date required'),
    sessionDuration: Yup.string().required('Session duration is required'),
    color: Yup.string(),
    customSessionMinutes: Yup.number('Minutes value is required').when(['sessionDuration'], {
      is: (sessionDuration) => sessionDuration === 'Custom',
      then: (schema) =>
        schema
          .required('Minutes value is required')
          .min(1, 'Set a valid minute value greater than 0')
          .max(240, 'Max minute value is 240'),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: {
      ...currentEvent,
      date: dayjs(currentEvent?.start),
    },
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const helperWithIcon = (text) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Info sx={{ width: '20px' }} />
      {text}
    </Box>
  );

  useEffect(() => {
    if (currentEvent?.start) {
      setValue('date', dayjs(currentEvent.start));
    }
  }, [currentEvent, setValue]);

  const values = watch();
  const sessionDuration = useWatch({ control, name: 'sessionDuration' });

  const dateError = values.start && values.end ? values.start > values.end : false;
  const onSubmit = handleSubmit(async (data) => {
    const eventData = {
      title: `${currentCoach.firstName} /  ${data?.studentName}`,
      description: data?.description,
      id: currentEvent?._id ? currentEvent?._id : uuidv4(),
      studentName: data?.studentName,
      studentEmail: data?.studentEmail,
      sendEmail: data?.sendEmail,
      start: data?.start,
      startDate: data.startDate,
      end: data?.end,
      coachId: currentCoach?._id,
      sessionDuration: data?.sessionDuration,
      customSessionMinutes: data?.customSessionMinutes,
      attendees: [{ email: currentCoach.email }, { email: data?.studentEmail }],
      color: data?.color,
      serviceId: '', //check this
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      studentId: '', //check this
    };

    try {
      if (!dateError) {
        setIsLoading(true);
        if (currentEvent?.id) {
          await updateEvent(eventData);
          enqueueSnackbar('Update success!');
        } else {
          await createEvent(eventData);
          enqueueSnackbar('Create success!');
        }
        onClose();
        reset();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  });

  const onDelete = useCallback(async () => {
    try {
      await deleteEvent(`${currentEvent?.id}`);
      enqueueSnackbar('Delete success!');
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [currentEvent?.id, enqueueSnackbar, onClose]);

  useEffect(() => {
    if (typeof currentEvent.service === 'string') {
      const currentService = services.find((serv) => serv._id === currentEvent.service);
      setValue('service', currentService);
    }
  }, [services]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <Stack>
          <Typography variant="subtitle2" sx={{ flexGrow: 1, mb: 1 }}>
            Title
          </Typography>
          <RHFTextField name="title" placeholder="Ex: Life coaching consulting..." />
        </Stack>
        <Stack>
          <Typography variant="subtitle2" sx={{ flexGrow: 1, mb: 1 }}>
            Description
          </Typography>
          <RHFTextField name="description" placeholder="Ex: description..." />
        </Stack>

        <RHFTextField name="studentName" label="Client Name" placeholder="Ex: Anne Smith" />

        <RHFTextField
          name="studentEmail"
          label="Email"
          type="email"
          placeholder="example@gmail.com"
        />

        <RHFSwitch name="sendEmail" label="Notify client" />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              value={dayjs(field.value)}
              onChange={(newValue) => {
                setValue('startDate', dayjs(newValue).toISOString());

                if (newValue) {
                  field.onChange(fTimestamp(newValue));
                }
              }}
              label="Date"
              format="DD/MM/YYYY hh:mm A"
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          )}
        />

        <Stack spacing={2}>
          <Typography variant="subtitle2">Session Duration</Typography>
          <RHFRadioGroup
            row
            spacing={4}
            name="sessionDuration"
            options={SERVICE_TIME_OPTIONS}
            sx={{ marginLeft: 1 }}
          />

          {sessionDuration === 'Custom' && (
            <RHFTextFieldWithSelect
              name="customSessionMinutes"
              helperText={helperWithIcon('Set the amount of time in minutes')}
              options={[15, 30, 75]}
              sx={{ width: '100%', maxWidth: '220px' }}
              placeholder="ex: 20"
              suffix="min"
              maxValue={240}
              prefixIcon={<AccessTimeFilled sx={{ color: 'text.primary' }} />}
              type="number"
            />
          )}
        </Stack>

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              selected={field.value}
              onSelectColor={(color) => field.onChange(color)}
              colors={colorOptions}
            />
          )}
        />
      </Stack>

      <DialogActions>
        {!!currentEvent?.id && (
          <Tooltip title="Delete Event">
            <IconButton onClick={onDelete}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isLoading} disabled={dateError}>
          Save Changes
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
