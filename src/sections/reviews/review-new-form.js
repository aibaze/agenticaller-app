import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormHelperText from '@mui/material/FormHelperText';
import { useSnackbar } from 'src/components/snackbar';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { sendReview } from 'src/api/reviews';

// ----------------------------------------------------------------------

export default function ProductReviewNewForm({ entity, onClose, entityId, setReviews, ...other }) {
  const { enqueueSnackbar } = useSnackbar();

  const ReviewSchema = Yup.object().shape({
    ratingNumber: Yup.number().min(1, 'Rating must be greater than or equal to 1'),
    content: Yup.string().required('Review is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    ratingNumber: 0,
    content: '',
    name: '',
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = { newReview: { ...data, postedDate: new Date().toISOString() } };
      const response = await sendReview(entity, entityId, body);
      setReviews(response?.data?.reviews);
      enqueueSnackbar('Sent Review successfully!', { variant: 'success' });
      reset();
      onClose();
    } catch (error) {
      enqueueSnackbar(error?.message || 'Error', { variant: 'error' });
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle> Add Review </DialogTitle>

        <DialogContent>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Typography variant="body2">Your review about this product:</Typography>

            <Controller
              name="ratingNumber"
              control={control}
              render={({ field }) => (
                <Rating
                  {...field}
                  size="small"
                  value={Number(field.value)}
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                  }}
                />
              )}
            />
          </Stack>

          {!!errors.ratingNumber && (
            <FormHelperText error> {errors.ratingNumber?.message}</FormHelperText>
          )}

          <RHFTextField name="content" label="Review *" multiline rows={3} sx={{ mt: 3 }} />

          <RHFTextField name="name" label="Name *" sx={{ mt: 3 }} />

          <RHFTextField name="email" label="Email *" sx={{ mt: 3 }} />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ProductReviewNewForm.propTypes = {
  onClose: PropTypes.func,
};
