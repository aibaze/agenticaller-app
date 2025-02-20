import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { formHelperTextClasses } from '@mui/material/FormHelperText';

import uuidv4 from 'src/utils/uuidv4';

import { useAuthContext } from 'src/auth/hooks';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete, RHFSelect } from 'src/components/hook-form';
import { TIMES_30MIN } from 'src/_mock';
import { getServicesByCoach } from 'src/api/coach';
import { sendRequest } from 'src/api/requests';

// ----------------------------------------------------------------------

export default function CalendarForm({ currentEvent, onClose, services }) {
  const { enqueueSnackbar } = useSnackbar();
  const { currentCoach } = useAuthContext();
  const EventSchema = Yup.object().shape({
    studentName: Yup.string().max(255).required('Student Name is required'),
    studentEmail: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    description: Yup.string(),
    service: Yup.object().required('Service is required'),
    requestedTime: Yup.string().required('Session time is required'),
  });
  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: currentEvent,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();
  const [coachServices, setCoachServices] = useState([]);

  const getCoachServices = async () => {
    const response = await getServicesByCoach(currentCoach?._id);
    const serviceNames = response.data.services.map(({ title, _id }) => ({ title, _id }));
    setCoachServices(serviceNames);
  };

  useEffect(() => {
    getCoachServices();
  }, [currentCoach]);

  const dateError = values.start && values.end ? values.start > values.end : false;
  const onSubmit = handleSubmit(async (data) => {
    const eventData = {
      id: currentEvent?._id ? currentEvent?._id : uuidv4(),
      name: data?.studentName,
      email: data?.studentEmail,
      message: data?.description,
      service: data?.service?.title,
      serviceId: data?.service?._id,
      requestedDate: new Date(data?.start).toISOString(),
      coachId: currentCoach?._id,
      requestedTime: data?.requestedTime,
      attendees: [{ email: currentCoach.email }, { email: data?.studentEmail }],
      type: 'SERVICE',
      priority: 'REQUEST',
    };

    try {
      if (!dateError) {
        await sendRequest(eventData);
        enqueueSnackbar('New session request sent!');
        onClose();
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (typeof currentEvent.service === 'string') {
      const currentService = services.find((serv) => serv._id === currentEvent.service);
      setValue('service', currentService);
    }
  }, [services]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="studentName" label="Your Name" placeholder="Ex: Anne Smith" />

        <RHFTextField
          name="studentEmail"
          label="Email"
          type="email"
          placeholder="example@gmail.com"
        />

        <RHFTextField
          placeholder="Write your inquire here..."
          name="description"
          label="About (optional)"
          multiline
          rows={3}
        />

        <Stack mb={2}>
          <Typography variant="subtitle2">Service</Typography>
          <RHFAutocomplete
            name="service"
            sx={{ mt: 3 }}
            label="Service"
            options={[...coachServices, { title: 'Other', _id: null }]}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.title}
              </li>
            )}
          />
        </Stack>

        <Stack direction="row">
          <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
            Time Selected
          </Typography>

          <TimePicker
            sx={{
              maxWidth: 130,
              [`& .${formHelperTextClasses.root}`]: {
                mx: 0,
                mt: 1,
                textAlign: 'right',
                textDecoration: 'underline',
              },
            }}
            label="Session time"
            value={values.requestedTime}
            onChange={(newValue) => setValue('requestedTime', newValue.format())}
          />
        </Stack>
      </Stack>

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle2">Date Selected</Typography>
          <Typography variant="body2">{dayjs(currentEvent?.start).format('MM-DD-YYYY')}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={dateError}
          >
            Send Request
          </LoadingButton>
        </Box>
      </DialogActions>
    </FormProvider>
  );
}
