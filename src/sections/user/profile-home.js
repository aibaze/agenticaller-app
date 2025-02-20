'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { _mock, _socials } from 'src/_mock';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import UserStoryTime from 'src/sections/storytime/user-storytime';
import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';
import EmptyContent from 'src/components/empty-content/empty-content';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { capitalize } from 'src/utils/format-string';

import ShareIcon from '@mui/icons-material/Share';

/* eslint-disable perfectionist/sort-imports */
import 'src/utils/highlight';
import 'react-quill/dist/quill.snow.css';
import { calculateRatingStats } from 'src/utils/ratings';
import { MoreVert, AutoAwesome } from '@mui/icons-material/';
import Reviews from '../reviews/reviews';
import BackgroundModal from './edit-modals/background-modal';
import SocialsModal from './edit-modals/socials-modal';
import { WelcomeModal, WelcomeBanner } from './edit-modals/welcome-modal';
import ProfileAnalitycs from './profile-analitycs';
import Popover from '@mui/material/Popover';
import EditIcon from '@mui/icons-material/Edit';

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

// ----------------------------------------------------------------------
export default function ProfileHome({ info, isPublic, services, handleOpenModal, setRunGuide }) {
  const { currentCoach } = useAuthContext();
  const [modalBackgroundOpen, setModalBackgroundOpen] = useState(false);
  const [modalSocialsOpen, setModalSocialsOpen] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);
  const [infoPopupAnchorEl, setInfoPopupAnchorEl] = useState(null);
  const [anchorElBackground, setAnchorElBackground] = useState(null);
  const [anchorElSocials, setAnchorElSocials] = useState(null);
  const [reviews, setReviews] = useState(currentCoach?.reviews || []);
  const detailsReview = calculateRatingStats(reviews);

  const handleOpenInfoPopup = (event) => {
    setInfoPopupAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setInfoPopupAnchorEl(null);
  };

  const infoPopupMenuOpen = Boolean(infoPopupAnchorEl);
  const id = infoPopupMenuOpen ? 'edit-popover' : undefined;

  const handleOpenModalBackground = (data) => {
    setModalBackgroundOpen(true);
  };

  const handleClickBackground = (event) => {
    setAnchorElBackground(event.currentTarget);
  };

  const handleClickSocials = (event) => {
    setAnchorElSocials(event.currentTarget);
  };

  const handleCloseBackground = () => {
    setAnchorElBackground(null);
  };

  const handleCloseSocials = () => {
    setAnchorElSocials(null);
  };

  const handleOpenModalSocials = () => {
    setModalSocialsOpen(true);
  };

  const handleCloseModalBackground = () => {
    setModalBackgroundOpen(false);
  };
  const handleCloseModalSocials = () => {
    setModalSocialsOpen(false);
  };
  const Category = ({ yof, category, speciality }) => {
    return (
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Iconify icon="ic:round-business-center" width={24} sx={{ minWidth: '24px' }} />
        <Box sx={{ typography: 'body2' }}>
          {yof} years of experience in{' '}
          <Link variant="subtitle2" color="inherit">
            {category}
          </Link>{' '}
          Specialized in{' '}
          <Link variant="subtitle2" color="inherit">
            {speciality}
          </Link>
        </Box>
      </Stack>
    );
  };

  const renderInfo = (
    <Card>
      <CardHeader
        title="Info"
        action={
          !isPublic && (
            <IconButton onClick={handleOpenInfoPopup}>
              <MoreVert />
            </IconButton>
          )
        }
      />

      <Popover
        id={id}
        open={infoPopupMenuOpen}
        anchorEl={infoPopupAnchorEl}
        onClose={handleClose}
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
          onClick={() => {
            handleOpenModal();
            handleClose();
          }}
          sx={{ textTransform: 'none', fontWeight: 'bold', width: 100 }}
        >
          Edit
        </Button>
      </Popover>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid xs={12}>
          {currentCoach?.profileInfo?.location && (
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Iconify icon="mingcute:location-fill" width={24} />

              <Link variant="body2" color="inherit">
                {currentCoach?.profileInfo?.location}
              </Link>
            </Stack>
          )}

          <Stack direction="row" sx={{ typography: 'body2' }}>
            <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
            {currentCoach?.email}
          </Stack>
        </Grid>
        <Grid xs={12}>
          <Category
            category={currentCoach.profileInfo.category}
            yof={currentCoach.profileInfo.yof}
            speciality={currentCoach.profileInfo.speciality}
          />
        </Grid>
      </CardContent>
    </Card>
  );

  const renderAbout = (
    <>
      <Card sx={{}}>
        <Box>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', gap: 5 }}>
                <Typography variant="h5" component="h4" sx={{ mb: 1 }}>
                  Background
                </Typography>
                {!isPublic && (
                  <Chip
                    sx={{ background: '#F2F3F5', color: '#637381' }}
                    icon={
                      <AutoAwesome
                        sx={{
                          fill: '#637381',
                        }}
                      />
                    }
                    label="Description Created with AI"
                  />
                )}
              </Box>
            }
            action={
              !isPublic && (
                <IconButton onClick={handleClickBackground}>
                  <MoreVert />
                </IconButton>
              )
            }
          />
          <Popover
            id={id}
            open={Boolean(anchorElBackground)}
            anchorEl={anchorElBackground}
            onClose={handleCloseBackground}
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
              onClick={() => {
                handleOpenModalBackground();
                handleCloseBackground();
              }}
              sx={{ textTransform: 'none', fontWeight: 'bold', width: 100 }}
            >
              Edit
            </Button>
          </Popover>

          <Stack spacing={2} sx={{ p: 1.5 }}>
            {currentCoach?.profileInfo.description ? (
              <ReactQuill
                value={currentCoach?.profileInfo.description}
                readOnly
                modules={{
                  toolbar: false,
                }}
              />
            ) : isPublic ? (
              <EmptyContent filled title="No description" sx={{ py: 10 }} />
            ) : (
              <EmptyContent
                filled
                title="Fill in your professional description"
                sx={{ py: 10 }}
                action={
                  <Button
                    onClick={handleOpenModalBackground}
                    sx={{ mt: 2 }}
                    variant="outlined"
                    color="primary"
                  >
                    Fill in the description
                  </Button>
                }
              />
            )}
          </Stack>
          {!isPublic && (
            <>
              <Divider />
              <Typography
                variant="caption"
                sx={{
                  mb: 2,
                  mt: 2,
                  color: '#637381',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <AutoAwesome
                  sx={{
                    fill: '#637381',
                    mr: 2,
                  }}
                />
                Edit your background clicking the corner menu
              </Typography>
            </>
          )}
        </Box>
      </Card>
      {!isPublic && <ProfileAnalitycs />}
    </>
  );
  const renderSocials = (
    <Card>
      <CardHeader
        title="Social"
        action={
          !isPublic && (
            <IconButton className="add-social-icon-button" onClick={handleClickSocials}>
              <MoreVert />
            </IconButton>
          )
        }
      />
      <Popover
        id={id}
        open={Boolean(anchorElSocials)}
        anchorEl={anchorElSocials}
        onClose={handleCloseSocials}
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
          onClick={() => {
            handleOpenModalSocials();
            handleCloseSocials();
          }}
          sx={{ textTransform: 'none', fontWeight: 'bold', width: 100 }}
        >
          Edit
        </Button>
      </Popover>

      <Stack spacing={2} sx={{ p: 3 }}>
        {currentCoach.profileInfo.socialLinks.map((link) => {
          const socialData = _socials.find((social) => social.value === link.label);
          return (
            socialData && (
              <Stack
                key={link._id}
                spacing={2}
                direction="row"
                alignItems="center"
                sx={{ wordBreak: 'break-all', typography: 'body2' }}
              >
                <Iconify
                  icon={socialData.icon}
                  width={24}
                  sx={{
                    flexShrink: 0,
                    color: socialData.color,
                  }}
                />
                <Link
                  color="inherit"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  {capitalize(link.label)}
                </Link>
              </Stack>
            )
          );
        })}
      </Stack>
      {!isPublic && (
        <>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                component="span"
                sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}
              >
                <ShareIcon fontSize="small" />
              </Box>
              <Typography variant="h5" component="h4" sx={{ mb: 1 }}>
                Click on Social Media
              </Typography>
            </Stack>

            <Typography variant="body2" component="p" sx={{ color: 'text.secondary', mt: 1 }}>
              when clients check your social media links
            </Typography>
          </Box>
        </>
      )}
    </Card>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {/* DESKTOP LAYOUT */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Grid container spacing={2}>
            <Grid xs={12} md={8} container direction="column" spacing={2}>
              <Grid>
                {!isPublic && (
                  <Stack spacing={3}>
                    <WelcomeBanner fromPage="HOME" />
                  </Stack>
                )}
                <Stack spacing={3}>{renderAbout}</Stack>{' '}
              </Grid>
              <Grid>
                <Reviews
                  entityId={currentCoach._id}
                  entity={'coach'}
                  reviews={reviews}
                  setReviews={setReviews}
                  detailsReview={detailsReview}
                  isPublic={isPublic}
                />
              </Grid>
            </Grid>
            <Grid xs={12} md={4} container direction="column" spacing={2}>
              <Grid>{renderInfo}</Grid>
              <Grid>
                <UserStoryTime
                  history={currentCoach.profileInfo.experience}
                  isPublic={isPublic}
                  EditIcon={EditIcon}
                />
              </Grid>
              <Grid>{renderSocials}</Grid>
            </Grid>
          </Grid>
        </Box>

        {/*MOBILE LAYOUT */}

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Grid container spacing={2}>
            <Grid xs={12} container direction="column" spacing={2}>
              {/* <Grid>
                <Stack spacing={3}>{renderAbout}</Stack>
              </Grid> */}
              <Grid>
                <UserStoryTime
                  history={currentCoach.profileInfo.experience}
                  isPublic={isPublic}
                  EditIcon={EditIcon}
                />
              </Grid>
              <Grid>{renderSocials}</Grid>
              <Grid>
                <Reviews
                  entityId={currentCoach._id}
                  entity={'coach'}
                  reviews={reviews}
                  setReviews={setReviews}
                  detailsReview={detailsReview}
                  isPublic={isPublic}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {!isPublic && (
        <BackgroundModal
          initialData={currentCoach.profileInfo.description}
          open={modalBackgroundOpen}
          handleClose={handleCloseModalBackground}
        />
      )}
      {!isPublic && (
        <SocialsModal
          initialData={currentCoach.profileInfo.socialLinks}
          open={modalSocialsOpen}
          handleClose={handleCloseModalSocials}
        />
      )}
      {!isPublic && (
        <WelcomeModal
          isPublic={isPublic}
          open={welcomeModalOpen}
          handleClose={() => {
            setWelcomeModalOpen(false);
            setRunGuide(true);
          }}
        />
      )}
    </>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
};
