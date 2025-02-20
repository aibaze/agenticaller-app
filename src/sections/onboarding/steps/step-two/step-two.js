import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, TextField, Grid, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { RenderInfo } from '../render-info';
import { StyledPaper, StyledButton } from './styles';
import { useSnackbar } from 'src/components/snackbar';
import UserStoryTime from 'src/sections/storytime/user-storytime';
import { useTheme } from '@mui/material';

export const StepTwo = ({ saveInfoLocalStorage, setCardContent, savedTimeline, setIsEditingTimeline }) => {
  const { setValue,clearErrors, formState: { errors: formErrors } } = useFormContext();
  const [timeline, setTimeline] = useState(savedTimeline);
  const [showTimeline, setShowTimeline] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [expertise, setExpertise] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    setTimeline(savedTimeline);
    setShowTimeline(savedTimeline.length > 0);
  }, [savedTimeline]);

  useEffect(() => {
    setIsEditingTimeline(!showTimeline);
  }, [showTimeline]);

  const saveTimeline = (updatedTimeline) => {
    setValue('experience', updatedTimeline, { shouldValidate: true });
    saveInfoLocalStorage({ experience: updatedTimeline });
  };

  const deleteItem = (id) => {
    const filteredTimeline = timeline.filter(item => item.id !== id);
    setTimeline(filteredTimeline);
    saveTimeline(filteredTimeline);
  };

  const handleSave = async () => {
    const errors = {};
    if (!expertise) errors.expertise = 'Expertise area is required';
    if (!brand) errors.brand = 'Brand / Company is required';
    if (!year || year < 1950 || year > 2200) errors.year = 'Year must be a valid year';

    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key) => {
        enqueueSnackbar(errors[key], { variant: 'error' });
      });
      return;
    }

    if (editingId) {
      const updatedTimeline = timeline.map(item =>
        item.id === editingId ? { ...item, expertise, brand, year } : item
      );
      saveTimeline(updatedTimeline);
      setTimeline(updatedTimeline);
    } else {
      const newTimelineItem = { id: Date.now(), expertise, brand, year };
      setTimeline([...timeline, newTimelineItem]);
      saveTimeline([...timeline, newTimelineItem]);
    }
    clearErrors(['categories', 'experience', 'interestedIn']);
    setShowTimeline(true);
    setEditingId(null);
    setExpertise('');
    setBrand('');
    setYear('');
  };

  useEffect(() => {
    const styledCard = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: 400,
      padding: theme.spacing(2),
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.common.white,
    }
    setCardContent(
      //sort the timeline in years
      <UserStoryTime history={timeline.sort((a, b) => b.year - a.year)} customStyle={{color: 'black', ...styledCard}}></UserStoryTime>
    );
  }, [timeline, setCardContent]);

  const TimeLine = () => (
    <>
      <RenderInfo title="Add your professional experience!" />
      {timeline.sort((a, b) => b.year - a.year).map((timeEvent, index) => (
        <StyledPaper key={index} variant="outlined">
          <Grid container direction="row" spacing={1}>
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
            <Grid item xs={4} md={2} container justifyContent="center">
              <StyledButton
                variant="outlined"
                color="inherit"
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
              </StyledButton>
            </Grid>
            <Grid item xs={4} md={2} container justifyContent="center">
              <StyledButton
                variant="outlined"
                color="inherit"
                startIcon={<DeleteIcon />}
                onClick={() => deleteItem(timeEvent.id)}
              >
                Delete
              </StyledButton>
            </Grid>
          </Grid>
        </StyledPaper>
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
    <Stack spacing={3}>
      {showTimeline ? (
        <TimeLine />
      ) : (
        <>
          <RenderInfo title={editingId ? "Edit your professional timeline" : "Add your professional timeline"} />
          <TextField
            id="expertise-area"
            label="Expertise area"
            variant="outlined"
            fullWidth
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            error={!!formErrors.experience?.[0]?.expertise}
            helperText={formErrors.experience?.[0]?.expertise?.message}
          />
          <TextField
            id="brand-company"
            label="Brand / Company"
            variant="outlined"
            fullWidth
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            error={!!formErrors.experience?.[0]?.brand}
            helperText={formErrors.experience?.[0]?.brand?.message}
          />
          <TextField
            id="year"
            label="Year"
            variant="outlined"
            type="number"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
            error={!!formErrors.experience?.[0]?.year}
            helperText={formErrors.experience?.[0]?.year?.message}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setShowTimeline(true);
                  setEditingId(null);
                  setExpertise('');
                  setBrand('');
                  setYear('');
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  );
};
