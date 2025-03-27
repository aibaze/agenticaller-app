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
            sx={{
              position: 'relative',
              height: '100vh',
              width: '50%',
              overflow: 'hidden'
            }}
          >
            <Image
              src="https://i.ibb.co/76zVSQD/112595.jpg"
              alt="Login Illustration"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to bottom, ${alpha(
                theme.palette.background.default,
                theme.palette.mode === 'light' ? 0.88 : 0.94
              )})`,
              zIndex: 1
            }} />
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
