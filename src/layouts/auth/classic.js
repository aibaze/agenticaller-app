import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from 'src/components/logo';
import { ImageContainer, StyledStack, StylesStackContainer } from './styles';

export default function AuthClassicLayout({ children, image, verifyEmail, title }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const backgroundVerify = verifyEmail
    ? `linear-gradient(to bottom, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), url(/assets/background/overlay_2.jpg)`
    : theme.palette.background.default;

  return (
    <StylesStackContainer background={backgroundVerify}>
      {verifyEmail && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              <Logo disabledLink /> allwyse
            </Typography>
            <Button color="inherit" startIcon={<SettingsIcon />}>
              need help?
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <Stack sx={{ flexDirection: 'row', flexGrow: 1 }}>
        <StyledStack background={backgroundVerify}>{children}</StyledStack>
        {!verifyEmail && mdUp && (
          <Stack
            flexGrow={1}
            spacing={10}
            alignItems="center"
            justifyContent="center"
            sx={{
              background: `linear-gradient(to bottom, ${alpha(
                theme.palette.background.default,
                theme.palette.mode === 'light' ? 0.88 : 0.94
              )}), url('/assets/background/overlay_2.jpg')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <ImageContainer>
              <Image
                src={
                  "https://i.ibb.co/Pz9MmtrC/Screenshot-2025-03-27-at-4-28-43-PM.png"
                }
                alt="Login Illustration"
                layout="fill"
                objectFit="contain"
              />
            </ImageContainer>
          </Stack>
        )}
      </Stack>
    </StylesStackContainer>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
  verifyEmail: PropTypes.bool,
};
