'use client';

import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';
import {
  StyledContainer,
  StyledStack,
  StyledTypography,
  StyledTextField,
  StyledSeoIllustration,
} from './styles';
import { RenderInfo } from '../render-info';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { useResponsive } from 'src/hooks/use-responsive';

const chipList = [
  'Calendar Sync',
  'Custom Reports',
  'Google Meet Integration',
  'Client Data Manager',
  'Client Email Reminders',
  'Service Builder',
  'Financial Analysis',
  'Client Goal Tracker',
  'Invoice Builder',
  'Internal Messages',
  'File Manager',
  'Session Time Tracker',
  'Community News',
  'Profile Templates',
];

export const StepThree = ({ saveInfoLocalStorage, setCardContent }) => {
  const { setValue } = useFormContext();
  const [interests, setInterests] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [createdInterests, setCreatedInterests] = useState([]);
  const smDown = useResponsive('down', 'sm');

  const updateFormValues = (newInterests, newCreatedInterests) => {
    const updatedValue = [...newInterests, ...newCreatedInterests];
    setValue('interestedIn', updatedValue, { shouldValidate: true });
    saveInfoLocalStorage({ interestedIn: updatedValue });
  };

  const handleKeyPress = (event) => {
    try {
      if (event.key === 'Enter' && inputValue.trim()) {
        const newInterest = inputValue.trim();
        if (!createdInterests.includes(newInterest)) {
          const updatedCreatedInterests = [...createdInterests, newInterest];
          setCreatedInterests(updatedCreatedInterests);
          setInputValue('');
          updateFormValues(interests, updatedCreatedInterests);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setCardContent(
      <StyledStack component="span">
        <StyledSeoIllustration />
      </StyledStack>
    );
  }, [setCardContent]);

  const handleChipDelete = (chipToDelete) => {
    if (interests.includes(chipToDelete)) {
      const updatedInterests = interests.filter((interest) => interest !== chipToDelete);
      setInterests(updatedInterests);
      updateFormValues(updatedInterests, createdInterests);
    } else {
      const updatedCreatedInterests = createdInterests.filter(
        (interest) => interest !== chipToDelete
      );
      setCreatedInterests(updatedCreatedInterests);
      updateFormValues(interests, updatedCreatedInterests);
    }
  };

  return (
    <StyledContainer>
      <Stack spacing={1}>
        <RenderInfo
          title="What interests you?"
          subtitle="Help us tailor your Allwyse experience by telling us what interests you and what brings value to your workflow routine. Select as many options as you like."
        />
        <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="flex-start">
          {chipList.map((chip, index) => (
            <Chip
              key={index}
              label={chip}
              onClick={() => {
                if (interests.includes(chip)) {
                  handleChipDelete(chip);
                } else {
                  const updatedInterests = [...interests, chip];
                  setInterests(updatedInterests);
                  updateFormValues(updatedInterests, createdInterests);
                }
              }}
              variant={interests.includes(chip) ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>
        {!smDown && (
          <>
            <StyledTypography variant="h6" component="div">
              Don’t see what you are looking for?
            </StyledTypography>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={createdInterests}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    key={index}
                    {...getTagProps({ index })}
                    onDelete={null}
                  />
                ))
              }
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Add items"
                  helperText="Type and press enter to add a different one"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              )}
            />
          </>
        )}
      </Stack>
    </StyledContainer>
  );
};
