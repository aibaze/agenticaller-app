import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useTheme } from '@mui/material/styles';
import { Card, Pagination } from '@mui/material';
import { _mock, _socials } from 'src/_mock';
import { fDate } from 'src/utils/format-time';
import DetailsReview from './details-review';
import CardHeader from '@mui/material/CardHeader';

// ----------------------------------------------------------------------

export default function Reviews({
  reviews,
  setReviews,
  detailsReview,
  isPublic,
  noCard,
  entityId,
  entity,
}) {
  const [page, setPage] = useState(1);
  const reviewsPerPage = 3;
  const theme = useTheme();

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleChange = (e, value) => {
    setPage(value);
  };

  const renderContent = (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CardHeader title="Reviews" />
        <Typography sx={{ color: theme.palette.grey[500], pt: 3 }} variant="subtitle2">{`(${
          reviews.length || 0
        } clients)`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', pl: 5, pr: 5, mt: 5 }}>
        {reviews
          .slice((page - 1) * reviewsPerPage, page * reviewsPerPage)
          .map((testimonial, idx) => (
            <TestimonialCard key={`testimonial_${idx}`} testimonial={testimonial} />
          ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          size="large"
          sx={{ mt: 2 }}
        />
      </Box>
    </Box>
  );

  return (
    <>
      {noCard ? (
        <>
          <DetailsReview
            entity={entity}
            isPublic={isPublic}
            detailsReview={detailsReview}
            entityId={entityId}
            setReviews={setReviews}
          />
          {renderContent}
        </>
      ) : (
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'column' } }}>
          <DetailsReview
            detailsReview={detailsReview}
            entityId={entityId}
            entity={entity}
            isPublic={isPublic}
            setReviews={setReviews}
          />
          {renderContent}
        </Card>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function TestimonialCard({ testimonial }) {
  const theme = useTheme();

  const { name, ratingNumber, postedDate, content, avatarUrl } = testimonial;

  return (
    <Stack
      spacing={1.5}
      sx={{
        p: 3,
        backgroundColor: theme.palette.common.white,
        borderRadius: 2,
        flex: '1 1 30%',
        minWidth: '200px',
        minHeight: '256px',
      }}
    >
      <Stack direction="row">
        <Avatar
          alt={name}
          src={avatarUrl || _mock.image.avatar(Math.floor(Math.random() * 10) + 1)}
          sx={{ mr: 2 }}
        />

        <ListItemText
          primary={name}
          secondary={fDate(postedDate || _mock.time(Math.floor(Math.random() * 10) + 1))}
          primaryTypographyProps={{
            typography: 'subtitle2',
            color: 'grey.800',
          }}
          secondaryTypographyProps={{
            typography: 'caption',
            color: 'grey.500',
          }}
        />
      </Stack>
      <Rating value={ratingNumber} readOnly size="small" />

      <Typography
        color={theme.palette.primary.main}
        variant="body2"
        component="div"
        display="flex"
        alignItems="center"
      >
        <VerifiedIcon color="primary" style={{ marginRight: 8 }} />
        Verified client
      </Typography>
      <Typography color={theme.palette.grey[800]} variant="body2">
        {content}
      </Typography>
    </Stack>
  );
}

TestimonialCard.propTypes = {
  sx: PropTypes.object,
  testimonial: PropTypes.object,
};
