import { Typography, Button, Box, Grid, Divider } from '@mui/material';
import { StyledBox, StyledModalContainer } from './styles';
import { useTheme } from '@mui/material';

export function PaymentModal({ open, onClose, operation = {}, client, ...other }) {
  const theme = useTheme();

  return (
    <StyledModalContainer open={open} onClose={onClose} {...other}>
      <StyledBox>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {operation.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 4 }}>
          {operation.description}
        </Typography>

        <Typography variant="title" sx={{ mb: 4 }}>
          {client.fullName} unpaid services
        </Typography>

        <Grid sx={{ mt: 5, mb: 5 }}>
          {client.unpaidServices.map((unpaidServiceId) => {
            const service = client.servicesDetails.find((item) => item._id === unpaidServiceId);
            return (
              <Box
                key={service._id}
                sx={{
                  border: `1px solid ${theme.palette.error.main}`,
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 1,
                }}
              >
                <Typography variant="subtitle2">{service.title}</Typography>
                <Divider orientation="vertical" sx={{ width: '1px' }} />
                <Button
                  onClick={() => {
                    if (operation.type == 'REQUEST_PAYMENT') {
                      return operation.onConfirm(service.title);
                    }
                    operation.onConfirm(service._id, 'pull');
                  }}
                >
                  <Typography variant="subtitle2">{operation.cta}</Typography>
                </Button>
              </Box>
            );
          })}
        </Grid>

        <Typography variant="title" sx={{ mb: 4 }}>
          {client.fullName} up to date services
        </Typography>

        <Grid sx={{ mt: 5 }}>
          {client.servicesDetails.map((service) => {
            const isUnpaid = client.unpaidServices.includes(service._id);
            if (isUnpaid) {
              return <></>;
            }

            return (
              <Box
                key={service._id}
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 1,
                }}
              >
                <Typography variant="subtitle2">{service.title}</Typography>
                <Button
                  disabled={operation.type == 'REQUEST_PAYMENT'}
                  onClick={() => {
                    operation.onConfirm(service._id, 'push');
                  }}
                >
                  <Typography variant="subtitle2">{operation.cta}</Typography>
                </Button>
              </Box>
            );
          })}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 5 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: '50px',
            }}
          >
            Close
          </Button>
        </Box>
      </StyledBox>
    </StyledModalContainer>
  );
}
