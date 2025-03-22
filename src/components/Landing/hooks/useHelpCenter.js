import { createContext, useContext, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { createUserFeedback } from 'src/api/agenticaller/user';

// Steps:
// 1 - Introduction text
// 2 - Category Selection
// 3-  Email and description
// 4 - Success submit message

const HelpCenterContext = createContext(null);
HelpCenterContext.displayName = 'HelpCenterContext';

const HelpCenterProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmitHelpCenter = async (event) => {
    event.preventDefault();
    if (!email || !category || !description) return;

    const requestBody = {
      email,
      category,
      description,
    };

    try {
      setIsLoading(true);
      setIsError(false);
      await createUserFeedback(requestBody);
      enqueueSnackbar('Sent successfully!', { variant: 'success' });
      setStep(4);
    } catch (error) {
      setIsError(true);
      enqueueSnackbar(error?.message || 'Error', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    step,
    setStep,
    category,
    setCategory,
    email,
    setEmail,
    description,
    setDescription,
    handleSubmitHelpCenter,
    isLoading,
    isError,
  };

  return <HelpCenterContext.Provider value={value}>{children}</HelpCenterContext.Provider>;
};

export const useHelpCenter = () => {
  const context = useContext(HelpCenterContext);
  if (!context) throw new Error(`useHelpCenter must be used within HelpCenterContext`);

  return context;
};

export default HelpCenterProvider;
