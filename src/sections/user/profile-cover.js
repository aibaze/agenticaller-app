import PropTypes from 'prop-types';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import Iconify from 'src/components/iconify';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function ProfileCover({ name, avatarUrl, role, coverUrl, onChangeImage, isPublic }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.8),
          imgUrl: coverUrl,
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: 75 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
        <Avatar
          src={avatarUrl}
          onClick={onChangeImage}
          alt={name}
          sx={{
            cursor: 'pointer',
            mx: 'auto',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 2px ${theme.palette.common.white}`,
          }}
        />
        {/*   {!isPublic && (
          <Badge
            onClick={onChangeImage}
            sx={{
              top: { xs: '-15px', md: '90px' },
              left: { xs: '50px', md: 0 },
              margin: '0 auto',
              cursor: 'pointer',
            }}
          >
            <EditIcon />
          </Badge>
        )} */}

        <ListItemText
          sx={{
            mt: { xs: 1, md: 3 },
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={
            <>
              {name}
              <Iconify icon="ic:round-verified" width={20} ml={0.6} />
            </>
          }
          secondary={role}
          primaryTypographyProps={{
            typography: 'h4',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
          }}
        />
      </Stack>
    </Box>
  );
}

ProfileCover.propTypes = {
  avatarUrl: PropTypes.string,
  coverUrl: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
};
