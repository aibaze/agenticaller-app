import React, { useState, useEffect } from 'react';
import { Modal, Box, Stack, Grid, TextField, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
  height: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  gap: 2,
};

const HistoryModal = ({ open, handleClose, initialData, onSave }) => {
  const { currentCoach, updateUser } = useAuthContext();
  const [timeline, setTimeline] = useState([]);
  const [showTimeline, setShowTimeline] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [expertise, setExpertise] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTimeline(initialData);
    }
  }, [initialData]);

  
  const validateForm = () => {
    const errors = {};
    if (!expertise) {
      errors.expertise = 'Expertise area is required';
    }
    if (!brand) {
      errors.brand = 'Brand/Company is required';
    }
    if (!year || isNaN(year)) {
      errors.year = 'Valid year is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return; // Prevent saving if validation fails

    const newData = { id: editingId || Date.now(), expertise, brand, year };
    const experience
    = editingId
      ? timeline.map(item => (item.id === editingId ? newData : item))
      : [...timeline, newData];

      const updatedCoach = await updateCoach(
        {
          experience,
        },
        currentCoach?._id,
        currentCoach.token
      );(experience);

    if (updateUser) {
      updateUser(updatedCoach.data);
    }
    setShowTimeline(true);
    resetForm();
  };

  const deleteItem = (id) => {
    const filteredTimeline = timeline.filter(item => item.id !== id);
    setTimeline(filteredTimeline);
    onSave(filteredTimeline);
  };

  const resetForm = () => {
    setEditingId(null);
    setExpertise('');
    setBrand('');
    setYear('');
    setFormErrors({});
  };

  const TimeLine = () => (
    <>
      <Typography variant="h6">Add your professional experience!</Typography>
      {timeline.sort((a, b) => b.year - a.year).map((timeEvent) => (
        <Box key={timeEvent.id} sx={{ border: '1px solid', borderRadius: 2, p: 2, mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2">Expertise area</Typography>
              <Typography variant="body2">{timeEvent.expertise}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2">Brand/Company</Typography>
              <Typography variant="body2">{timeEvent.brand}</Typography>
            </Grid>
            <Grid item xs={4} md={2}>
              <Typography variant="subtitle2">Year</Typography>
              <Typography variant="body2">{timeEvent.year}</Typography>
            </Grid>
            <Grid item xs={4} md={2}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => {
                  setShowTimeline(false);
                  setEditingId(timeEvent.id);
                  setExpertise(timeEvent.expertise);
                  setBrand(timeEvent.brand);
                  setYear(timeEvent.year);
                }}
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={4} md={2}>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => deleteItem(timeEvent.id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Typography
        variant="h6"
        onClick={() => setShowTimeline(false)}
        sx={{ cursor: 'pointer', mt: 2 }}
      >
        + Add other experience
      </Typography>
    </>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack spacing={3}>
          {showTimeline ? (
            <TimeLine />
          ) : (
            <>
              <Typography variant="h6">
                {editingId ? 'Edit your professional timeline' : 'Add your professional timeline'}
              </Typography>
              <TextField
                id="expertise-area"
                label="Expertise area"
                variant="outlined"
                fullWidth
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                error={!!formErrors.expertise}
                helperText={formErrors.expertise}
              />
              <TextField
                id="brand-company"
                label="Brand / Company"
                variant="outlined"
                fullWidth
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                error={!!formErrors.brand}
                helperText={formErrors.brand}
              />
              <TextField
                id="year"
                label="Year"
                variant="outlined"
                type="number"
                fullWidth
                value={year}
                onChange={(e) => setYear(e.target.value)}
                error={!!formErrors.year}
                helperText={formErrors.year}
              />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setShowTimeline(true);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default HistoryModal;
