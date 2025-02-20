import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const { currentCoach } = useAuthContext();

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={currentCoach?.profileInfo?.profileImg}
            alt={currentCoach?.firstName}
            sx={{ width: 48, height: 48 }}
          />
          <Label
            color="success"
            variant="filled"
            sx={{
              top: -6,
              px: 0.5,
              left: 40,
              height: 20,
              position: 'absolute',
              borderBottomLeftRadius: 2,
            }}
          >
            Free
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {currentCoach?.firstName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {currentCoach?.email}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          href={'https://www.allwyse.io/#plans'}
          target="_blank"
          rel="noopener"
          disabled={true}
        >
          Upgrade to Pro
        </Button>
      </Stack>
    </Stack>
  );
}
