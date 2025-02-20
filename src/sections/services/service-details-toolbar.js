import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuthContext } from 'src/auth/hooks';
import { handlePublicViewClick } from 'src/utils/params';
// ----------------------------------------------------------------------

export default function ServiceDetailsToolbar({
  publish,
  backLink,
  editClick,
  copyUrl,
  publishOptions,
  onChangePublish,
  isPublic,
  serviceId,
  sx,
  ...other
}) {
  const { currentCoach } = useAuthContext();
  const popover = usePopover();

  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 3 },
          flexWrap: 'wrap',
          alignItems: 'center',
          ...sx,
        }}
        {...other}
      >
        <Button
          component={RouterLink}
          href={backLink}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Back
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Copy URL">
          <IconButton
            onClick={() => {
              copyUrl();
              trackMixPanelEvent(MIXPANEL_ACTION.USER_SHARED, {
                widget_name: 'shared_service',
                from: 'nav_button',
                mode: isPublic ? 'public' : 'private',
              });
            }}
          >
            <Iconify icon="material-symbols:share" />
            <Typography variant="body2" ml={1}>
              Share
            </Typography>
          </IconButton>
        </Tooltip>

        {!isPublic && (
          <>
            <LoadingButton
              color="inherit"
              variant="outlined"
              onClick={editClick}
              sx={{ textTransform: 'capitalize', borderRadius: 50, height: 36 }}
            >
              <Iconify icon="solar:pen-bold" />
              <Typography variant="body2" ml={1}>
                Edit
              </Typography>
            </LoadingButton>

            <LoadingButton
              color="inherit"
              variant="contained"
              loading={!publish}
              loadingIndicator="Loading…"
              endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              onClick={popover.onOpen}
              sx={{ textTransform: 'capitalize', borderRadius: 50, minWidth: 120, height: 36 }}
            >
              {publish}
            </LoadingButton>
          </>
        )}
      </Stack>
      {!isPublic && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => {
              handlePublicViewClick(currentCoach.slug, `/services/${serviceId}`, 'service');
            }}
            variant="outlined"
            sx={{
              borderRadius: 16,
              border: '1px solid',
              borderColor: 'grey.300',
              height: 36,
            }}
            startIcon={<VisibilityIcon fontSize="small" />}
          >
            See Public View
          </Button>
        </Box>
      )}
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {publishOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === publish}
            onClick={() => {
              popover.onClose();
              onChangePublish(option.value);
            }}
          >
            {option.value === 'published' && <Iconify icon="eva:cloud-upload-fill" />}
            {option.value === 'draft' && <Iconify icon="solar:file-text-bold" />}
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

ServiceDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  editClick: PropTypes.func,
  liveLink: PropTypes.string,
  onChangePublish: PropTypes.func,
  publish: PropTypes.string,
  publishOptions: PropTypes.array,
  sx: PropTypes.object,
};
