import { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Box, Modal, IconButton } from '@mui/material';
import ServicesSuccess from 'src/assets/illustrations/servicesSuccess';
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthContext } from 'src/auth/hooks';
import { googleAuth, checkIfIsAuthorized } from 'src/api/google';
import { useSnackbar } from 'src/components/snackbar';

export function GoogleScopeAuthModal({
  title = 'Log in to google to sync up your calendar',
  label = 'Google authorization is required to sync up your events in Allwyse calendar with google calendar',
}) {
  const [open, setOpen] = useState(false);
  const { currentCoach } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenGoogleAuth = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await googleAuth({ coachId: currentCoach?._id, code: codeResponse.code });
      enqueueSnackbar('Google authorization successful', { variant: 'success' });
      setOpen(false);
    },
    onError: (e) => {
      console.log(e);
    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/calendar.events',
  });

  const checkIfShouldLogIn = useCallback(async () => {
    const { data } = await checkIfIsAuthorized(currentCoach?._id);

    if (data.statusCode === 403) {
      setOpen(true);
    }
  }, [currentCoach?._id]);

  useEffect(() => {
    checkIfShouldLogIn();
  }, []);

  const contentSection = (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ServicesSuccess />
      </Box>

      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Typography variant="body2" align="center" sx={{ mb: 4 }}>
        {label}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenGoogleAuth}
        startIcon={<GoogleIcon />}
        style={{ backgroundColor: '#4285F4', color: '#fff' }}
      >
        Sign in with Google
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: '30%',
          textAlign: 'center',
          position: 'relative', // Ensure position is relative for absolute children
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        {contentSection}
      </Box>
    </Modal>
  );
}
