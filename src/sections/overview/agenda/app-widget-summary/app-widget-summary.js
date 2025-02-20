import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import { Grid, Typography } from '@mui/material';
import {
  StyledCard,
  StyledBox,
  StyledGridContainer,
  StyledGridItem,
  StyledTypographySubtitle,
  StyledAvatar,
} from './styles';

export default function AppWidgetSummary({
  title,
  subtitle,
  secondaryContent,
  primaryContent,
  icon,
  disabled,
  cardIcon,
  avatar,
  avatarColor,
  sx,
  ...other
}) {
  const displayAvatar = () => {
    if (Array.isArray(avatar) && avatar.length > 1) {
      return (
        <AvatarGroup max={3}>
          {avatar.map((avatars) => (
            <Avatar sx={{ bgcolor: avatarColor }} key={avatars._id}>
              {avatars.studentName[0]}
            </Avatar>
          ))}
        </AvatarGroup>
      );
    }
    if (Array.isArray(avatar) && avatar.length === 1) {
      return <StyledAvatar>{avatar[0].studentName[0]}</StyledAvatar>;
    }
    return null;
  };

  return (
    <StyledCard sx={{ ...sx, opacity: disabled ? '.3' : '1' }} {...other}>
      <StyledBox>
        <StyledGridContainer container>
          <Grid item xs={avatar ? 8 : 10} lg={avatar ? 8 : 10} md={avatar ? 8 : 10}>
            <Typography variant="subtitle2">{title}</Typography>
            {subtitle && <Typography variant="caption">{subtitle}</Typography>}
            <Stack
              direction="column"
              alignItems="flex-start"
              justifyContent="space-between"
              sx={{ mt: 2, mb: 1 }}
            >
              <Grid container alignItems="center" justifyContent="flex-start" spacing={1}>
                <StyledGridItem item>{icon}</StyledGridItem>
                <StyledGridItem item>
                  <StyledTypographySubtitle variant="subtitle2">
                    {secondaryContent}
                  </StyledTypographySubtitle>
                </StyledGridItem>
              </Grid>
            </Stack>
          </Grid>
          {avatar && (
            <Grid
              item
              xs={4}
              md={4}
              lg={4}
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {displayAvatar()}
            </Grid>
          )}
          {cardIcon && (
            <Grid
              item
              xs={2}
              md={2}
              lg={2}
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {cardIcon}
            </Grid>
          )}
        </StyledGridContainer>
        <Typography variant="h3">{primaryContent}</Typography>
      </StyledBox>
    </StyledCard>
  );
}

AppWidgetSummary.propTypes = {
  title: PropTypes.string,
  secondaryContent: PropTypes.string,
  primaryContent: PropTypes.string,
  icon: PropTypes.node,
  cardIcon: PropTypes.node,
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        studentName: PropTypes.string.isRequired,
      })
    ),
  ]),
  avatarColor: PropTypes.string,
  sx: PropTypes.object,
};
