'use client';

import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';
import { updateService } from 'src/api/coach';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import { useSnackbar } from 'src/components/snackbar';

import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';

import ServiceDetails from '../service-details';
import ServiceDetailsToolbar from '../service-details-toolbar';

import { getServicesById } from 'src/api/coach';
import { useAuthContext } from 'src/auth/hooks';
import ServiceNewEditForm from 'src/sections/user/profile-create-service-modal';
import useHasBeenRenderedBefore from '../visits-service-hook';
import { sendRenderView } from 'src/api/view';
import ProfileCalendar from 'src/sections/user/profile-calendar';
import { useSearchParams } from 'src/routes/hooks';
import { RequestModal } from 'src/sections/requests/request-modal/request-modal';
import { getRequest, sendClientRequest } from 'src/api/requests';
import { RequestModalConfirm } from 'src/sections/requests/request-modal-confirm/request-modal-confirm';

export const SERVICE_PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

export const SERVICE_DETAILS_TABS = [
  { value: 'service-detail', label: 'Service Detail' },
  { value: 'spots-available', label: 'Spots Available' },
];

export default function ServiceDetailsView({ serviceId, isPublic }) {
  const settings = useSettingsContext();
  const router = useRouter();
  const currentCoach = useAuthContext();
  const [open, setOpen] = useState(false);
  const [publish, setPublish] = useState('published');
  const [service, setService] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('fromRequestId');
  const [currentTab, setCurrentTab] = useState('service-detail');
  const [openModal, setOpenModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);

  const { checkHasBeenRenderedBefore, setFirstRender } = useHasBeenRenderedBefore(
    'service',
    service?._id
  );
  const handleModalClose = () => {
    setModalConfirmOpen(false);
  };
  const setRenderViews = async () => {
    const coachId = service?.coachId;
    const serviceId = service?._id;

    if (isPublic && coachId && service.views) {
      const { uniqueVisits, totalVisits } = service.views;
      const hasBeenRenderedBefore = checkHasBeenRenderedBefore();

      const newVisits = {
        views: {
          uniqueVisits: hasBeenRenderedBefore ? uniqueVisits : uniqueVisits + 1,
          totalVisits: totalVisits + 1,
        },
      };

      try {
        await sendRenderView('service', serviceId, newVisits);
        if (!hasBeenRenderedBefore) setFirstRender();
      } catch (e) {
        console.error("Couldn't set render views");
      }
    }
  };

  useEffect(() => {
    setRenderViews();
  }, [service]);

  const publicServiceDetailUrl = `${paths.info.root}/${currentCoach.currentCoach.slug}/?tab=services`;
  const privateServiceDetailUrl = `${paths.profile.root}/?tab=services`;

  const getService = async () => {
    try {
      const response = await getServicesById(serviceId);
      setService(response.data.service);
      const publishedState = response.data.service.published ? 'published' : 'draft';
      setPublish(publishedState);
    } catch (e) {
      router.push('/404');
    }
  };

  const backLink = isPublic ? publicServiceDetailUrl : privateServiceDetailUrl;

  const handleAnswer = useCallback(
    async (id, answer) => {
      try {
        await sendClientRequest(id, { message: answer, requestId: id });
        setModalConfirmOpen(true);
        enqueueSnackbar('Successfully responded', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Failed to submit the request', { variant: 'error' });
        console.error('Failed to submit the answer:', error);
      }
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (isPublic && requestId) {
          const requestData = await getRequest(requestId);
          setCurrentMessage(requestData.request);
          setOpenModal(true);
        }
      } catch (error) {
        console.error('Error fetching request:', error);
      }
    };

    fetchRequest();
  }, [isPublic, requestId]);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleCopyUrl = () => {
    const url = `${window.location.host}${paths.info.root}/${currentCoach.currentCoach.slug}/services/${serviceId}`;
    navigator.clipboard.writeText(url);
    enqueueSnackbar('URL copied to your clipboard, feel free to share it !', {
      variant: 'success',
      autoHideDuration: 6000,
    });
  };

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangePublish = async () => {
    try {
      const newPublishedState = !service.published;
      await updateService(service._id, { ...service, published: newPublishedState });
      getService();
      enqueueSnackbar('Update success!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
      console.error(error);
    }
  };
  useEffect(() => {
    getService();
  }, [open]);

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab} sx={{ mb: { xs: 3, md: 5 } }}>
      {SERVICE_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'spots-available' ? (
              <Label variant="filled">{service?.seatsLeft}</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <ServiceDetailsToolbar
          backLink={backLink}
          serviceId={service?._id}
          editClick={handleEditClick}
          copyUrl={handleCopyUrl}
          publish={publish || ''}
          onChangePublish={handleChangePublish}
          publishOptions={SERVICE_PUBLISH_OPTIONS}
          isPublic={isPublic}
        />
        {renderTabs}
        {currentTab === 'service-detail' && service && (
          <ServiceDetails handleEditClick={handleEditClick} service={service} isPublic={isPublic} />
        )}
        {currentTab === 'spots-available' && <ProfileCalendar isPublic={isPublic} />}
      </Container>
      <RequestModalConfirm
        open={modalConfirmOpen}
        onClose={handleModalClose}
        type={'message'}
        to={'coach'}
      />
      <RequestModal
        open={openModal}
        setOpen={setOpenModal}
        currentMessage={currentMessage}
        currentCoach={currentCoach.currentCoach}
        handleAnswer={handleAnswer}
        clientAnswer
      />
      <ServiceNewEditForm currentService={service} open={open} setOpen={setOpen} />
    </>
  );
}

ServiceDetailsView.propTypes = {
  serviceId: PropTypes.string,
  isPublic: PropTypes.bool,
};
