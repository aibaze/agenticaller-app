import { useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { PlanPremiumIcon, EmailInboxIcon } from 'src/assets/icons';
import { Button } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import { ClientModalConfirm } from './view/success-modal/success-modal';
import { PaymentModal } from './view/payment-modal/payment-modal';
import { updateStudentPaymentStatus } from 'src/api/student';
import { sendEmail } from 'src/api/email';
import { useAuthContext } from 'src/auth/hooks';
import SVGColor from 'src/components/svg-color';

const buildEmail = (client, serviceTitle, coachName) => {
  return `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Reminder</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border: 1px solid #dddddd;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              color: #333333;
              margin-bottom: 20px;
          }
          .content {
              line-height: 1.6;
              color: #555555;
          }
          .cta {
              text-align: center;
              margin-top: 20px;
          }
          .cta a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007BFF;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
          }
          .cta a:hover {
              background-color: #0056b3;
          }
          .footer {
              text-align: center;
              font-size: 12px;
              color: #aaaaaa;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h2 class="header">Payment Reminder</h2>
          <div class="content">
              <p>Dear ${client.fullName},</p>
              <p>We hope this message finds you well. This is a friendly reminder that your payment for <strong>${serviceTitle}</strong> is due </p>
              <p>To ensure uninterrupted services, please make the payment at your earliest convenience.</p>
          </div>
          
          <div class="content">
              <p>Thank you for your prompt attention to this matter!</p>
              <p>Best regards,</p>
              <p><strong>${coachName}</strong></p>
          </div>
         
      </div>
  </body>
  </html>`;
};
export default function ProductTableRow({ row, selected, onDeleteRow, onEditRow, getStudents }) {
  const theme = useTheme();
  const popover = usePopover();
  const { currentCoach } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentModalOperation, setPaymentModalOperation] = useState(false);

  const getNextAppointment = (events, section) => {
    if (!events || events.length === 0) return { valid: false, result: 'No future appointments' };
    const now = Date.now();
    const futureEvents = events.filter((ev) => ev.start > now).sort((a, b) => a.start - b.start);
    if (!futureEvents.length) return { valid: false, result: 'No future appointments' };

    const nextEvent = futureEvents[0];
    const result =
      section === 'date'
        ? format(new Date(nextEvent.start), 'dd MMM')
        : format(new Date(nextEvent.start), 'p');

    return { result, valid: true, nextEvent: nextEvent.hangoutLink };
  };
  const { result: nextAppointmentDate, nextEvent: nextAppointmentDateLink } = getNextAppointment(
    row.events,
    'date'
  );
  const { result: nextAppointmentTime } = getNextAppointment(row.events, 'time');

  const handleDelete = async () => {
    try {
      await onDeleteRow(row._id, row.coachId);
      enqueueSnackbar('Deleted successfully!', { variant: 'success' });
      setModalConfirmOpen(true);
    } catch (error) {
      console.error('Error deleting row:', error);
      enqueueSnackbar('Failed to delete', { variant: 'error' });
    }
  };

  const handleModalClose = () => {
    setModalConfirmOpen(false);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={row?.firstName}
            src={row?.profileImg || ''}
            sx={{ mr: 2, bgcolor: nextAppointmentDateLink ? theme.palette.primary.main : 'gray' }}
          >
            {row?.fullName?.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="subtitle2">{row?.fullName || 'N/A'}</Typography>
            <Typography
              variant="subtitle2"
              sx={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}
              color={theme.palette.grey[500]}
            >
              {row.email || 'N/A'}
            </Typography>
            <Typography variant="subtitle2">{row.name}</Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex' }}>
            <SVGColor
              onClick={() => {
                if (nextAppointmentDateLink) {
                  window.open(nextAppointmentDateLink);
                }
              }}
              style={{
                color: nextAppointmentDateLink ? '#1877f2' : '',
                cursor: 'pointer',
                marginRight: '10px',
              }}
              src="/assets/icons/components/northeast.svg"
            />
            <ListItemText
              primary={nextAppointmentDate}
              secondary={nextAppointmentTime}
              primaryTypographyProps={{ variant: 'body2', noWrap: true }}
              secondaryTypographyProps={{ sx: { mt: 0.5 }, component: 'span', variant: 'caption' }}
            />
          </Box>
        </TableCell>

        <TableCell>
          <Box
            variant="subtitle2"
            sx={{ maxWidth: '200px', display: 'flex', gap: '7px', alignItems: 'center' }}
          >
            <Label
              sx={{ display: row.servicesDetails.length ? 'flex' : 'none' }}
              variant="soft"
              color="info"
            >
              {row.servicesDetails.length}
            </Label>

            {row.servicesDetails.length ? (
              <AvatarGroup total={row.servicesDetails.length}>
                {row.servicesDetails.map((item) => (
                  <Tooltip title={item.title} key={item._id}>
                    <Avatar
                      alt={item.title}
                      src={item.thumb}
                      sx={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        window.open(window.location.origin + '/services/' + item._id);
                      }}
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            ) : (
              <Label variant="soft" color="error">
                Not assigned
              </Label>
            )}
          </Box>
        </TableCell>
        <TableCell sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          {row.questionnaires?.length}
        </TableCell>

        <TableCell>
          <Label variant="soft" color={row.unpaidServices.length ? 'error' : 'success'}>
            {row.unpaidServices.length ? 'Pending' : 'Up to date'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              color={popover.open ? 'primary' : 'default'}
              onClick={() => onEditRow && onEditRow(row)}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 350 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow(row);
            popover.onClose();
          }}
        >
          <Iconify
            style={{
              width: 25,
              height: 25,
              color: theme.palette.primary.main,
            }}
            icon="solar:pen-bold"
          />
          Edit client
        </MenuItem>
        <MenuItem
          onClick={() => {
            setPaymentModalOpen(true);
            setPaymentModalOperation({
              title: 'Update payment status',
              type: 'UPDATE_STATUS',
              description: `Update payment status of ${row.fullName}`,
              cta: row.unpaidServices.length ? 'Set as paid' : 'Set as unpaid',
              onConfirm: async (serviceId, operation) => {
                await updateStudentPaymentStatus({
                  studentId: row._id,
                  serviceId,
                  operation,
                });
                enqueueSnackbar('Payment status updated successfully', { variant: 'success' });
                setPaymentModalOpen(false);
                getStudents();
              },
            });
            popover.onClose();
          }}
        >
          <PlanPremiumIcon sx={{ width: 25, height: 25, color: theme.palette.primary.main }} />
          Update payment status
        </MenuItem>
        <MenuItem
          onClick={() => {
            setPaymentModalOpen(true);
            setPaymentModalOperation({
              title: 'Request payment reminder',
              type: 'REQUEST_PAYMENT',
              description: 'A email with a payment status reminder will be sent',
              cta: 'Send reminder',
              onConfirm: async (serviceTitle) => {
                await sendEmail({
                  to: row.email,
                  subject: 'Payment reminder',
                  html: buildEmail(
                    row,
                    serviceTitle,
                    `${currentCoach.firstName} ${currentCoach.lastName}`
                  ),
                });
                enqueueSnackbar('Payment status updated successfully', { variant: 'success' });
              },
            });
            popover.onClose();
          }}
        >
          <EmailInboxIcon sx={{ width: 25, height: 25, color: theme.palette.primary.main }} />
          Request payment
        </MenuItem>

        <MenuItem
          onClick={() => {
            setConfirmDialogOpen(true);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify style={{ width: '25px', height: '25px' }} icon="solar:trash-bin-trash-bold" />
          Delete client
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => {
          setConfirmDialogOpen(false);
        }}
        title="Delete"
        content="Are you sure you want to delete?"
        action={
          <Button
            variant="contained"
            sx={{ backgroundColor: theme.palette.error.main }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        }
      />
      {paymentModalOpen && (
        <PaymentModal
          open={paymentModalOpen}
          onClose={() => {
            setPaymentModalOpen(false);
          }}
          client={row}
          operation={paymentModalOperation}
        />
      )}
      {modalConfirmOpen && (
        <ClientModalConfirm open={modalConfirmOpen} onClose={handleModalClose} deleteModal />
      )}
    </>
  );
}

ProductTableRow.propTypes = {
  onDeleteRow: PropTypes.func.isRequired,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onNextSessionRow: PropTypes.func,
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coachId: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    profileImg: PropTypes.string,
    services: PropTypes.arrayOf(PropTypes.object),
    servicesDetails: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        category: PropTypes.string,
      })
    ),
    events: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  selected: PropTypes.bool,
};

ProductTableRow.defaultProps = {
  onEditRow: () => {},
  onSelectRow: () => {},
  onNextSessionRow: () => {},
  selected: false,
};
