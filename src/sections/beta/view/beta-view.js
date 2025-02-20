'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import Logo from 'src/components/logo';
import { createLead } from 'src/api/lead';
import * as Yup from 'yup';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppFooter from '../footer';
import Modal from '@mui/material/Modal';

const RenderForm = ({ isLoading, onSubmit, hasSubmitted, errorMessage }) => (
  <>
    <RHFTextField
      name="email"
      placeholder="Your email"
      label="Your email"
      variant="outlined"
      color="success"
      InputProps={{
        className: { color: '#000' },
      }}
      sx={{ mb: 2 }}
    />

    <RHFTextField
      name="name"
      placeholder="Your name"
      label="Your name"
      variant="outlined"
      color="success"
      sx={{ mb: 2 }}
      InputProps={{
        className: { color: '#000' },
      }}
    />

    <RHFTextField
      name="specialty"
      placeholder="Your specialty (Optional)"
      label="Your specialty (Optional)"
      variant="outlined"
      color="success"
      sx={{ mb: 2 }}
      InputProps={{
        className: { color: '#000' },
      }}
    />

    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <LoadingButton
        loading={isLoading}
        onClick={onSubmit}
        disabled={hasSubmitted}
        color="primary"
        variant="contained"
      >
        {!hasSubmitted ? 'Sign me up' : 'Check your inbox'}
      </LoadingButton>

      <Typography
        variant="caption"
        color="error.main"
        align="center"
        sx={{ mt: 1 }}
        marked="center"
      >
        {errorMessage}
      </Typography>
      <Typography variant="caption" color="primary" align="center" sx={{ mt: 1 }} marked="center">
        By clicking this you are accepting the terms
      </Typography>
    </Box>
  </>
);

function BetaView() {
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const leadSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().email('Must be a valid email').required('Email required'),
    specialty: Yup.string(),
  });

  const defaultValues = React.useMemo(
    () => ({
      name: '',
      email: '',
      specialty: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(leadSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage('');

    try {
      setIsLoading(true);
      await createLead(data);
      setIsLoading(false);
      setOpen(true);
      setHasSubmitted(true);
      reset();

      setTimeout(() => {
        setOpenModal(false);
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error?.message || '');

      console.error(error);
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Logo />
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Book a demo
        </Button>
      </Grid>
      <Grid
        xs={12}
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          color="inherit"
          align="center"
          sx={{ mb: 5 }}
          variant="subtitle"
          marked="center"
        >
          Allwyse is honored to have you
        </Typography>
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Join our list and discover your best workflow version and spark the revolution of
          productivity
        </Typography>
      </Grid>

      <Container component="section" sx={{ display: 'flex' }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { md: 'flex', alignItems: 'center' }, position: 'relative' }}
          >
            <Box
              sx={{
                width: '100%',
              }}
            />
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1470472304068-4398a9daab00?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="call to action"
              sx={{
                width: '100%',
                maxHeight: 400,
                ml: 3,
                maxWidth: 600,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'primary',
                py: 8,
                px: 3,
              }}
            >
              <Box
                sx={{
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '10px',
                  border: '1px solid #00A76F',
                  maxWidth: 400,
                  minWidth: 400,
                  padding: 0,
                  //  background: 'white',
                }}
                component="form"
                onSubmit={handleSubmit}
              >
                <Box
                  sx={{
                    background: '#00A76F',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    padding: 2,
                  }}
                >
                  <Typography variant="h3" component="h3" gutterBottom>
                    Test our beta
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ mt: 1 }}
                  color="primary"
                  marked="center"
                >
                  Help us find out our market fit.
                </Typography>

                <FormProvider methods={methods} onSubmit={onSubmit}>
                  <Grid sx={{ padding: 2 }}>
                    <RenderForm
                      isLoading={isLoading}
                      onSubmit={onSubmit}
                      errorMessage={errorMessage}
                      hasSubmitted={hasSubmitted}
                    />
                    <Modal
                      open={openModal}
                      onClose={() => {
                        setOpenModal(false);
                      }}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 500,
                          bgcolor: 'background.paper',
                          border: '2px solid #000',
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom>
                          Fill the form to get access to our beta
                        </Typography>
                        <RenderForm
                          errorMessage={errorMessage}
                          isLoading={isLoading}
                          onSubmit={onSubmit}
                          hasSubmitted={hasSubmitted}
                        />
                      </Box>
                    </Modal>
                  </Grid>
                </FormProvider>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          closeFunc={handleClose}
          message="Check your inbox for beta access instructions."
        />
      </Container>
      <AppFooter />
    </>
  );
}

export default BetaView;
