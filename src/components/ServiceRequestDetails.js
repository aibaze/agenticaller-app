import React from 'react';
import { useAuthContext } from 'src/auth/hooks';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';

const ServiceRequestDetails = ({ service, action, request }) => {
  const { currentCoach } = useAuthContext();
  if (action === 'BOOK') {
    return (
      <Stack spacing={3} sx={{ px: 3, mt: 2, gap: '12px' }}>
        <Divider />
        <Typography variant="caption" sx={{ color: 'grey', display: 'flex', alignItems: 'center' }}>
          By clicking on "Send Book Request" :
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey', display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 1 }} fontSize="small" />
          You will send a request to {currentCoach.firstName} {currentCoach.lastName} to book{' '}
          {service.sessionPeriodicity === 'one-time'
            ? 'this session once'
            : `this session on a ${service.sessionPeriodicity} basis`}{' '}
          {service.sessionAmount && `for ${service.sessionAmount} sessions`}
          {service.endDate && `until ${dayjs(service.endDate).format('DD MMM YYYY')}`}
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey', display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 1 }} fontSize="small" />
          {service.sessionPeriodicity === 'one-time' ? 'This session' : 'These sessions'} will last{' '}
          {service.sessionDuration === 'Custom'
            ? service.customSessionMinutes
            : service.sessionDuration}{' '}
          minutes
        </Typography>
        <Divider />
      </Stack>
    );
  }

  if (action === 'CONFIRM') {
    return (
      <Stack spacing={3} sx={{ mt: 2, gap: '12px', mb: 2 }}>
        <Divider />
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
          By clicking on "Confirm session" :
        </Typography>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 1 }} fontSize="small" />
          You will create a{' '}
          {service.sessionPeriodicity === 'one-time' ? 'single' : service.sessionPeriodicity}{' '}
          session for {request.name}{' '}
          {Boolean(service.sessionAmount) && `across ${service.sessionAmount} sessions`}
          {Boolean(service.endDate) && `until ${dayjs(service.endDate).format('DD MMM YYYY')}`}{' '}
          <br />
          {service.sessionPeriodicity === 'one-time' ? 'This session' : 'These sessions'} will be
          scheduled in both your Google Calendar and the client's calendar for seamless
          coordination.
        </Typography>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 1 }} fontSize="small" />
          {service.sessionPeriodicity === 'one-time' ? 'This session' : 'These sessions'} will last{' '}
          {service.sessionDuration === 'Custom'
            ? service.customSessionMinutes
            : service.sessionDuration}{' '}
          minutes.
        </Typography>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 1 }} fontSize="small" />
          If {request.name} is not in your client list, they will be added.
        </Typography>
        <Divider />
      </Stack>
    );
  }

  return <></>;
};

export default ServiceRequestDetails;
