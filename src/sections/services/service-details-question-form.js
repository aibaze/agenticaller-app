import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import FormProvider from 'src/components/hook-form';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';

import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { DialogActions } from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendRequest } from 'src/api/requests';
import { useSnackbar } from 'src/components/snackbar';
import SuccessClient from 'src/assets/illustrations/success-client';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';

const QuestionForm = ({ setOpenQuestionForm, openQuestionForm, service }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    message: yup.string().required('Write a message'),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
      widget_name: 'service_actions',
      actions: 'create_question',
    });
    try {
      const body = {
        ...data,
        priority: 'QUESTION',
        type: 'SERVICE',
        coachId: service.coachId,
        serviceId: service._id,
      };
      await sendRequest(body);
      enqueueSnackbar('Sent Question successfully!', { variant: 'success' });
      setIsSubmitSuccess(true);
    } catch (e) {
      enqueueSnackbar(error?.message || 'Error', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  });

  const onCloseQuestionForm = useCallback(() => {
    setOpenQuestionForm(false);
    setIsSubmitSuccess(false);
  }, []);

  useEffect(() => {
    reset();
  }, [openQuestionForm]);

  const renderQuestionForm = (
    <>
      <DialogTitle sx={{ minHeight: 76 }}>Contact Details</DialogTitle>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField placeholder="Ex: Jorge Smith..." name="name" label="Name" />
        <RHFTextField placeholder="example@gmail.com" name="email" label="Email" />

        <RHFTextField
          placeholder="Write your inquire here..."
          name="message"
          label="About"
          multiline
          rows={3}
        />
      </Stack>
      <DialogActions>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            gap: 3,
          }}
        >
          <Stack direction="row" gap={4} justifyContent="flex-end">
            <Button variant="outlined" color="inherit" onClick={onCloseQuestionForm}>
              Back
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Send Question
            </LoadingButton>
          </Stack>
        </Box>
      </DialogActions>
    </>
  );

  const renderQuestionSuccess = (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '420px',
        textAlign: 'center',
        padding: theme.spacing(3),
      })}
    >
      <Box sx={{ mb: (theme) => theme.spacing(3) }}>{<SuccessClient />}</Box>

      <Typography variant="h4" sx={{ mb: (theme) => theme.spacing(2) }}>
        Question sent!
      </Typography>

      <Typography variant="subtitle2" sx={{ mb: (theme) => theme.spacing(4) }}>
        ✅ You sent a new question successfully.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="outlined"
          onClick={onCloseQuestionForm}
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

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openQuestionForm}
        onClose={onCloseQuestionForm}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
      >
        {isSubmitSuccess ? renderQuestionSuccess : renderQuestionForm}
      </Dialog>
    </FormProvider>
  );
};

export default QuestionForm;
