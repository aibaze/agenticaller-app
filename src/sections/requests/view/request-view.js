'use client';

import Container from '@mui/material/Container';
import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';
import { useGetRequests } from 'src/api/request';
import { useSettingsContext } from 'src/components/settings';
import { RequestHeader } from '../request-header/request-header';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { RequestBody } from '../request-body/request-body';
import { answerRequest, deleteRequest, confirmSession } from 'src/api/requests';
import { useEffect, useState, useCallback } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { RequestModalConfirm } from '../request-modal-confirm/request-modal-confirm';

// ----------------------------------------------------------------------

const questionType = 'QUESTION';

export default function RequestView() {
  const { currentCoach } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { requests, requestsLoading, refetch } = useGetRequests(
    currentCoach?._id,
    'service',
    searchTerm
  );
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalConfirmType, setModalConfimType] = useState('session');

  const handleModalClose = () => {
    setModalConfirmOpen(false);
  };

  const handleAnswer = useCallback(
    async (id, answer, type, cb) => {
      try {
        const isQuestion = type === questionType;
        const submitAction = isQuestion ? answerRequest : confirmSession;
        const successMessage = isQuestion
          ? 'Answered submitted successfully'
          : 'Session submitted successfully';

        await submitAction(id, { message: answer });
        setModalConfimType(type === questionType ? 'message' : 'session');
        setModalConfirmOpen(true);
        enqueueSnackbar(successMessage, { variant: 'success' });
        if (cb) {
          cb();
        }

        refetch();
      } catch (error) {
        enqueueSnackbar('Failed to submit the request', { variant: 'error' });
        if (cb) {
          cb(error);
        }
        console.error('Failed to submit the answer:', error);
      }
    },
    [refetch, enqueueSnackbar]
  );

  const handleDeleteRequest = useCallback(
    async (id) => {
      try {
        await deleteRequest(id);
        enqueueSnackbar('Deleted correctly', { variant: 'success' });
        refetch();
      } catch (error) {
        enqueueSnackbar('Failed to delete the request', { variant: 'error' });
        console.error('Failed to delete the request:', error);
      }
    },
    [refetch, enqueueSnackbar]
  );

  const handleSearchTerm = useCallback(
    (value) => {
      if (value !== searchTerm) {
        setSearchTerm(value);
      }
    },
    [searchTerm]
  );

  // Filter the values used in the dropdown at the RequestHeader component
  useEffect(() => {
    if (requests?.byId) {
      const mailArray = Object.values(requests.byId);
      const serviceTitles = mailArray.map((el) => el.serviceTitle);
      const uniqueServiceTitles = [...new Set(serviceTitles)];
      setOptions(uniqueServiceTitles);
    }
  }, [requests]);

  // Filter the table values based on the selected dropdown value in the RequestHeader
  const filteredRequests = selectedOption
    ? Object.values(requests?.byId || {}).filter((req) => req.serviceTitle === selectedOption)
    : Object.values(requests?.byId || {});

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Request"
          links={[
            { name: 'Dashboard', href: paths.profile.overview },
            {
              name: 'Request',
              href: paths.profile.requests,
            },
            { name: 'List' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <RequestHeader
          options={options}
          setSelectedOption={setSelectedOption}
          onSearch={handleSearchTerm}
        />
        <RequestBody
          data={filteredRequests}
          isLoading={requestsLoading}
          currentCoach={currentCoach}
          handleAnswer={handleAnswer}
          handleDeleteRequest={handleDeleteRequest}
        />
      </Container>
      <RequestModalConfirm
        open={modalConfirmOpen}
        onClose={handleModalClose}
        type={modalConfirmType}
        to={'client'}
      />
    </>
  );
}
