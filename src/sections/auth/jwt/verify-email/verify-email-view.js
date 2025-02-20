'use client';
import { notifyError } from 'src/utils/bugsnag';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignIn } from 'src/auth/cognito/helpers';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MIXPANEL_ACTION, trackMixPanelEvent } from 'src/utils/mixpanel';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { getOneCoach } from 'src/api/coach';
import { useAuthContext } from 'src/auth/hooks';
import { VerifyUser } from 'src/auth/cognito/helpers';
import { PATH_AFTER_VERIFY } from 'src/config-global';
import { paths } from 'src/routes/paths';
import { getUserEmailParam } from 'src/utils/params';
import FormProvider, { RHFCode } from 'src/components/hook-form';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box } from '@mui/material';
import VerifyMailIlustration from 'src/assets/illustrations/verify-mail-ilustration';
import {
  StyledStack,
  StyledBox,
  IllustrationContainer,
  CustomLoadingButton,
  CenteredStack,
} from './styles';

export default function ModernVerifyView() {
  const router = useRouter();
  const { login, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const VerifySchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues: { code: '' },
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    let fallBackUser = window.localStorage.getItem('user');
    if (fallBackUser) {
      fallBackUser = JSON.parse(fallBackUser);
    }

    try {
      setIsLoading(true);

      VerifyUser(user?.email || fallBackUser?.email, data.code, async (err) => {
        if (err) {
          notifyError(err, {
            context: 'verify-email',
            user: user?.email || fallBackUser?.email,
          });
          trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
            widget_name: 'verify_email',
            state: 'error',
          });
          throw err;
        }

        const successCb = async (cbData) => {
          const currentCoach = await getOneCoach(
            user?.email || fallBackUser?.email,
            cbData.idToken.jwtToken,
            true,
            false
          );
          trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
            widget_name: 'verify_email',
            state: 'success',
          });
          login({ ...currentCoach?.data, token: cbData.idToken.jwtToken });
          localStorage.removeItem('user');
          router.push(PATH_AFTER_VERIFY);
        };

        SignIn(
          user?.email || fallBackUser?.email,
          user?.password || fallBackUser?.pw,
          successCb,
          (err) => {
            notifyError(err, {
              context: 'verify-email-sign-in',
              user: user?.email || fallBackUser?.email,
            });
            trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
              widget_name: 'verify_email',
              state: 'error',
            });
          }
        );
      });
    } catch (error) {
      notifyError(error, {
        context: 'verify-email-submit',
        user: user?.email || fallBackUser?.email,
      });

      setIsLoading(false);
    }
  });

  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const confirmationCodeParam = searchParams.get('confirmation_code');

  useEffect(() => {
    if (emailParam && confirmationCodeParam) {
      setValue('code', confirmationCodeParam);
      const emailFromUrl = getUserEmailParam(emailParam);

      VerifyUser(emailFromUrl, confirmationCodeParam, (err) => {
        if (err) {
          notifyError(err, {
            context: 'verify-email-from-url',
            user: user?.email || fallBackUser?.email,
            emailFromUrl,
          });
        }

        router.push(`${paths.auth.jwt.login}?userEmail=${emailFromUrl}`);
      });
    }
  }, [emailParam, confirmationCodeParam]);

  return (
    <StyledBox>
      <StyledStack spacing={2}>
        <IllustrationContainer>
          <VerifyMailIlustration />
        </IllustrationContainer>

        <Stack spacing={1} sx={{ mb: 5 }}>
          <Typography variant="h3" align="center">
            Please check your email!
          </Typography>

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
            We have emailed a 6-digit confirmation code to {emailParam}, please enter the code in
            the box below to verify your email. If you can't find it check the spam folder !
          </Typography>
        </Stack>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5}>
            <RHFCode name="code" />
            <CustomLoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={isSubmitSuccessful}
              loading={isLoading}
            >
              {isLoading ? 'Loading' : 'Verify'}
            </CustomLoadingButton>
          </Stack>
        </FormProvider>
      </StyledStack>
    </StyledBox>
  );
}
