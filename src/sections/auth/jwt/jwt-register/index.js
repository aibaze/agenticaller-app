'use client';

import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { notifyError } from 'src/utils/bugsnag';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { createCoach } from 'src/api/coach';
import cognito from 'src/auth/cognito/cognito';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_SIGNUP, PATH_AFTER_SSO_SIGNUP } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useResponsive } from 'src/hooks/use-responsive';

import {
  StyledStack,
  StyledBox,
  StyledLogoContainer,
  StyledTypography,
  StyledLink,
} from './styles';
import Logo from 'src/components/logo';
import { Stack } from '@mui/material';

export default function JwtRegisterView() {
  const { register } = useAuthContext();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useResponsive('down', 'md');

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const fromPage = searchParams.get('from_page') || '/';

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      cognito.signUp(data.email?.toLowerCase(), data.password, [], null, async (err, cbData) => {
        if (err) {
          setIsLoading(false);
          setErrorMsg(err.message);
          notifyError(err, {
            context: 'cognito-register',
            user: data.email?.toLowerCase(),
          });
          setTimeout(() => setErrorMsg(''), 5000);
          return;
        }
        await createCoach({
          email: data.email?.toLowerCase(),
          firstName: data.firstName,
          lastName: data.lastName,
        });
        setIsLoading(false);

        register(data.email, data.password);
        window.localStorage.setItem(
          'user',
          JSON.stringify({
            email: data.email?.toLowerCase(),
            pw: data.password,
          })
        );
        router.push(PATH_AFTER_SIGNUP);
      });
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

  async function handleGoogleSuccess(response) {
    try {
      setIsLoading(true);
      const token = response.credential;
      if (!token) {
        throw new Error('Invalid token received from Google');
      }

      const decoded = jwtDecode(token);
      const userEmail = decoded.email;
      const firstName = decoded.given_name;
      const lastName = decoded.family_name;

      await createCoach(
        {
          email: userEmail.toLowerCase(),
          firstName,
          lastName,
          SSO: 'GOOGLE',
        },
        token
      );
      Cookies.set('x_auth_token_sso', token);
      register(userEmail, token);
      setIsLoading(true);

      router.push(PATH_AFTER_SSO_SIGNUP);
    } catch (error) {
      notifyError(error, {
        context: 'google-register',
      });
      setErrorMsg('Failed to register with Google. Please try again.');
    }
  }

  const handleGoogleError = (error) => {
    notifyError(error, {
      context: 'google-register',
    });
    setErrorMsg('Google sign-in failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <StyledBox>
        <StyledStack spacing={2} sx={{ mb: 5, position: 'relative' }}>
          <StyledLogoContainer>
            <Logo />
          </StyledLogoContainer>
          <Typography variant="h4" sx={{ whiteSpace: 'nowrap' }}>
            Get started absolutely free
          </Typography>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2"> Already have an account? </Typography>
            <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
              Log in
            </Link>
          </Stack>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signup_with"
            size="large"
            width={isMobile ? '250px' : '350px'}
            shape="rectangular"
          />

          <Divider>
            <Typography variant="caption">OR</Typography>
          </Divider>

          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack spacing={2.5}>
              {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

              <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                <RHFTextField name="firstName" capital label="First name" />
                <RHFTextField name="lastName" capital label="Last name" />
              </Stack>

              <RHFTextField name="email" label="Email address" />

              <RHFTextField
                name="password"
                label="Password"
                type={password.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={password.onToggle} edge="end">
                        <Iconify
                          icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <LoadingButton
                fullWidth
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                Create account
              </LoadingButton>
            </Stack>
          </FormProvider>

          <StyledTypography component="div">
            {'By signing up, I agree to '}
            <StyledLink href="/terms">Terms of Service</StyledLink>
            {' and '}
            <StyledLink href="/privacy">Privacy Policy</StyledLink>.
          </StyledTypography>
        </StyledStack>
      </StyledBox>
    </GoogleOAuthProvider>
  );
}
