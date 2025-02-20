import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { subscribeUser } from 'src/api/subscribe';
import { useSnackbar } from 'src/components/snackbar';
import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import InputForm from '../InputForm/InputForm';

const SubscribeForm = ({ setIsSubmitSuccess }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email) return;

    const requestBody = {
      email,
    };

    try {
      setIsLoading(true);
      setIsError(false);
      await subscribeUser(requestBody);
      enqueueSnackbar('Sent successfully!', { variant: 'success' });
      setIsSubmitSuccess(true);
    } catch (error) {
      setIsError(true);
      enqueueSnackbar(error?.message || 'Error', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '15px', width: '100%', marginBottom: '20px' }}>
      <Typography
        sx={{
          fontSize: { xs: '30px', md: '60px', xl: '70px' },
          fontFamily: 'Degular',
          color: theme.palette.common.black,
          textAlign: 'center',
          fontWeight: 600,
          maxWidth: { xs: '100%', md: '1300px' },
          lineHeight: { xs: '30px', md: '75px' },
          padding: { xs: '20px 15px 40px', md: '70px 30px' },
          margin: '0 auto',
        }}
      >
        Everything for your Online-Business, Your success is our motivation.
      </Typography>

      <InputForm
        onChange={handleChangeEmail}
        value={email}
        name="email"
        type="email"
        placeholder="Example@gmail.com"
        required
        icon={
          <PersonRoundedIcon
            sx={{
              fill: theme.palette.common.black,
              fontSize: '32px',
              position: 'absolute',
              top: { xs: '8px', md: '15px' },
              left: '16px',
            }}
          />
        }
        isError={isError}
      />

      <RoundedButton
        fill="green"
        width={150}
        type="submit"
        isBold={true}
        disabled={isLoading}
        onClick={handleSubscribe}
        isLoading={isLoading}
      >
        Subscribe
      </RoundedButton>
    </Box>
  );
};

export default SubscribeForm;
