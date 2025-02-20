import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { Collapse, Stack, Button, CardActions, Grid } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ImageIcon from '@mui/icons-material/Image';
import EmptyContent from 'src/components/empty-content';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useWidth } from 'src/hooks/use-responsive';
import {
  StyledCard,
  StyledBox,
  StyledGridContainer,
  StyledGridItem,
  StyledTypographyTitle,
  StyledTypographySubtitle,
  StyledListItem,
  StyledListItemText,
  StyledListItemAvatar,
  StyledAvatar,
} from './styles';

export default function AppWidgetList({
  title,
  subtitle,
  list,
  isExpanded = false,
  handleShowMore = () => {},
  ...other
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const width = useWidth();

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

  useEffect(() => {
    if (width === 'sm' || width === 'xs') {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [width]);
  return (
    <StyledCard {...other}>
      <StyledBox>
        <StyledGridContainer container>
          <Grid item xs={11} md={11} lg={11}>
            <StyledTypographyTitle variant="h6" onClick={handleToggleCollapse}>
              {title}
            </StyledTypographyTitle>
            <StyledTypographySubtitle variant="body2">{subtitle}</StyledTypographySubtitle>
          </Grid>
          <StyledGridItem item xs={1} md={1} lg={1}>
            {(width === 'sm' || width === 'xs') && arrowButton}
          </StyledGridItem>
        </StyledGridContainer>
        <Collapse in={!collapsed}>
          {list.length > 0 ? (
            <>
              <List>
                <Stack spacing={1}>
                  {list.map((student) => {
                    return (
                      <StyledListItem key={student._id}>
                        <StyledListItemAvatar>
                          <StyledAvatar>
                            <ImageIcon />
                          </StyledAvatar>
                        </StyledListItemAvatar>
                        <StyledListItemText
                          primary={student.studentName}
                          secondary={student.studentEmail}
                        />
                        <IconButton edge="end" aria-label="delete">
                          <ArrowOutwardIcon fontSize="small" />
                        </IconButton>
                      </StyledListItem>
                    );
                  })}
                </Stack>
              </List>
              <CardActions
                sx={{ justifyContent: 'center', display: list.length > 5 ? 'unset' : 'none' }}
              >
                <Button
                  onClick={handleShowMore}
                  size="small"
                  endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                  Show {isExpanded ? 'less' : 'more'}
                </Button>
              </CardActions>
            </>
          ) : (
            <EmptyContent title="No clients pending this week" sx={{ py: 10 }} />
          )}
        </Collapse>
      </StyledBox>
    </StyledCard>
  );
}

AppWidgetList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      email: PropTypes.string,
    })
  ).isRequired,
};
