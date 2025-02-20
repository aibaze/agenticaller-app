import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem from '@mui/lab/TimelineItem';
import HistoryModal from '../user/edit-modals/history-modal';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import MoreVert from '@mui/icons-material/MoreVert';

// ----------------------------------------------------------------------

export default function UserStoryTime({ history, customStyle, isPublic = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleClosePopover();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'edit-popover' : undefined;

  const renderTimeline = (
    <Timeline position="alternate" sx={{ maxHeight: { lg: '320px' } }}>
      {history.map((item, index) => {
        const firstTimeline = index === 0;
        const lastTimeline = index === history.length - 1;

        return (
          <TimelineItem key={`${index}_${item._id}`}>
            <TimelineSeparator>
              <TimelineDot color="primary" variant={firstTimeline ? 'filled' : 'outlined'} />
              {lastTimeline ? null : <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Typography variant="subtitle2">{item.year}</Typography>
              <Typography variant="subtitle2">{item.expertise}</Typography>
              <Typography variant="body2">{item.brand}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );

  return (
    <Card sx={{ ...customStyle }}>
      <CardHeader
        title="Storytime"
        action={
          isPublic ? null : (
            <MoreVert
              onClick={handleClickPopover}
              sx={{ cursor: 'pointer' }}
            />
          )
        }
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Button
          color="success"
          startIcon={<EditIcon />}
          onClick={handleOpenModal}
          sx={{ textTransform: 'none', fontWeight: 'bold', width: 100 }}
        >
          Edit
        </Button>
      </Popover>
      <Stack
        spacing={3}
        alignItems={{ md: 'flex-start' }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{ p: 3 }}
      >
        {renderTimeline}
      </Stack>
      <HistoryModal open={isModalOpen} handleClose={handleCloseModal} initialData={history} />
    </Card>
  );
}

UserStoryTime.propTypes = {
  history: PropTypes.array.isRequired,
};
