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
import { Button, Modal } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import { updateStudentPaymentStatus } from 'src/api/student';
import { sendEmail } from 'src/api/email';
import { useAuthContext } from 'src/auth/hooks';
import SVGColor from 'src/components/svg-color';
import Link from '@mui/material/Link';

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

export default function CallTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  assistants=[],
  onEditRow,
  getCalls,
}) {
  const {
    type,
    startedAt,
    endedAt,
    status,
    recordingUrl,
    summary,
    cost,
    endedReason,
    assistantId,
  } = row;
  const duration = endedAt && startedAt
    ? new Date(endedAt).getTime() - new Date(startedAt).getTime()
    : 0;

  const durationInMinutes = Math.floor(duration / (1000 * 60));
  const durationInSeconds = Math.floor((duration % (1000 * 60)) / 1000);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ended':
        return 'success';
      case 'ongoing':
        return 'warning';
      default:
        return 'error';
    }
  };

  const theme = useTheme();
  const popover = usePopover();
  const { currentCoach } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentModalOperation, setPaymentModalOperation] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', content: '' });

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
      enqueueSnackbar('Failed to delete', { variant: 'error' });
    }
  };

  const handleModalClose = () => {
    setModalConfirmOpen(false);
  };

  const handleOpenModal = (type, content) => {
    setModalContent({ type, content });
    setContentModalOpen(true);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Label variant="soft" color={getStatusColor(status)}>
            {status}
          </Label>
        </TableCell>

        <TableCell>
          <Label variant="soft" color={type === 'webCall' ? 'info' : 'warning'}>
            {type}
          </Label>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {assistants.find((assistant) => assistant.id === assistantId)?.name}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">
            {format(new Date(startedAt), 'dd MMM  HH:mm:ss')}
          </Typography>
        </TableCell>

        <TableCell>
          {`${durationInMinutes}:${durationInSeconds.toString().padStart(2, '0')}`}
        </TableCell>

        <TableCell>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ${cost?.toFixed(4)}
          </Typography>
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {recordingUrl && (
              <IconButton 
                component={Link} 
                href={recordingUrl} 
                target="_blank"
                rel="noopener"
              >
                <Iconify icon="eva:headphones-outline" />
              </IconButton>
            )}
            
            {summary && (
              <IconButton onClick={() => handleOpenModal('summary', summary)}>
                <Iconify icon="eva:file-text-outline" />
              </IconButton>
            )}
          </Box>
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
        sx={{ width: 350 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenModal('transcript', row.artifact.transcript || 'No transcript available');
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
         See transcript
        </MenuItem>

    {/*     <MenuItem
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
                getCalls();
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
        </MenuItem> */}

      {/*   <MenuItem
          onClick={() => {
            setConfirmDialogOpen(true);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify style={{ width: '25px', height: '25px' }} icon="solar:trash-bin-trash-bold" />
          Delete client
        </MenuItem> */}
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

      <Modal
        open={contentModalOpen}
        onClose={() => setContentModalOpen(false)}
        aria-labelledby="content-modal-title"
        aria-describedby="content-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '80vh',
            overflow: 'auto',
          }}
        >
          <Typography id="content-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            {modalContent.type === 'summary' ? 'Call Summary' : 'Call Transcript'}
          </Typography>
          <Typography id="content-modal-description" sx={{ whiteSpace: 'pre-wrap' }}
          style={modalConfirmOpen.type === "transcript" ? {
            lineHeight:"50px !important",
          }:{ }}
          >
            {modalContent.content}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(modalContent.content);
                  enqueueSnackbar('Content copied to clipboard!', { variant: 'success' });
                } catch (error) {
                  enqueueSnackbar('Failed to copy content', { variant: 'error' });
                }
              }}
              startIcon={<Iconify icon="eva:copy-outline" />}
            >
              Copy
            </Button>
            <Button onClick={() => setContentModalOpen(false)}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

CallTableRow.propTypes = {
  getCalls: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    startedAt: PropTypes.string,
    endedAt: PropTypes.string,
    status: PropTypes.string,
    recordingUrl: PropTypes.string,
    summary: PropTypes.string,
    cost: PropTypes.number,
    endedReason: PropTypes.string,
    assistantId: PropTypes.string,
  }),
  selected: PropTypes.bool,
};
