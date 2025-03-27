'use client';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUserEmailParam } from 'src/utils/params';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { loginUser } from 'src/api/agenticaller/user';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Cookies from 'js-cookie';
import { notifyError } from 'src/utils/bugsnag';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';
import { useBoolean } from 'src/hooks/use-boolean';
import { getOneCoach, userExists } from 'src/api/coach';
import { useAuthContext } from 'src/auth/hooks';
import { SignIn } from 'src/auth/cognito/helpers';
import { PATH_AFTER_SIGNIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Logo from 'src/components/logo';
import { StyledBox, StyledLogoContainer, StyledStack } from './styles';
import { useResponsive } from 'src/hooks/use-responsive';

export default function JwtLoginView() {
  const { login } = useAuthContext();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useResponsive('down', 'md');

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const userEmail = searchParams.get('userEmail');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: getUserEmailParam(userEmail) || '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = handleLoginSubmit();

  async function onGoogleSuccess(response) {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const token = response.credential;

      if (!token) {
        throw new Error('Invalid token received from Google');
      }
      const decoded = jwtDecode(token);
      const userEmail = decoded.email;
/*       const { exists, authMethod } = await userExists(userEmail);
      if (exists && authMethod !== 'GOOGLE') {
        setErrorMsg(
          'This email is already registered with a different authentication method. Please sign in with your email and password.'
        );
        setIsLoading(false);
        return;
      }

      if (!exists) {
        let count = 5;

        const updateMessage = () => {
          setErrorMsg(
            `This email is not registered, Please create an account. You will be redirected to the registration in ${count} seconds`
          );
          count--;
        };
        // Initial message
        updateMessage();

        // Update message every second
        const countdownInterval = setInterval(updateMessage, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          router.push(paths.auth.jwt.register);
        }, 5000);

        return;
      } */


      const currentUser = await loginUser({email:userEmail,token});
      login(currentUser?.data.data);
      router.push( PATH_AFTER_SIGNIN);
    } catch (error) {
      notifyError(error, {
        context: 'google-register',
      });
      setErrorMsg('Failed to sign in with Google. Please try again.');
    }
  }

  const onGoogleFailure = (error) => {
    notifyError(error, {
      context: 'google-register',
    });
    setErrorMsg('Google sign-in failed. Please try again.');
  };

  return (

      <StyledBox>
        <StyledStack>
          <StyledLogoContainer>
            <Logo />
          </StyledLogoContainer>
          <Stack spacing={2} sx={{ mb: 5 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main',
                textAlign: 'center',
                mb: 1,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                letterSpacing: '0.5px'
              }}
            >
              Sign in to Agenticaller
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center', 
                color: 'text.secondary', 
                mb: 3 
              }}
            >
              Log in and monitor how your agents are performing
            </Typography>

            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 2, 
                '& button': { 
                  borderRadius: 2,
                  boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.24)}`,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: (theme) => `0 12px 20px ${alpha(theme.palette.primary.main, 0.28)}`,
                  }
                } 
              }}
            >
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  width={isMobile ? '250px' : '350px'}
                  onSuccess={onGoogleSuccess}
                  onError={onGoogleFailure}
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  text="signin_with"
                />
              </GoogleOAuthProvider>
            </Box>

          </Stack>

          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack spacing={2.5}>
              {!!errorMsg && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    animation: 'pulse 1.5s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { boxShadow: '0 0 0 rgba(211, 47, 47, 0)' },
                      '50%': { boxShadow: '0 0 10px rgba(211, 47, 47, 0.3)' }
                    }
                  }}
                >
                  {errorMsg}
                </Alert>
              )}
           
            </Stack>
          </FormProvider>
        </StyledStack>
      </StyledBox>
  );

  function handleLoginSubmit() {
    return handleSubmit(async (data) => {
      try {
        setErrorMsg('');

        setIsLoading(true);
        const successCb = async (cbData) => {
          const currentCoach = await getOneCoach(
            data.email?.toLowerCase(),
            cbData.idToken.jwtToken,
            true,
            false
          );
          trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
            widget_name: 'login',
            state: 'success',
          });
          login(currentCoach?.data);
          router.push( PATH_AFTER_SIGNIN);
          setIsLoading(false);
        };
        const errorCb = async (error) => {
          let errorMessage = error;
          if (errorMessage === 'Incorrect username or password.') {
            const { exists, authMethod } = await userExists(data.email?.toLowerCase());
            errorMessage =
              exists && authMethod === 'GOOGLE'
                ? 'Oops! It looks like your account was created using Google Login. Please sign in with Google to access your account. If you need help, contact us: info.agenticaller@gmail.com.'
                : errorMessage;
          }
          if (errorMessage === 'User is not confirmed.') {
            errorMessage =
              'Please confirm your email address with the link we sent you to your inbox. If you need help, contact us: info.agenticaller@gmail.com';
          }
          notifyError(error, {
            context: 'cognito-register',
            user: data.email?.toLowerCase(),
          });

          setErrorMsg(typeof errorMessage === 'string' ? errorMessage : 'Error');
          setIsLoading(false);
        };
        SignIn(data.email, data.password, successCb, errorCb);
      } catch (error) {
        notifyError(error, {
          context: 'cognito-register',
          user: data.email?.toLowerCase(),
        });
        setIsLoading(false);
        reset();
        setErrorMsg(typeof error === 'string' ? error : error.message);
      }
    });
  }
}
