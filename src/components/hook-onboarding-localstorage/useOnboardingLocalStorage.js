import { useState, useEffect } from 'react';

const STORAGE_KEY = 'onboardingData';

/**
 * Custom hook to manage onboarding data with localStorage persistence.
 *
 * @param {Object} defaultValues - The default values for onboarding data.
 * @param {string} coachId - The unique identifier for the coach.
 * @returns {Object} - The onboarding data and methods to save and clear it.
 */
const useOnboardingLocalStorage = (defaultValues, coachId) => {
  const COACH_ID_STORAGE_KEY = `${STORAGE_KEY}_${coachId}`;

  const [onboardingData, setOnboardingData] = useState(() => {
    const savedData = localStorage.getItem(COACH_ID_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : defaultValues;
  });

  useEffect(() => {
    localStorage.setItem(COACH_ID_STORAGE_KEY, JSON.stringify(onboardingData));
  }, [onboardingData]);

  const saveInfoLocalStorage = (data) => {
    setOnboardingData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const clearInfoLocalStorage = () => {
    setOnboardingData(defaultValues);
    localStorage.removeItem(COACH_ID_STORAGE_KEY);
  };

  return {
    onboardingDataLocalStorage: onboardingData,
    saveInfoLocalStorage,
    clearInfoLocalStorage,
  };
};

export default useOnboardingLocalStorage;
