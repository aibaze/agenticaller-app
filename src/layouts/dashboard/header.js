import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';

import Searchbar from '../common/searchbar';
import { NAV, HEADER } from '../config-layout';
import SettingsButton from '../common/settings-button';
import AccountPopover from '../common/account-popover';
import ContactsPopover from '../common/contacts-popover';
import LanguagePopover from '../common/language-popover';
import NotificationsPopover from '../common/notifications-popover';
import { createUserFeedback } from 'src/api/agenticaller/user';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    title: '',
    description: '',
    loading: false,
    email: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}

      <Searchbar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {/* <LanguagePopover />

        <NotificationsPopover />
*/}
        <Button
          onClick={() => {
            trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
              widget_name: 'share_feedback',
            });
            setOpenHelpModal(true);
          }}
          color="inherit" /* startIcon={<SettingsIcon /> */
        >
          Share Feedback
        </Button>
        <ContactsPopover />

        <SettingsButton />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>

      <ConfirmDialog
        open={openHelpModal}
        onClose={() => {
          setOpenHelpModal(false);
        }}
        title="Share your feedback"
        content={
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              maxWidth: 700,
              margin: '0 auto',
              p: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Feedback Form
            </Typography>

            <TextField
              required
              id="title"
              onChange={(e) => {
                setFeedbackForm({ ...feedbackForm, title: e.target.value });
              }}
              value={feedbackForm.title}
              label="Title"
              variant="outlined"
              fullWidth
            />

            <TextField
              required
              error={feedbackForm.email.length && !validateEmail(feedbackForm.email)}
              helperText={
                feedbackForm.email.length && !validateEmail(feedbackForm.email)
                  ? 'Please enter a valid email'
                  : ''
              }
              id="email"
              onChange={(e) => {
                setFeedbackForm({ ...feedbackForm, email: e.target.value });
              }}
              label="Email"
              value={feedbackForm.email}
              type="email"
              variant="outlined"
              fullWidth
            />

            <TextField
              required
              value={feedbackForm.description}
              onChange={(e) => {
                setFeedbackForm({ ...feedbackForm, description: e.target.value });
              }}
              id="description"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
          </Box>
        }
        action={
          <Button
            variant="contained"
            sx={{ backgroundColor: theme.palette.primary.main }}
            onClick={async () => {
              try {
                if (!feedbackForm.title || !feedbackForm.email || !feedbackForm.description) {
                  enqueueSnackbar('Please fill all the fields', { variant: 'error' });
                  return;
                }

                if (!validateEmail(feedbackForm.email)) {
                  enqueueSnackbar('Please enter a valid email', { variant: 'error' });
                  return;
                }
                setFeedbackForm({ ...feedbackForm, loading: true });
                await createUserFeedback(feedbackForm);
                setOpenHelpModal(false);
                setFeedbackForm({ ...feedbackForm, loading: false });

                enqueueSnackbar('Feedback sent successfully!', { variant: 'success' });
              } catch (e) {
                enqueueSnackbar('Something went wrong, please try again later', {
                  variant: 'error',
                });
                setFeedbackForm({ ...feedbackForm, loading: false });
              }
            }}
          >
            {feedbackForm.loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send'}
          </Button>
        }
      />
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
