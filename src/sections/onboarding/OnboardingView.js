'use client';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MIXPANEL_ACTION, trackMixPanelEvent } from 'src/utils/mixpanel';
import { notifyError } from 'src/utils/bugsnag';
import { enqueueSnackbar } from 'src/components/snackbar';

import useOnboardingLocalStorage from 'src/components/hook-onboarding-localstorage/useOnboardingLocalStorage';
import { Grid } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { updateCoach } from 'src/api/coach';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider from 'src/components/hook-form';
import { HorizontalLinearStepper } from 'src/components/stepper';
import { StepOne } from './steps/step-one/step-one';
import { StepTwo } from './steps/step-two/step-two';
import { StepThree } from './steps/step-three/step-three';

export default function ModernVerifyView() {
  const { currentCoach, updateUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [cardContent, setCardContent] = useState('');
  const isMdUp = useResponsive('up', 'md');
  const [isEditingTimeline, setIsEditingTimeline] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const VerifySchema = Yup.object().shape({
    category: Yup.string()
      .required('Category is required')
      .test('not-empty', 'Category cannot be empty', (value) => value.trim() !== ''),
    speciality: Yup.string()
      .required('Speciality is required')
      .test('not-empty', 'Speciality cannot be empty', (value) => value.trim() !== ''),
    yof: Yup.number()
      .required('Years of experience is required')
      .min(1, 'Years of experience must be greater than 0')
      .typeError('Years of experience must be a number'),
    experience: Yup.array()
      .of(
        Yup.object().shape({
          expertise: Yup.string()
            .required('Expertise area is required')
            .test('not-empty', 'Expertise cannot be empty', (value) => value.trim() !== ''),
          brand: Yup.string()
            .required('Brand / Company is required')
            .test('not-empty', 'Brand cannot be empty', (value) => value.trim() !== ''),
          year: Yup.number()
            .required('Year is required')
            .positive('Year must be positive')
            .integer('Year must be an integer')
            .min(1950, 'This must be a valid year')
            .max(2050, 'This must be a valid year')
            .typeError('Year must be a number'),
        })
      )
      .min(1, 'At least one experience must be added'),
    interestedIn: Yup.array()
      .of(
        Yup.string()
          .required('Interest area is required')
          .test('not-empty', 'At least one interest must be added', (value) => value.trim() !== '')
      )
      .min(1, 'At least one interest must be added'),
  });

  const defaultValues = {
    category: '',
    speciality: '',
    yof: '',
    experience: [],
    interestedIn: [],
  };

  const { onboardingDataLocalStorage, clearInfoLocalStorage, saveInfoLocalStorage } =
    useOnboardingLocalStorage(defaultValues, currentCoach?._id);

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = methods;

  useEffect(() => {
    Object.keys(onboardingDataLocalStorage || {}).forEach((field) => {
      if (onboardingDataLocalStorage[field]) {
        setValue(field, onboardingDataLocalStorage[field]);
      }
    });
  }, [onboardingDataLocalStorage, setValue]);

  const getTimeZone = () => {
    if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function') {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } else {
      return '';
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
        widget_name: 'onboarding_next',
        step: 'submitted',
      });

      setIsLoading(true);
      const updatedCoach = await updateCoach(
        { ...data, onBoarded: true, timeZone: getTimeZone() },
        currentCoach?._id
      );
      updateUser(updatedCoach.data);
      clearInfoLocalStorage();
      router.push(paths.profile.root);
      setIsSubmitSuccessful(true);
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar('Something went wrong, please try again !', { variant: 'error' });

      notifyError(error, {
        context: 'finish-onboarding',
        user: currentCoach.email,
      });
      setIsLoading(false);
    }
  });
  useEffect(() => {
    if (currentCoach?.onBoarded) {
      router.push(paths.profile.root);
    }
  }, [currentCoach, router]);
  const steps = ['Category', 'Timeline', 'Set & Join'];

  return (
    <Grid container sx={{ height: '100vh' }}>
      {isMdUp && (
        <Grid
          item
          xs={4}
          sx={{
            position: 'relative',
            background: `url('https://i.ibb.co/4tJSC6W/background.png') no-repeat center center`,
            backgroundSize: 'cover',
          }}
        >
          {cardContent}
        </Grid>
      )}
      <Grid
        item
        xs={isMdUp ? 8 : 12}
        sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <HorizontalLinearStepper
            isSubmitting={isLoading}
            isSubmitSuccessful={isSubmitSuccessful}
            errors={errors}
            trigger={trigger}
            steps={steps}
            isEditingTimeline={isEditingTimeline}
            stepsContent={[
              <StepOne
                errors={errors}
                saveInfoLocalStorage={saveInfoLocalStorage}
                setCardContent={setCardContent}
                currentCoach={currentCoach}
              />,
              <StepTwo
                errors={errors}
                setIsEditingTimeline={setIsEditingTimeline}
                saveInfoLocalStorage={saveInfoLocalStorage}
                setCardContent={setCardContent}
                savedTimeline={onboardingDataLocalStorage.experience}
              />,
              <StepThree
                errors={errors}
                saveInfoLocalStorage={saveInfoLocalStorage}
                setCardContent={setCardContent}
              />,
            ]}
          />
        </FormProvider>
      </Grid>
    </Grid>
  );
}
