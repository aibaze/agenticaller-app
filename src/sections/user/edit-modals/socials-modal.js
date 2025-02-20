import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, InputAdornment, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { updateCoach } from 'src/api/coach';
import { useAuthContext } from 'src/auth/hooks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',
    sm: '80%',
    md: '60%',
    lg: '50%',
    xl: '40%',
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  gap: 2,
};

const SocialsModal = ({ open, handleClose, initialData }) => {
  const { currentCoach, updateUser } = useAuthContext();
  const [editData, setEditData] = useState({
    instagram: '',
    linkedin: '',
    twitter: '',
    facebook: '',
  });

  useEffect(() => {
    if (initialData) {
      const data = initialData.reduce((acc, item) => {
        acc[item.label.toLowerCase()] = item.url;
        return acc;
      }, {});
      setEditData(data);
    }
  }, [initialData]);

  const handleSave = async () => {
    const socialLinks = Object.keys(editData).map((key) => ({
      url: editData[key],
      label: key,
    }));

    const updatedCoach = await updateCoach(
      {
        socialLinks,
      },
      currentCoach?._id,
      currentCoach.token
    );

    if (updateUser) {
      updateUser(updatedCoach.data);
    }
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Edit your Social Media Links
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" component="p" sx={{ mb: 3, color: 'text.secondary' }}>
          * Paste each link to display on your profile
        </Typography>
        <TextField
          label="Instagram"
          name="instagram"
          value={editData.instagram}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InstagramIcon sx={{ color: '#E02D69' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="LinkedIn"
          name="linkedin"
          value={editData.linkedin}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkedInIcon sx={{ color: '#007EBB' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Twitter"
          name="twitter"
          value={editData.twitter}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TwitterIcon sx={{ color: '#00AAEC' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Facebook"
          name="facebook"
          value={editData.facebook}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FacebookIcon sx={{ color: '#1877F2' }} />
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" sx={{ borderRadius: '20px' }} onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SocialsModal;
