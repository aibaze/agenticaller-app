'use client';
import { useMemo, useState, useEffect, useCallback, forwardRef } from 'react';
import useHasBeenRenderedBefore from '../../services/visits-service-hook';
import { sendRenderView } from 'src/api/view';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useAuthContext } from 'src/auth/hooks';
import { getServicesByCoach } from 'src/api/coach';
import { useSettingsContext } from 'src/components/settings';
import { Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileService from '../profile-services';
import ProfileCalendar from '../profile-calendar';
import ProfileActionRequiredAlert from '../profile-action-required-alert';
import DescriptionModal from '../edit-modals/description-modal';
import { handlePublicViewClick } from 'src/utils/params';
import { paths } from 'src/routes/paths';
import { _userAbout } from 'src/_mock';

const BeaconComponent = forwardRef((props, ref) => {
  return <span ref={ref} {...props} />;
});

function CustomTooltip(props) {
  const { backProps, closeProps, continuous, index, primaryProps, skipProps, step, tooltipProps } =
    props;

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        maxWidth: '320px',
      }}
      {...tooltipProps}
    >
      <button
        style={{
          float: 'right',
          border: 'none',
          background: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: '#666',
          padding: '0 4px',
        }}
        {...closeProps}
      >
        &times;
      </button>
      {step.title && (
        <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{step.title}</h4>
      )}
      <div style={{ marginBottom: '16px', color: '#444' }}>{step.content}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          style={{
            padding: '6px 12px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#666',
          }}
          {...skipProps}
        >
          {skipProps.title}
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          {index > 0 && (
            <button
              style={{
                padding: '6px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer',
                color: '#666',
              }}
              {...backProps}
            >
              {backProps.title}
            </button>
          )}
          {continuous && (
            <button
              style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
                background: '#00A76F',
                color: 'white',
                cursor: 'pointer',
              }}
              {...primaryProps}
            >
              {primaryProps.title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

const getTabs = (requiredActions) => [
  {
    value: 'profile',
    label: 'Profile',
    icon: (
      <Badge color="error" variant="dot" invisible={requiredActions?.profile?.length < 1}>
        <Iconify icon="solar:user-id-bold" width={24} />
      </Badge>
    ),
  },
  {
    value: 'services',
    label: 'Services',
    icon: <Iconify icon="fa6-solid:suitcase" width={24} />,
  },
  {
    value: 'calendar',
    label: 'Calendar',
    icon: <Iconify icon="solar:calendar-date-bold" width={24} />,
  },
  {
    value: 'blog',
    label: 'Blog',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function UserProfileView({ isPublic }) {
  const router = useRouter();
  const settings = useSettingsContext();
  const { currentCoach, authenticated, isPublicUser } = useAuthContext();
  const [openServiceForm, setOpenServiceForm] = useState(false);
  const [services, setServices] = useState([]);
  const [actionRequiredModalData, setActionRequiredModalData] = useState({
    open: false,
    actionKey: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [runGuide, setRunGuide] = useState(false);
  const { checkHasBeenRenderedBefore, setFirstRender } = useHasBeenRenderedBefore(
    'coach',
    currentCoach?._id
  );
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';
  const configParm = searchParams.get('config') || 'false';
  const [currentTab, setCurrentTab] = useState(tab);

  const firstAndLastName = `${currentCoach?.firstName} ${currentCoach?.lastName}`;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeTab = useCallback(
    (event, newValue) => {
      setCurrentTab(newValue);
      router.push(`?tab=${newValue}`, undefined, { shallow: true });
    },
    [router]
  );

  const requiredActions = useMemo(() => {
    const profileRequiredProperties = [
      {
        title: 'Upload profile image',
        key: 'profileImg',
        action: 'Upload',
        handler: () =>
          setActionRequiredModalData({
            open: true,
            actionKey: 'profileImg',
            type: 'file',
            title: 'Upload profile image',
          }),
      },
      {
        title: 'Fill Description',
        key: 'description',
        action: 'Fill it',
        handler: () =>
          setActionRequiredModalData({
            open: true,
            actionKey: 'description',
            type: 'text',
            title: 'Fill Description',
          }),
      },
    ];

    const servicesRequiredProperties = [
      {
        title: 'Create your first service',
        key: 'services',
        action: 'Create',
        handler: () => setOpenServiceForm(true),
      },
    ];

    return {
      profile: profileRequiredProperties.filter(
        (property) => !currentCoach?.profileInfo?.[property.key]
      ),
      services: servicesRequiredProperties.filter(
        (property) => !currentCoach?.[property.key]?.length
      ),
      calendar: [],
    };
  }, [currentCoach]);

  const getServices = useCallback(async () => {
    if (currentCoach) {
      try {
        const response = await getServicesByCoach(currentCoach?._id);
        setServices(response.data?.services);
      } catch (e) {
        console.error(e.message);
      }
    }
  }, [currentCoach, openServiceForm]);

  const setRenderViews = async () => {
    const coachId = currentCoach?._id;
    if (isPublic && coachId && currentCoach.profileViews) {
      const { uniqueVisits, totalVisits } = currentCoach.profileViews;
      const hasBeenRenderedBefore = checkHasBeenRenderedBefore();

      const newVisits = {
        profileViews: {
          uniqueVisits: hasBeenRenderedBefore ? uniqueVisits : uniqueVisits + 1,
          totalVisits: totalVisits + 1,
        },
      };

      try {
        await sendRenderView('coach', currentCoach?._id, newVisits);
        if (!hasBeenRenderedBefore) setFirstRender();
      } catch (e) {
        console.error("Couldn't set render views");
      }
    }
  };

  useEffect(() => {
    setRenderViews();
  }, []);

  useEffect(() => {
    if (currentTab === 'services' || currentTab === 'calendar') {
      getServices();
    }
  }, [currentTab, getServices]);

  useEffect(() => {
    if (!currentCoach?.onBoarded) {
      router.push(paths.onboarding.root);
    }
  }, [currentCoach, router]);

  useEffect(() => {
    if (tab && getTabs(requiredActions).some((t) => t.value === tab)) {
      setCurrentTab(tab);
    }
  }, [tab, requiredActions]);

  useEffect(() => {
    if (configParm === 'true') {
      setIsModalOpen(true);
    }
  }, [configParm]);

  const steps = [
    {
      content: (
        <h3
          style={{
            fontSize: '34px',
            fontFamily: 'degular-text, Degular, sans-serif',
            fontWeight: 500,
            margin: '0',
            marginBottom: '50px',
            marginTop: '35px',
          }}
        >
          Welcome aboard!
          <br /> Lets get started. <CelebrationIcon />
        </h3>
      ),
      locale: { skip: <strong aria-label="skip">Skip Tour</strong> },
      placement: 'center',
      target: 'body',
    },
    {
      target: '.edit-profile-icon-button',
      content: 'Personalize your profile by adding more details here.',
    },
    {
      target: '.public-view-icon-button',
      content: 'Preview how others see your profile with this button.',
    },
    {
      target: '.myservices',
      content: 'Access and manage all your services from this section.',
    },
    {
      target: '.calendar',
      content: 'Check your schedule in the calendar view.',
    },
    {
      target: '.myclients',
      content: 'This is your client dashboard,your hub for managing clients.',
    },
    {
      target: '.requests',
      content: 'View and manage all incoming requests here.',
    },
    {
      target: '.admin-analytics',
      content: 'Track your performance and access admin tools here.',
    },
    {
      target: '.add-social-icon-button',
      content: 'Connect your social media accounts to boost your profile.',
    },
    {
      target: '.accessible-settings-button',
      content: 'Explore accessibility settings to customize your experience.',
    },
    {
      content: (
        <h3
          style={{
            fontSize: '34px',
            fontFamily: 'degular-text, Degular, sans-serif',
            fontWeight: 500,
            margin: '0',
            marginBottom: '50px',
            marginTop: '35px',
          }}
        >
          Need help? We're here for you.
        </h3>
      ),
      locale: { skip: <strong aria-label="skip">Skip Tour</strong> },
      placement: 'center',
      target: 'body',
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Joyride
        beaconComponent={BeaconComponent}
        continuous={true}
        run={runGuide}
        tooltipComponent={CustomTooltip}
        showProgress={true}
        showSkipButton={true}
        steps={steps}
        scrollOffset={64}
        scrollToFirstStep
      />
      {!isPublic && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{ mb: { xs: 3, md: 5 }, justifyContent: 'space-between' }}
        >
          <CustomBreadcrumbs
            heading="Profile"
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: getTabs(requiredActions).find((t) => t.value === currentTab).label },
              ...(currentTab === 'profile' ? [{ name: firstAndLastName }] : []),
            ]}
          />

          <Stack spacing={1} alignItems="flex-start">
            <Button
              className="public-view-icon-button"
              onClick={() => {
                const sendParam = window.location.search.includes('calendar');
                handlePublicViewClick(
                  currentCoach?.slug,
                  sendParam ? window.location.search : '',
                  'profile'
                );
              }}
              variant="outlined"
              sx={{
                borderRadius: 16,
                backgroundColor: 'background.neutral',
                border: '1px solid',
                borderColor: 'grey.300',
                color: 'text.primary',
              }}
              startIcon={
                <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                  <VisibilityIcon fontSize="small" />
                </Box>
              }
            >
              See Public View
            </Button>

            <Typography variant="caption" color="text.secondary">
              See how your profile looks like
            </Typography>
          </Stack>
        </Stack>
      )}

      {authenticated || isPublicUser ? (
        <>
          <Card sx={{ mb: 3, height: { xs: 296, md: 274 } }}>
            <ProfileCover
              isPublic={isPublic}
              onChangeImage={() =>
                setActionRequiredModalData({
                  open: true,
                  actionKey: 'profileImg',
                  type: 'file',
                  title: 'Update profile image',
                  update: true,
                })
              }
              role={currentCoach?.profileInfo?.category}
              name={firstAndLastName}
              avatarUrl={currentCoach?.profileInfo?.profileImg || null}
              coverUrl={_userAbout.coverUrl}
            />

            <Tabs
              value={currentTab}
              onChange={handleChangeTab}
              sx={{
                width: '100%',
                bottom: 0,
                zIndex: 9,
                position: 'absolute',
                bgcolor: 'background.paper',
                [`& .${tabsClasses.flexContainer}`]: {
                  pl: 4,
                  justifyContent: 'flex-start',
                },
              }}
            >
              {getTabs(requiredActions).map((tab) => (
                <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ))}
            </Tabs>
            {!isPublic && (
              <IconButton
                className="edit-profile-icon-button"
                onClick={handleOpenModal}
                sx={{
                  position: 'absolute',
                  right: 35,
                  top: '84%',
                  zIndex: 10,
                }}
              >
                <Iconify icon="mdi:pencil" width={24} />
              </IconButton>
            )}
          </Card>

          {!isPublic && (
            <ProfileActionRequiredAlert
              requiredActions={requiredActions}
              setActionRequiredModalData={setActionRequiredModalData}
              actionRequiredModalData={actionRequiredModalData}
              currentTab={currentTab}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileHome
              setRunGuide={setRunGuide}
              isPublic={isPublic}
              info={_userAbout}
              services={services}
              handleOpenModal={handleOpenModal}
              currentCoach={currentCoach}
            />
          )}

          {currentTab === 'services' && (
            <ProfileService
              open={openServiceForm}
              setOpen={setOpenServiceForm}
              isPublic={isPublic}
              services={services}
              getServices={getServices}
            />
          )}

          {currentTab === 'calendar' && <ProfileCalendar isPublic={isPublic} services={services} />}
        </>
      ) : null}

      <DescriptionModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        initialData={currentCoach}
      />
    </Container>
  );
}

UserProfileView.propTypes = {
  isPublic: PropTypes.bool,
};
