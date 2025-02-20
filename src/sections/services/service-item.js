import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Label from 'src/components/label/label';
import { _mock } from 'src/_mock';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function ServiceItem({ service, onView, onEdit, onDelete, isPublic }) {
  const popover = usePopover();
  const { currentCoach } = useAuthContext();
  const { firstName, lastName } = currentCoach || {};
  const coachName = `${firstName} ${lastName}`;

  const {
    thumb,
    title,
    category,
    seatsLeft,
    sessionPeriodicity,
    sessionDuration,
    price,
    salePrice,
    published,
  } = service;

  const hasSeatsLeft = typeof seatsLeft === 'number' && seatsLeft > 0;

  const priceDisplay = (price, salePrice) => {
    const displayPrice = salePrice || price;
    const isPriceAvailable = !!price;

    return (
      <>
        {salePrice && <span style={{ textDecoration: 'line-through' }}>{price} usd</span>}{' '}
        {displayPrice} {isPriceAvailable && 'usd'}
        {!isPriceAvailable && 'Negotiable'}
      </>
    );
  };

  return (
    <>
      <Card
        onClick={onView}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            popover.onOpen(event);
          }}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack
          sx={{
            p: 3,
            pb: 2,
          }}
        >
          <Avatar
            alt={category}
            src={thumb}
            variant="rounded"
            sx={{ width: 48, height: 48, mb: 2 }}
          />
          <ListItemText
            sx={{ mb: 1 }}
            primary={title}
            secondary={category}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{
              color: hasSeatsLeft ? 'primary.main' : 'error.dark',
              typography: 'caption',
              mt: 1,
            }}
          >
            <Iconify width={16} icon="solar:users-group-rounded-bold" />
            {hasSeatsLeft ? seatsLeft : 'No '} Available spots
          </Stack>

          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <Label
              variant="soft"
              color={!published || !hasSeatsLeft ? 'error' : 'success'}
              sx={{ width: '82px', height: '24px' }}
            >
              {!published ? 'Draft' : hasSeatsLeft ? 'Available' : 'Unavailable'}
            </Label>
          </Stack>
        </Stack>

        <Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
            {/* sSession Periodicity */}
            <Stack
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'text.disabled', minWidth: 0 }}
            >
              <Iconify width={22} icon="solar:cup-star-bold" sx={{ flexShrink: 0 }} />
              <Typography variant="body2" noWrap>
                {sessionPeriodicity}
              </Typography>
            </Stack>

            {/* TIME SESSION */}
            <Stack
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'text.disabled', minWidth: 0 }}
            >
              <Iconify width={22} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />
              <Typography variant="body2" noWrap>
                {`${sessionDuration} min / Session`}
              </Typography>
            </Stack>

            {/* PRICE */}
            <Stack
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'primary.main', minWidth: 0 }}
            >
              <Iconify
                color="primary"
                width={22}
                icon="pepicons-pop:dollar"
                sx={{ flexShrink: 0 }}
              />
              <Typography variant="body2" noWrap>
                {priceDisplay(price, salePrice)}
              </Typography>
            </Stack>

            {/* COACH NAME */}
            <Stack
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'text.disabled', minWidth: 0 }}
            >
              <Iconify width={22} icon="solar:user-rounded-bold" sx={{ flexShrink: 0 }} />
              <Typography variant="body2" noWrap>
                {coachName}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
        {!isPublic && (
          <>
            <MenuItem
              onClick={() => {
                popover.onClose();
                onEdit();
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>

            <MenuItem
              onClick={() => {
                popover.onClose();
                onDelete();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </>
        )}
      </CustomPopover>
    </>
  );
}

ServiceItem.propTypes = {
  service: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
};
