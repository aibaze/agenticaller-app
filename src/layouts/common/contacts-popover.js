import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useAuthContext } from 'src/auth/hooks';
import { _contacts } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { getCoachStudents } from 'src/api/student';

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const popover = usePopover();
  const { currentCoach } = useAuthContext();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getCoachStudents(currentCoach._id, `?detailed=true`);
      setClients(response.data.students);
    };

    fetchClients();
  }, [currentCoach._id]);
  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={popover.open ? 'inherit' : 'default'}
        onClick={popover.onOpen}
        sx={{
          ...(popover.open && {
            bgcolor: (theme) => theme.palette.action.selected,
          }),
        }}
      >
        <Iconify icon="solar:users-group-rounded-bold-duotone" width={24} />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 320 }}>
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Clients <Typography component="span">({clients.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: 320 }}>
          {clients.length ? (
            clients.map((client) => (
              <MenuItem key={client._id} sx={{ p: 1 }}>
                {/*   <Badge
                variant={contact.status}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ mr: 2 }}
              > */}
                <Avatar sx={{ mr: 2 }} alt={client.fullName}>
                  {client.fullName?.charAt(0).toUpperCase()}
                </Avatar>
                {/*   </Badge> */}

                <ListItemText
                  primary={client.fullName}
                  secondary={
                    !client.servicesDetails?.length
                      ? 'No services'
                      : client.servicesDetails[0].title
                  }
                  primaryTypographyProps={{ typography: 'subtitle2' }}
                  secondaryTypographyProps={{
                    typography: 'caption',
                    color: 'text.disabled',
                  }}
                />
              </MenuItem>
            ))
          ) : (
            <Box
              sx={{
                p: 2,
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box
                component="img"
                src="/assets/images/coming-soon.svg"
                sx={{ width: 150, height: 150, mb: 5 }}
              />
              <Typography variant="subtitle1" sx={{ p: 2 }}>
                No clients yet
              </Typography>
            </Box>
          )}
        </Scrollbar>
      </CustomPopover>
    </>
  );
}
