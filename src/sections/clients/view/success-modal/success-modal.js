import { Typography, Button, Box } from '@mui/material';
import { StyledBox, StyledModalContainer } from './styles';
import SuccessClient from 'src/assets/illustrations/success-client';
import DeleteClient from 'src/assets/illustrations/delete-client';

export function ClientModalConfirm({ open, onClose, editing, deleteModal, ...other }) {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <StyledModalContainer open={open} onClose={handleClose} {...other}>
      <StyledBox>
        <Box sx={{ mb: 3 }}>
          {deleteModal ? <DeleteClient/> : <SuccessClient />}
        </Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {editing ? 'Updated successfully!' : deleteModal ? 'Client deleted correctly!' : 'Client added to your list!'}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 4 }}>
          {editing ? '✅  Your client data updated successfully.' : deleteModal ? '✅  You deleted this client correctly.' : '✅  You added a new client successfully.'}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent:  'flex-end', width: '100%' }}>
          <Button
            variant="outlined"
            onClick={handleClose}
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
