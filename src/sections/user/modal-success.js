import { Typography, Button, Box, Modal } from '@mui/material';
import { useEffect } from 'react';
import ServicesSuccess from 'src/assets/illustrations/servicesSuccess';
import { useRouter } from 'src/routes/hooks';

export function ServiceModalConfirm({ open, onClose, resourceId, ...other }) {
  const router = useRouter();
  const handleClose = () => {
    onClose();
  };

  useEffect(
    () => {
      if (open) {
        setTimeout(() => {
          router.push(`/services/${resourceId}`);
        }, 3000);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );

  const contentSessionConfirm = (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ServicesSuccess />
      </Box>

      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Service created successfully
      </Typography>

      <Typography variant="body2" align="center" sx={{ mb: 2 }}>
        ✅ Congratulations, you’ve created a service.
      </Typography>

      <Typography
        onClick={() => {
          router.push(`/services/${resourceId}`);
        }}
        variant="body2"
        align="center"
        sx={{ mb: 4, cursor: 'pointer', color: 'primary.main' }}
      >
        You are being redirected to your service
      </Typography>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      {...other}
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
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {contentSessionConfirm}

        <Box sx={{ display: 'flex', justifyContent: 'right', mt: 3 }}>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
