import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { getTodayDate } from 'src/utils/dates';
import { bgGradient } from 'src/theme/css';
import { getDailyMessage } from 'src/utils/random-daily-message';
import { localStorageGetItem } from 'src/utils/storage-available';
import { useState, useEffect } from 'react';
import { useWidth } from 'src/hooks/use-responsive';
import { Box } from '@mui/material';

export default function AppWelcome({ title, description, action, img, ...other }) {
  const [text, setText] = useState('');
  const theme = useTheme();
  const width = useWidth();

  useEffect(() => {
    const storedText = localStorageGetItem('dailyText');
    const storedDate = localStorageGetItem('dailyTextDate');
    const today = getTodayDate();

    if (storedDate === today && storedText) {
      setText(storedText);
    } else {
      const newText = getDailyMessage();
      setText(newText);
      localStorage.setItem('dailyText', newText);
      localStorage.setItem('dailyTextDate', today);
    }
  }, []);

  return (
    <Stack
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette.primary.light, 0.2),
          endColor: alpha(theme.palette.primary.main, 0.2),
        }),
        height: { md: 1 },
        borderRadius: 2,
        position: 'relative',
        color: 'primary.darker',
        backgroundColor: 'common.white',
      }}
      {...other}
    >
      <Stack
        flexGrow={1}
        spacing={2}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          p: {
            xs: theme.spacing(5, 3, 0, 3),
            md: theme.spacing(5),
          },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {action && (width === 'xs' || width === 'sm') && (
          <Box {...other} sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            {action}
          </Box>
        )}
        <Typography variant="h4" sx={{ md: 2, whiteSpace: 'pre-line' }}>
          {title}
        </Typography>
        <Stack spacing={0}>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.8,
              maxWidth: 360,
              fontWeight: 550,
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.8,
              maxWidth: 360,
              fontWeight: 400,
              mb: { xs: 3, xl: 5 },
            }}
          >
            {text}
          </Typography>
        </Stack>
        {action && (width === 'xl' || width === 'md' || width === 'lg') && action}
      </Stack>

      {img && (width === 'xl' || width === 'md' || width === 'lg') && (
        <Stack
          component="span"
          justifyContent="center"
          sx={{
            p: { xs: 5, md: 3 },
            maxWidth: 360,
            mx: 'auto',
          }}
        >
          {img}
        </Stack>
      )}
    </Stack>
  );
}

AppWelcome.propTypes = {
  action: PropTypes.node,
  description: PropTypes.string,
  img: PropTypes.node,
  title: PropTypes.string,
};
