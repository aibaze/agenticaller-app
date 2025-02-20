import sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useBoolean } from 'src/hooks/use-boolean';

import { fShortenNumber, fPercent } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import ProductReviewNewForm from './review-new-form';

// ----------------------------------------------------------------------

export default function DetailsReview({ entity, isPublic, setReviews, detailsReview, entityId }) {
  const { averageRating, totalReviews, ratings } = detailsReview;

  const review = useBoolean();

  const total = sumBy(ratings, (star) => star.starCount);

  const renderSummary = (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Average rating</Typography>

      <Typography variant="h2">{averageRating}/5</Typography>

      <Rating readOnly value={averageRating} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(totalReviews)} reviews)
      </Typography>
    </Stack>
  );

  const renderProgress = (
    <Stack
      spacing={1.5}
      sx={{
        py: 5,
        px: { xs: 3, md: 5 },
        borderLeft: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
        borderRight: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      {ratings
        .slice(0)
        .reverse()
        .map((rating) => (
          <Stack key={rating.name} direction="row" alignItems="center">
            <Typography variant="subtitle2" component="span" sx={{ width: 42 }}>
              {rating.name}
            </Typography>

            <LinearProgress
              color="inherit"
              variant="determinate"
              value={(rating.starCount / total) * 100}
              sx={{
                mx: 2,
                flexGrow: 1,
              }}
            />

            <Typography
              variant="body2"
              component="span"
              sx={{
                minWidth: 48,
                color: 'text.secondary',
                textAlign: 'end',
              }}
            >
              {fPercent((rating.reviewCount / total) * 100) || '0%'}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{
                minWidth: 36,
                color: 'text.secondary',
                textAlign: 'end',
              }}
            >
              {fShortenNumber(rating.reviewCount) || '0'}
            </Typography>
          </Stack>
        ))}
    </Stack>
  );

  const renderReviewButton = (
    <Stack alignItems="center" justifyContent="center">
      <Button
        size="large"
        variant="soft"
        color="inherit"
        onClick={review.onTrue}
        startIcon={<Iconify icon="solar:pen-bold" />}
      >
        Write your review
      </Button>
    </Stack>
  );

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          py: { xs: 5, md: 5 },
        }}
      >
        {renderSummary}

        {renderProgress}

        {isPublic && renderReviewButton}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ProductReviewNewForm
        open={review.value}
        entity={entity}
        entityId={entityId}
        onClose={review.onFalse}
        setReviews={setReviews}
      />
    </>
  );
}

DetailsReview.propTypes = {
  ratings: PropTypes.array,
  reviews: PropTypes.array,
  averageRating: PropTypes.number,
  totalReviews: PropTypes.number,
};
