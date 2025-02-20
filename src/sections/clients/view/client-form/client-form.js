import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Scrollbar from 'src/components/scrollbar';
import SvgColor from 'src/components/svg-color';
import Editor from 'src/components/editor';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useSnackbar } from 'src/components/snackbar';
import { getServicesByCoach } from 'src/api/coach';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from 'src/auth/hooks';
import { createStudent, editStudent } from 'src/api/student';
import { ClientModalConfirm } from '../success-modal/success-modal';
import { getInitials } from 'src/utils/format-string';

// ----------------------------------------------------------------------
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';
import { Typography } from '@mui/material';
import QuestionnaireResults from 'src/sections/requests/request-modal/QuestionnaireResults';

const TABLE_HEAD = [
  {
    id: 'service',
    label: 'Service',
    width: 30,

    icon: <SvgColor src={`/assets/icons/navbar/ic_job.svg`} />,
  },
  {
    id: 'amount',
    label: 'Amount',
    width: 60,

    icon: <SvgColor src={`/assets/icons/navbar/ic_invoice.svg`} />,
  },
  {
    id: 'date',
    label: 'Due Date',
    width: 100,
  },
  {
    id: 'status',
    width: 100,

    label: 'Status',
    width: 100,
  },

  {
    width: 100,

    id: 'actions',
    label: 'Actions',
  },
];

export default function NewClientModal({ openModal, setOpenModal, editRowData, updateTable }) {
  const { currentCoach } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [coachServices, setCoachServices] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const isEditing = editRowData && Object.keys(editRowData).length !== 0;
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [tabValue, setTabValue] = React.useState('1');
  const [clientNotes, setClientNotes] = React.useState(editRowData?.noteAbout || '');
  const theme = useTheme();
  const table = useTable();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // Update validation schema to match fields in the form
  const studentSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
  });

  const methods = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      country: '',
    },
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
        widget_name: 'create_client',
        is_editing: Boolean(isEditing),
      });
      //Submit new client or edit data depending on edit state
      if (isEditing) {
        await editStudent(editRowData._id, editRowData.coachId, data);
        setModalConfirmOpen(true);
        updateTable();
      } else {
        await createStudent({
          ...data,
          coachId: currentCoach?._id,
        });
        setModalConfirmOpen(true);
        updateTable();
      }
      setIsLoading(false);
      reset();
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(typeof error === 'string' ? error : error.message, { variant: 'error' });
      console.error(error);
    }
  });

  const handleModalClose = () => {
    setModalConfirmOpen(false);
    setOpenModal(false);
  };

  useEffect(() => {
    const getServices = async () => {
      try {
        const { data } = await getServicesByCoach(currentCoach?._id);
        setCoachServices(data?.services || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        enqueueSnackbar('Failed to load services', { variant: 'error' });
      }
    };
    getServices();
  }, [currentCoach?._id, enqueueSnackbar]);

  useEffect(() => {
    if (editRowData) {
      reset({
        fullName: editRowData.fullName || '',
        email: editRowData.email || '',
        phoneNumber: editRowData.phoneNumber || '',
        country: editRowData.country || '',
      });
      setClientNotes(editRowData?.noteAbout || '');
    }
  }, [editRowData, coachServices, reset]);

  const onClose = () => {
    setOpenModal(false);
  };

  const updateNotes = async () => {
    setIsLoading(true);
    await editStudent(editRowData._id, editRowData.coachId, { noteAbout: clientNotes });
    setModalConfirmOpen(true);
    setIsLoading(false);
    updateTable();
  };

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <RHFTextField
            name="fullName"
            placeholder="Full name"
            label="Full name"
            variant="outlined"
            sx={{ mb: 2 }}
            inputProps={{ autoComplete: 'off', id: 'fullNameField' }} // Add a unique id
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <RHFTextField
            name="email"
            placeholder="Email"
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <RHFTextField
            name="phoneNumber"
            placeholder="Phone Number"
            label="Phone Number"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <RHFTextField
            name="country"
            placeholder="Country"
            label="Country"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>

        {isEditing && (
          <Grid item xs={12} sm={12}>
            <Autocomplete
              multiple
              filterSelectedOptions
              label="Adquired services"
              value={editRowData?.servicesDetails || []}
              renderInput={(params) => (
                <TextField {...params} label="Services" placeholder="Services" />
              )}
              options={[]}
              disabled={true}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderOption={(props, option) => (
                <li {...props} key={option._id}>
                  {option.title}
                </li>
              )}
              sx={{ mb: 2, width: '100%' }}
            />
          </Grid>
        )}
      </Grid>
    </FormProvider>
  );

  const renderPayments = (
    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
      <Scrollbar>
        <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            headLabel={TABLE_HEAD}
            rowCount={editRowData.bills?.length}
            numSelected={table.selected.length}
            onSort={table.onSort}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row) => row.id)
              )
            }
          />
          <TableBody>
            {editRowData.bills?.map((row) => (
              <TableRow>
                <TableCell>
                  <Avatar src={row.serviceImage} />
                </TableCell>
                <TableCell>
                  <Typography>{row.amount || 1000}</Typography>
                </TableCell>
                <TableCell>{row.date || 'hoy'}</TableCell>
                <TableCell>{row.status || 'paid'}</TableCell>
                <TableCell>
                  <Button>Send reminder</Button>
                </TableCell>
              </TableRow>
            ))}

            <TableEmptyRows
              emptyRows={emptyRows(table.page, table.rowsPerPage, editRowData.bills?.length)}
            />
            <TableNoData
              notFound={editRowData.bills?.length === 0}
              noContentText={'Add your client bills'}
            ></TableNoData>
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );

  const renderNotes = (
    <Grid
      item
      xs={12}
      sm={12}
      sx={{ width: '100%', pl: 5, pr: 5 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h3" textAlign="center">
        Save any note about {editRowData?.fullName || 'Your client'}
      </Typography>

      <Typography variant="h6" sx={{ color: '#637381', mb: 5, mt: 3 }}>
        This is private and only you can see it
      </Typography>

      <Editor
        simple
        sx={{ width: '100%', height: '100%' }}
        id="editor"
        placeholder={`Write something about ${editRowData?.fullName || 'Your client'}...`}
        value={clientNotes}
        onChange={(value) => {
          setClientNotes(value);
        }}
      />
    </Grid>
  );

  const renderQuestionnaires = (
    <QuestionnaireResults questionnaireResults={editRowData.questionnaires} multiple />
  );

  return (
    <>
      <Dialog
        open={openModal}
        onClose={onClose}
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            minWidth: isEditing ? '70vw' : '50vw', // Set your desired minimum width here
            minHeight: isEditing ? '70vh' : 'fit-content', // Set your desired minimum width here
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isEditing && (
            <Avatar sx={{ bgcolor: theme.palette.primary.main, fontSize: '16px' }}>
              {getInitials(editRowData.fullName)}
            </Avatar>
          )}
          {isEditing ? editRowData.fullName : 'New Client'}
        </DialogTitle>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            pl: 5,
            pr: 5,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.primary.main, // Replace with your desired color
              },
            }}
            aria-label="secondary tabs example"
          >
            <Tab value="1" label="Data" />
            <Tab value="2" label="Payments" disabled={true} />
            <Tab value="3" label="Notes" disabled={!isEditing} />
            <Tab value="4" label="Questionnaires" disabled={!isEditing} />
          </Tabs>
        </Box>
        <DialogContent>
          {tabValue === '1' && renderForm}
          {tabValue === '2' && renderPayments}
          {tabValue === '3' && renderNotes}
          {tabValue === '4' && renderQuestionnaires}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading || isSubmitting}
            onClick={(event) => {
              if (tabValue === '3') {
                return updateNotes();
              }
              onSubmit(event);
            }}
            variant="contained"
            sx={{
              borderRadius: '50px',
            }}
          >
            {isEditing ? 'Update' : 'Save'}
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            sx={{
              borderRadius: '50px',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ClientModalConfirm
        open={modalConfirmOpen}
        onClose={handleModalClose}
        editing={isEditing}
      ></ClientModalConfirm>
    </>
  );
}

NewClientModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  editRowData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    noteAbout: PropTypes.string,
    servicesDetails: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    phoneNumber: PropTypes.string,
    country: PropTypes.string,
  }),
};
