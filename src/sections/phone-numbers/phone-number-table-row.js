import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useTheme } from '@mui/material';

export default function PhoneNumberTableRow({
  row,
  assistants = [],
  getPhoneNumbers,
}) {
  const {
    name,
    number,
    status,
    provider,
    assistantId,
  } = row;

  const theme = useTheme();
  const popover = usePopover();

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'error';
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Label variant="soft" color={getStatusColor(status)}>
            {status}
          </Label>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {name}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {number}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {assistants.find((assistant) => assistant.id === assistantId)?.name || 'N/A'}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {provider}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            // Handle edit
            popover.onClose();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            // Handle delete
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

PhoneNumberTableRow.propTypes = {
  getPhoneNumbers: PropTypes.func,
  row: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    status: PropTypes.string,
    provider: PropTypes.string,
    assistantId: PropTypes.string,
  }),
  assistants: PropTypes.array,
}; 