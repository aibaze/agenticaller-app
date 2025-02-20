import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, Autocomplete, Typography, Stack, Box } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import Image from 'next/image';
import { RenderInfo } from '../render-info';
import { StyledCard, StyledTextField, StyledIconButton, StyledChip } from './styles';
import CardContent from '@mui/material/CardContent';

const types = [
  { category: 'Results Coach', yof: '', speciality: ['Results coaching', 'Achievers mindset'] },
  {
    category: 'Life Coach',
    yof: '',
    speciality: ['Life coaching', 'Personal development', 'Work-life balance'],
  },
  {
    category: 'Psychologist',
    yof: '',
    speciality: ['Cognitive-behavioral therapy', 'Stress management', 'Emotional disorders'],
  },
  {
    category: 'Career Coach',
    yof: '',
    speciality: ['Career planning', 'Job interview preparation', 'Leadership development'],
  },
  {
    category: 'Health Coach',
    yof: '',
    speciality: ['Nutrition guidance', 'Exercise planning', 'Habit building'],
  },
  {
    category: 'Business Coach',
    yof: '',
    speciality: ['Entrepreneurship', 'Scaling businesses', 'Strategic planning'],
  },
  {
    category: 'Relationship Coach',
    yof: '',
    speciality: ['Conflict resolution', 'Communication improvement', 'Dating strategies'],
  },
  {
    category: 'Spiritual Coach',
    yof: '',
    speciality: ['Mindfulness practices', 'Life purpose discovery', 'Meditation techniques'],
  },
  {
    category: 'Executive Coach',
    yof: '',
    speciality: ['C-level leadership', 'Decision-making skills', 'Team management'],
  },
  {
    category: 'Performance Coach',
    yof: '',
    speciality: ['Peak performance', 'Motivation techniques', 'Focus and productivity'],
  },
  {
    category: 'Financial Coach',
    yof: '',
    speciality: ['Budgeting', 'Wealth building', 'Debt management'],
  },
];

export const StepOne = ({ errors, saveInfoLocalStorage, setCardContent, currentCoach }) => {
  const { setValue, watch } = useFormContext();

  const category = watch('category') || '';
  const speciality = watch('speciality') || [];
  const yof = watch('yof') || 0;

  const [categoryOptions, setCategoryOptions] = useState(types);
  const [specialityOptions, setSpecialityOptions] = useState([]);

  useEffect(() => {
    if (category) {
      const selectedCategory = types.find((type) => type.category === category);
      setSpecialityOptions(selectedCategory?.speciality || []);
    } else {
      setSpecialityOptions([]);
    }
  }, [category]);

  useEffect(() => {
    setCardContent(
      <StyledCard>
        <CardContent>
          <Stack direction="row" spacing={4} alignItems="center">
            <Image src="/assets/icons/auth/ic_user.png" width={80} height={80} alt="Profile pic" />
            <Box>
              <Typography variant="h5" sx={{ color: 'black' }}>
                {currentCoach.firstName}{' '}
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  {currentCoach.lastName}
                  <Box
                    component="span"
                    sx={{ display: 'inline-flex', verticalAlign: 'middle', ml: 0.5 }}
                  >
                    <Image
                      src="/assets/icons/auth/ic_verified.svg"
                      width={15}
                      height={15}
                      alt="verified tick"
                    />
                  </Box>
                </Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {speciality}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </StyledCard>
    );
  }, [currentCoach, category, speciality, setCardContent]);

  const handleCategoryChange = (event, newValue) => {
    const selectedCategory =
      typeof newValue === 'string'
        ? { category: newValue, speciality: [], yof: '' }
        : newValue || { category: '', speciality: [], yof: '' };
    setValue('category', selectedCategory.category, { shouldValidate: false });
    setSpecialityOptions(selectedCategory.speciality || []);
    saveInfoLocalStorage({ category: selectedCategory.category });
  };

  const handleSpecialityChange = (event, newValue) => {
    setValue('speciality', newValue, { shouldValidate: false });
    saveInfoLocalStorage({ speciality: newValue });
  };

  const handleIncreaseYof = () => {
    const newYof = (parseInt(yof, 10) || 0) + 1;
    setValue('yof', newYof, { shouldValidate: false });
    saveInfoLocalStorage({ yof: newYof });
  };

  const handleDecreaseYof = () => {
    const newYof = (parseInt(yof, 10) || 0) - 1;
    if (newYof >= 0) {
      setValue('yof', newYof, { shouldValidate: true });
      saveInfoLocalStorage({ yof: newYof });
    }
  };

  return (
    <>
      <RenderInfo title="What is your area of expertise?" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            freeSolo
            value={categoryOptions.find((opt) => opt.category === category) || { category }}
            options={categoryOptions}
            getOptionLabel={(option) => option.category || ''}
            onChange={handleCategoryChange}
            onInputChange={(event, newInputValue) => {
              if (event?.type === 'change') {
                handleCategoryChange(event, newInputValue);
              }
            }}
            renderInput={(params) => <StyledTextField {...params} label="Professional category" />}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            freeSolo
            value={speciality}
            options={specialityOptions}
            getOptionLabel={(option) => option}
            onChange={handleSpecialityChange}
            onInputChange={(event, newInputValue) => {
              if (event?.type === 'change') {
                handleSpecialityChange(event, newInputValue);
              }
            }}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                label="Speciality"
                placeholder={`Select your speciality within ${category}`}
              />
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <StyledChip {...getTagProps({ index })} key={option} label={option} size="small" />
              ))
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          disabled
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Grid container alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <StyledIconButton onClick={handleDecreaseYof}>
                    <RemoveIcon />
                  </StyledIconButton>
                </Grid>
                <Grid item>{yof || 0}</Grid>
                <Grid item>
                  <StyledIconButton onClick={handleIncreaseYof}>
                    <AddIcon />
                  </StyledIconButton>
                </Grid>
              </Grid>
            ),
            onClick: (event) => event.preventDefault(),
          }}
          label="Years of experience"
        />
      </Grid>
    </>
  );
};
