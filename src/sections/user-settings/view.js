'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useAuthContext } from 'src/auth/hooks';
import { updateUser } from 'src/api/agenticaller/user';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function OneView() {
  const { currentCoach: currentUser } = useAuthContext();
  console.log(currentUser);
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: currentUser?.email || '',
    name: currentUser?.name || '',
    vapiKey: currentUser?.vapiKey || '',
    vapiOrgId: currentUser?.vapiOrgId || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateUser(currentUser._id, formData);
      enqueueSnackbar('Settings updated successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error updating user:', error);
      enqueueSnackbar(error.response?.data?.message || 'Failed to update settings', { 
        variant: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}> User Settings </Typography>

      <Paper elevation={3}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

        

            <TextField
              fullWidth
              label="VAPI Key"
              name="vapiKey"
              type="password"
              value={formData.vapiKey}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="VAPI Organization ID"
              name="vapiOrgId"
              value={formData.vapiOrgId}
              onChange={handleChange}
              required
            />

            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
