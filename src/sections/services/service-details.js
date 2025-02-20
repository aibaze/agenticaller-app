import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { capitalize } from 'src/utils/format-string';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { fDate } from 'src/utils/format-time';
import Iconify from 'src/components/iconify';
import Image from 'next/image';
import ServiceDetailsSummary from './service-details-summary';
import { useAuthContext } from 'src/auth/hooks';
import Reviews from '../reviews/reviews';
import { calculateRatingStats } from 'src/utils/ratings';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <Skeleton
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        borderRadius: 1,
        position: 'absolute',
      }}
    />
  ),
});

import 'src/utils/highlight';
import 'react-quill/dist/quill.snow.css';
import ServiceAnalytics from './service-analitycs';

// ----------------------------------------------------------------------

export const SERVICE_DETAILS_CONTENT_TABS = [
  { value: 'service-description', label: 'Service Description' },
  { value: 'reviews', label: 'Reviews' },
];

export default function ServiceDetails({ service, isPublic, handleEditClick }) {
  if (!service) return null;
  const [currentTab, setCurrentTab] = useState('service-description');
  const [reviews, setReviews] = useState(service.reviews);

  const detailsReview = calculateRatingStats(reviews);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const { currentCoach } = useAuthContext();

  const { firstName, lastName, profileInfo } = currentCoach;
  const coachName = `${firstName} ${lastName}`;
  const coachLogo = profileInfo?.profileImg;

  const {
    title,
    description,
    price,
    tags,
    createdAt,
    endDate,
    image,
    sessionAmount,
    mainTopics,
    sessionDuration,
    languages,
    customSessionMinutes,
    sessionPeriodicity,
  } = service;

  const renderContent = (
    <>
      <Typography variant="h4">{title}</Typography>

      <Stack>
        <Typography variant="h6">Description</Typography>

        {description ? (
          <ReactQuill
            value={description}
            readOnly
            modules={{
              toolbar: false,
            }}
            style={{ marginLeft: -12 }}
          />
        ) : (
          <EmptyContent
            filled
            title="Fill in your professional description"
            sx={{ py: 10 }}
            action={
              <Button sx={{ mt: 2 }} variant="outlined" color="primary">
                Fill in the description
              </Button>
            }
          />
        )}
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6">Main topics</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {mainTopics.map((category) => (
            <Chip key={category} label={category} variant="soft" />
          ))}
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h6">Tags</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {tags.map((category) => (
            <Chip key={category} label={category} variant="soft" />
          ))}
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h6">Available languages</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {languages.map((language) => (
            <Chip key={language} label={language} variant="soft" />
          ))}
        </Stack>
      </Stack>
    </>
  );

  const renderOverview = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
        {
          label: 'Date Created',
          value: fDate(createdAt),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: sessionAmount ? 'Sessions amount' : endDate ? 'Expiration date' : null,
          value: sessionAmount ? `${sessionAmount} sessions` : endDate ? fDate(endDate) : null,
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Schedule type',
          value: `${
            sessionDuration === 'Custom' ? customSessionMinutes : sessionDuration
          }min / Session`,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Frecuency',
          value: capitalize(sessionPeriodicity),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Price',
          value: `${price} USD`,
          icon: <Iconify icon="pepicons-pop:dollar" />,
        },
      ]
        .filter((item) => item.label)
        .map((item) => (
          <Stack key={item.label} spacing={1.5} direction="row">
            {item.icon}
            <ListItemText
              primary={item.label}
              secondary={item.value}
              primaryTypographyProps={{
                typography: 'body2',
                color: 'text.secondary',
                mb: 0.5,
              }}
              secondaryTypographyProps={{
                typography: 'subtitle2',
                color: 'text.primary',
                component: 'span',
              }}
            />
          </Stack>
        ))}
    </Stack>
  );

  const renderCompany = (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={2}
      direction="row"
      sx={{ p: 3, borderRadius: 2, mt: 3 }}
    >
      <Avatar alt={coachName} src={coachLogo} variant="rounded" sx={{ width: 64, height: 64 }} />

      <Stack spacing={1}>
        <Typography variant="subtitle1">{coachName}</Typography>
        <Typography variant="body2">{currentCoach.profileInfo.brandName}</Typography>
      </Stack>
    </Stack>
  );

  const renderDetails = (
    <Stack component={Card} spacing={3}>
      <Grid container>
        <Grid xs={12} md={6} sx={{ position: 'relative', aspectRatio: '1 / 1', width: '100%' }}>
          <Image
            sizes="100%"
            alt="image description service"
            src={image}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Grid>

        <Grid xs={12} md={5.5} sx={{ ml: 2 }}>
          <ServiceDetailsSummary
            handleEditClick={handleEditClick}
            service={service}
            isPublic={isPublic}
          />
        </Grid>
      </Grid>
    </Stack>
  );

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 1 },
      }}
    >
      {SERVICE_DETAILS_CONTENT_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'reviews' ? (
              <Label variant="filled">{detailsReview?.totalReviews}</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  const renderContentTabs = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      {renderTabs}
      {currentTab === 'service-description' && service && renderContent}
      {currentTab === 'reviews' && (
        <Reviews
          entity="service"
          reviews={reviews}
          setReviews={setReviews}
          detailsReview={detailsReview}
          isPublic={isPublic}
          entityId={service._id}
          noCard
        />
      )}
    </Stack>
  );

  return (
    <Grid container spacing={3} alignItems="start">
      <Grid xs={12}>{renderDetails}</Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {!isPublic && service && <ServiceAnalytics service={service} />}
          {renderContentTabs}
        </Stack>
      </Grid>

      <Grid xs={12} md={4}>
        {renderOverview}
        {renderCompany}
      </Grid>
    </Grid>
  );
}

ServiceDetails.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    reviews: PropTypes.array,
    tags: PropTypes.array,
    createdAt: PropTypes.string,
    experience: PropTypes.string,
    expiredDate: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    sessionDuration: PropTypes.number,
    price: PropTypes.number,
  }),
  isPublic: PropTypes.bool,
};
