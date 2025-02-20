import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useResponsive } from 'src/hooks/use-responsive';
import { updateCoach } from 'src/api/coach';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/auth/hooks';
import { useTheme } from '@mui/material/styles';

const DescriptionModal = ({ open, handleClose, initialData = {} }) => {
  const { currentCoach, updateUser } = useAuthContext();
  const smDown = useResponsive('down', 'sm');
  const theme = useTheme();

  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    location: initialData.profileInfo?.location || '',
    category: initialData.profileInfo?.category || '',
    education: initialData.profileInfo?.education || '',
    brandName: initialData.profileInfo?.brandName || '',
    brandRole: initialData.profileInfo?.brandRole || '',
    shouldShowBrand: initialData.profileInfo?.shouldShowBrand || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name.includes('.') ? name.split('.')[1] : name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveClick = async () => {
    const updatedCoach = await updateCoach(
      {
        ...formData,
      },
      currentCoach?._id,
      currentCoach.token
    );
    if (updateUser) {
      updateUser(updatedCoach.data);
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: smDown ? '95%' : '750px',
          height: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography id="modal-title" variant="h4" sx={{ mb: 3 }}>
          Edit your profile
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ overflowY: 'auto', pr: 1, mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            *The asterisk indicates that the field is required
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Basic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Main Category
          </Typography>
          <TextField
            label="Professional Label"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Education
          </Typography>
          <TextField
            label="Professional Institution*"
            name="education"
            value={formData.education}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Brand Label
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                label="Brand Name"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Your Role"
                name="brandRole"
                value={formData.brandRole}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.shouldShowBrand}
                onChange={handleChange}
                name="shouldShowBrand"
              />
            }
            label="Show your brand on your profile-services"
          />

          <Typography variant="h6" component="h6" sx={{ mb: 3 }}>
            Contact info
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography
              component="a"
              href={`${window.location.protocol}//${window.location.host}/info/${initialData.slug}`}
              target="_blank"
              sx={{
                textDecoration: 'none',
                color: theme.palette.mode == 'light' ? 'secondary.main' : 'primary.main',
              }}
            >
              {`${window.location.protocol}//${window.location.host}/info/${initialData.slug}`}
            </Typography>
            <IconButton
              href={`${window.location.protocol}//${window.location.host}/info/${initialData.slug}`}
              target="_blank"
            >
              <OpenInNewIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" component="p" sx={{ mb: 2, color: 'text.secondary' }}>
            *Copy and paste to share your profile
          </Typography>

          <Box display="flex" alignItems="center">
            <Typography
              component="a"
              href={`${window.location.protocol}//${window.location.host}/info/${initialData.slug}/services`}
              target="_blank"
              sx={{
                textDecoration: 'none',
                color: theme.palette.mode == 'light' ? 'secondary.main' : 'primary.main',
              }}
            >
              {`${window.location.protocol}//${window.location.host}/info/${initialData.slug}/services`}
            </Typography>
            <IconButton
              href={`${window.location.protocol}//${window.location.host}/info/${initialData.slug}/services`}
              target="_blank"
            >
              <OpenInNewIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" component="p" sx={{ mb: 3, color: 'text.secondary' }}>
            *Copy and paste to share your services
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.light,
              borderRadius: '20px',
              width: smDown ? '100%' : 'auto',
            }}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

DescriptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
export default DescriptionModal;
