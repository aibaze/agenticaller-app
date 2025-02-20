import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { fToNow } from 'src/utils/format-time';
import { Stack, Button } from '@mui/material';
import { useWidth } from 'src/hooks/use-responsive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import EmptyContent from 'src/components/empty-content';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function AppWidgetTimeline({ title, list, limit, subtitle, ...other }) {
  const theme = useTheme();
  const width = useWidth();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (width === 'sm' || width === 'xs') {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [width]);

  const handleToggleCollapse = () => {
    if (width === 'sm' || width === 'xs') {
      setCollapsed(!collapsed);
    }
  };

  const arrowButton = (
    <IconButton onClick={handleToggleCollapse}>
      {collapsed ? (
        <KeyboardArrowDownIcon fontSize="large" />
      ) : (
        <KeyboardArrowUpIcon fontSize="large" />
      )}
    </IconButton>
  );

  return (
    <Card
      sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', height: '100%' }}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Typography variant="h6" onClick={handleToggleCollapse}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {subtitle}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {(width === 'sm' || width === 'xs') && arrowButton}
          </Grid>
        </Grid>
        <Collapse in={!collapsed}>
          {list.length > 0 ? (
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              <Stack spacing={1}>
                {list.slice(0, limit).map((event, index) => (
                  <TimelineItem key={event._id}>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor:
                            event?.color && event.color !== '' ? event.color : 'success.main',
                        }}
                      />
                      {limit - 1 > index && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack spacing={0}>
                        <Typography component="span">{event.studentName}</Typography>
                        <Typography variant="h6" component="span">
                          {event.serviceTitle ? event.serviceTitle : 'Welcome meeting'}
                        </Typography>
                        <Typography variant="caption">{fToNow(event.startDate)}</Typography>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Stack>
            </Timeline>
          ) : (
            <EmptyContent title="No sessions done today" sx={{ py: 10 }} />
          )}
        </Collapse>
      </Box>
    </Card>
  );
}

AppWidgetTimeline.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      studentName: PropTypes.string.isRequired,
      studentEmail: PropTypes.string,
    })
  ).isRequired,
  limit: PropTypes.number,
};
