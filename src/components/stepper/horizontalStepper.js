import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'src/components/snackbar';
import { MIXPANEL_ACTION, trackMixPanelEvent } from 'src/utils/mixpanel';

import {
  StyledBox,
  StyledStepperWrapper,
  StyledStepper,
  StyledPaper,
  StyledTypography,
  StyledButtonContainer,
  StyledHelpBox,
} from './styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// ----------------------------------------------------------------------

export default function HorizontalLinearStepper({
  stepsContent,
  steps,
  trigger,
  isSubmitting,
  isEditingTimeline,
  isSubmitSuccessful,
}) {
  const {
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [activeStep, setActiveStep] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const extractErrorMessages = (errorObject) => {
    const messages = [];

    const extract = (obj) => {
      if (typeof obj === 'object' && obj !== null) {
        Object.values(obj).forEach((value) => {
          if (value && typeof value === 'object') {
            if (value.message) {
              messages.push(value.message);
            } else {
              extract(value);
            }
          }
        });
      }
    };

    extract(errorObject);
    return messages.join(' ');
  };

  const handleValidate = async () => {
    if (activeStep === 0) {
      await trigger(['category', 'yof', 'speciality'], { shouldFocus: true });
    } else if (activeStep === 1) {
      await trigger('experience', { shouldFocus: true });
    } else if (activeStep === 2) {
      await trigger('interestedIn', { shouldFocus: true });
    }
  };

  const handleNext = async () => {
    trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
      widget_name: 'onboarding_next',
      step: activeStep + 1,
    });
    await handleValidate();
    const hasErrors = Object.keys(errors).length > 0;

    if (!hasErrors) {
      enqueueSnackbar('Added successfully', { variant: 'success' });
      setTimeout(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }, 100);
    } else {
      const errorMessages = extractErrorMessages(errors);
      enqueueSnackbar(errorMessages, { variant: 'error' });
    }
  };

  const handleBack = () => {
    clearErrors(['categories', 'experience', 'interestedIn']);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <StyledBox>
      <StyledStepperWrapper>
        <StyledStepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StyledStepper>
        <StyledPaper>
          <StyledTypography>{stepsContent[activeStep]}</StyledTypography>
        </StyledPaper>
      </StyledStepperWrapper>
      <StyledButtonContainer>
        {!isEditingTimeline && (
          <Grid container spacing={2} justifyContent="flex-end">
            {(activeStep !== 0 || isSubmitSuccessful) && (
              <Grid item xs={12} sm="auto">
                <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }} fullWidth>
                  Back
                </Button>
              </Grid>
            )}
            {activeStep !== steps.length - 1 ? (
              <Grid item xs={12} sm="auto">
                <Button variant="contained" onClick={handleNext} fullWidth>
                  Next
                </Button>
              </Grid>
            ) : (
              <Grid item xs={12} sm="auto">
                <LoadingButton
                  loading={isSubmitting}
                  onMouseEnter={handleValidate}
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isSubmitSuccessful || isSubmitting}
                >
                  {isSubmitting ? 'Loading' : 'Finish'}
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        )}
      </StyledButtonContainer>
      <StyledHelpBox>
        <Typography variant="body2" color="textSecondary">
          If you need help, please send us your inquiry:{' '}
          <Link href="mailto:info.allwyse@gmail.com" color="primary">
            info.allwyse@gmail.com
          </Link>{' '}
          (Contact)
        </Typography>
      </StyledHelpBox>
    </StyledBox>
  );
}

HorizontalLinearStepper.propTypes = {
  stepsContent: PropTypes.array.isRequired,
  steps: PropTypes.array.isRequired,
  trigger: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isEditingTimeline: PropTypes.bool,
  isSubmitSuccessful: PropTypes.bool.isRequired,
};
