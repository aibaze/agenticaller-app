import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Button } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';

export default function AssistantTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}) {
  const {
    id,
    name,
    voice,
    model,
    createdAt,
    transcriber,
    isServerUrlSecretSet,
  } = row;

  const theme = useTheme();
  const popover = usePopover();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await onDeleteRow(id);
      enqueueSnackbar('Assistant deleted successfully!', { variant: 'success' });
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error('Error deleting assistant:', error);
      enqueueSnackbar('Failed to delete assistant', { variant: 'error' });
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {voice.provider} - {voice.voiceId}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {model.model}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {transcriber.provider} - {transcriber.model}
          </Typography>
        </TableCell>

        <TableCell>
          <Label variant="soft" color={isServerUrlSecretSet ? 'success' : 'error'}>
            {isServerUrlSecretSet ? 'Connected' : 'Not Connected'}
          </Label>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {new Date(createdAt).toLocaleDateString()}
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
            onEditRow(row);
            popover.onClose();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            setConfirmDialogOpen(true);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title="Delete"
        content="Are you sure you want to delete this assistant?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

AssistantTableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    voice: PropTypes.object,
    model: PropTypes.object,
    createdAt: PropTypes.string,
    transcriber: PropTypes.shape({
      model: PropTypes.string,
      provider: PropTypes.string,
      language: PropTypes.string,
    }),
    isServerUrlSecretSet: PropTypes.bool,
  }),
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
}; 