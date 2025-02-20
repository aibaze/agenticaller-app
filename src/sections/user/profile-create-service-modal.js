import * as React from 'react';
import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { executePrompt } from 'src/api/openAI';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { ColorPicker } from 'src/components/color-utils';
import Dialog from '@mui/material/Dialog';
import {
  Box,
  Card,
  Chip,
  TextField,
  Stack,
  Divider,
  Slide,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputAdornment,
  Grid,
  CardHeader,
  CircularProgress,
} from '@mui/material';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { Info, AccessTimeFilled, AutoAwesome } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFMultiCheckbox,
  RHFAutocomplete,
  RHFTextFieldStepper,
  RHFTextFieldWithSelect,
  RHFSwitch,
} from 'src/components/hook-form';
import { useResponsive } from 'src/hooks/use-responsive';
import { updateService, createCoachService } from 'src/api/coach';
import Upload from 'src/components/fileUpload/upload';
import { uploadPhoto } from 'src/api/files';
import { useAuthContext } from 'src/auth/hooks';
import { notifyError } from 'src/utils/bugsnag';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import {
  SERVICE_TIME_OPTIONS,
  SERVICE_DAYS_AVAILABILITY,
  SERVICE_PERIODICITY,
  SERVICE_LANGUAGES,
  SERVICE_TAGS,
  SERVICE_MAIN_TOPICS,
  SERVICE_CATEGORIES,
} from 'src/_mock';
import { ServiceModalConfirm } from './modal-success';
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock';
import { ImproveWithAISection } from 'src/components/ImproveWithAIModal/ImproveWithAISection';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
// ----------------------------------------------------------------------

const ListErrors = ({ listErrors }) => {
  if (!Object.entries(listErrors)[0]) return null;

  return (
    <Stack direction="column" mr={2} textAlign="right">
      {Object.entries(listErrors).map((error) => (
        <Typography sx={{ fontSize: '0.75rem' }} color="error">
          {error[1].message}
        </Typography>
      ))}
    </Stack>
  );
};

const RenderProperties = ({
  control,
  errors,
  handleDropSingleFile,
  selectedImage,
  setSelectedImage,
  methods,
  trigger,
}) => {
  const mdUp = useResponsive('up', 'md');

  const helperWithIcon = (text) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Info sx={{ width: '20px' }} />
      {text}
    </Box>
  );
  const sessionDuration = useWatch({ control, name: 'sessionDuration' });
  const sessionPeriodicity = useWatch({ control, name: 'sessionPeriodicity' });
  const isHidePrice = useWatch({ control, name: 'hidePrice' });
  const isDiscount = useWatch({ control, name: 'discount' });
  const endDate = useWatch({ control, name: 'endDate' });
  const sessionAmount = useWatch({ control, name: 'sessionAmount' });

  return (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            → Schedule & Availability
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Choose your the avaiable days/hours <br /> that clients will see in the booking system
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Select your available days</Typography>
          <RHFMultiCheckbox
            sx={{ mb: 2 }}
            row={true}
            name="workDays"
            options={SERVICE_DAYS_AVAILABILITY}
          />
        </Stack>

        <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'row', mt: 2, mb: 2 }}>
          <Typography variant="subtitle2">Available from</Typography>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Available from"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) => {
                  field.onChange(newValue ? dayjs(newValue) : null);
                  trigger(['startTime', 'endTime']);
                }}
                views={['hours']}
                ampm={true}
              />
            )}
          />
          <Divider
            orientation="vertical"
            sx={{
              borderBottomWidth: '60px',
            }}
          />
          <Typography variant="subtitle2">Available until</Typography>
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Available until"
                er
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) => {
                  field.onChange(newValue ? dayjs(newValue) : null);
                  trigger(['startTime', 'endTime']);
                }}
                views={['hours']}
                ampm={true}
              />
            )}
          />
        </Stack>
        {errors.startTime && (
          <Typography variant="caption" sx={{ fontSize: '0.75rem' }} color="error">
            {errors.startTime.message} <br />
          </Typography>
        )}
        {errors.endTime && (
          <Typography variant="caption" sx={{ fontSize: '0.75rem' }} color="error">
            {errors.endTime.message}
          </Typography>
        )}
      </Grid>

      <Divider sx={{ heigth: '2px', width: '100%' }} />

      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            → Session Frequency
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Define how often sessions occur
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Session Duration</Typography>
          <RHFRadioGroup
            row
            spacing={4}
            name="sessionDuration"
            options={SERVICE_TIME_OPTIONS}
            sx={{ marginLeft: 1 }}
          />

          {sessionDuration === 'Custom' && (
            <RHFTextFieldWithSelect
              name="customSessionMinutes"
              helperText={helperWithIcon('Set the amount of time in minutes')}
              options={[15, 30, 75]}
              sx={{ width: '100%', maxWidth: '220px' }}
              placeholder="ex: 20"
              suffix="min"
              maxValue={240}
              prefixIcon={<AccessTimeFilled sx={{ color: 'text.primary' }} />}
              type="number"
            />
          )}
        </Stack>

        <Stack spacing={1} sx={{ mt: 2, mb: 2 }}>
          <Typography variant="subtitle2">Session Frequency</Typography>
          <RHFRadioGroup
            row
            spacing={4}
            name="sessionPeriodicity"
            options={SERVICE_PERIODICITY}
            sx={{ marginLeft: 1 }}
          />
        </Stack>

        {sessionPeriodicity !== 'one-time' && !endDate && (
          <Stack spacing={2}>
            <Typography variant="subtitle2">Amount of sessions (Optional)</Typography>

            <RHFTextFieldStepper
              name="sessionAmount"
              placeholder="0"
              type="number"
              size="small"
              sx={{ maxWidth: 270 }}
              helperText={helperWithIcon('Session amount is optional')}
            />
          </Stack>
        )}
      </Grid>

      <Divider sx={{ heigth: '2px', width: '100%' }} />

      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            → Pricing
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Set your service rate
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Price</Typography>

          <RHFSwitch name="hidePrice" label="Hide price" />

          {!isHidePrice && (
            <>
              <RHFTextField
                disabled={isHidePrice}
                name="price"
                placeholder="0.00"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFSwitch name="discount" label="Discount" />
              {isDiscount && (
                <RHFTextField
                  label="Sale Price"
                  name="salePrice"
                  placeholder="0.00"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </>
          )}
        </Stack>
      </Grid>
      <Divider sx={{ heigth: '2px', width: '100%' }} />

      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            → Service Image
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload a photo to showcase your service <br /> and improve conversion
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Image</Typography>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Upload
                file={selectedImage}
                onDrop={handleDropSingleFile}
                onDelete={() => {
                  setSelectedImage(null);
                  field.onChange(null);
                }}
              />
            )}
          />
          {errors.image && (
            <Typography sx={{ fontSize: '0.75rem' }} color="error">
              {errors.image.message}
            </Typography>
          )}
        </Stack>
      </Grid>
      <Divider sx={{ heigth: '2px', width: '100%' }} />
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            → Additional Features
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Extra info and optional perks...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={4} sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle2">Spots Available </Typography>

              <RHFTextFieldStepper
                disableLess
                name="totalSeats"
                placeholder="0"
                type="number"
                size="small"
                sx={{ maxWidth: 270 }}
                helperText={helperWithIcon('Set total spots for your service')}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <ColorPicker
                    selected={field.value || ''}
                    onSelectColor={(color) => {
                      if (field.value !== color) {
                        field.onChange(color);
                      }
                    }}
                    colors={CALENDAR_COLOR_OPTIONS}
                  />
                )}
              />
            </Stack>

            {!sessionAmount && sessionPeriodicity !== 'one-time' && (
              <Stack spacing={2}>
                <Typography variant="subtitle2">If this service has an expire date...</Typography>

                <Box justifyContent={'space-between'} display="flex" alignContent={'center'}>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <MobileDatePicker
                        disablePast
                        sx={{ width: '100%' }}
                        label="End Date (Optional)"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) => {
                          field.onChange(newValue ? dayjs(newValue) : null);
                        }}
                      />
                    )}
                  />
                  {endDate && (
                    <Button
                      onClick={() => {
                        methods.setValue('endDate', null);
                      }}
                      sx={{ ml: 2 }}
                      variant="contained"
                    >
                      Reset
                    </Button>
                  )}
                </Box>
              </Stack>
            )}

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Main Topics </Typography>
              <RHFAutocomplete
                name="mainTopics"
                multiple
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Main topics"
                    placeholder="Main topics"
                  />
                )}
                options={SERVICE_MAIN_TOPICS}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Language</Typography>
              <RHFAutocomplete
                name="languages"
                multiple
                options={SERVICE_LANGUAGES.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Languages"
                    placeholder="Languages"
                  />
                )}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Tags (optional)</Typography>
              <RHFAutocomplete
                name="tags"
                multiple
                freeSolo
                options={SERVICE_TAGS.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Tags" placeholder="Tags" />
                )}
                helperText={helperWithIcon('Your client can see this highlights')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );
};

export default function ServiceNewEditForm({ currentService, open, setOpen }) {
  const [selectedImage, setSelectedImage] = useState(currentService?.image || '');
  const { currentCoach } = useAuthContext();
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [questionaryForm, setQuestionaryForm] = useState({
    enabled: false,
    fields: {},
  });
  const [createdServiceId, setCreatedServiceId] = useState(null);
  const [questionaryLoading, setQuestionaryLoading] = useState(false);

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const handleModalClose = () => {
    setModalConfirmOpen(false);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteQuestion = (keyToDelete) => {
    // Convert object to array to make reordering easier
    const fields = questionaryForm.fields;
    const entries = Object.entries(fields);

    // Remove the entry at the specified key
    entries.splice(keyToDelete, 1);

    // Create new object with reordered keys
    const newFields = entries.reduce((acc, [_, value], index) => {
      acc[index] = value;
      return acc;
    }, {});
    setQuestionaryForm({ ...questionaryForm, fields: newFields });
  };

  const NewServiceSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    totalSeats: Yup.number().min(1, 'Spots Available must be greater than zero'),
    sessionAmount: Yup.number().nullable(),
    workDays: Yup.array().min(1, 'Choose at least one date option'),
    sessionDuration: Yup.string().required('Session duration is required'),
    customSessionMinutes: Yup.number('Minutes value is required').when(['sessionDuration'], {
      is: (sessionDuration) => sessionDuration === 'Custom',
      then: (schema) =>
        schema
          .required('Minutes value is required')
          .min(1, 'Set a valid minute value greater than 0')
          .max(240, 'Max minute value is 240'),
      otherwise: (schema) => schema.optional(),
    }),
    sessionPeriodicity: Yup.string().required('Session periodicity is required'),
    price: Yup.string().when(['hidePrice'], {
      is: (hidePrice) => hidePrice === true,
      then: (schema) => schema.optional(),
      otherwise: (schema) =>
        schema
          .required('Price is required')
          .test(
            'is-non-negative',
            'Price must be a non-negative number',
            (value) => !value || parseFloat(value) >= 0
          ),
    }),
    salePrice: Yup.string().when(['discount'], {
      is: (discount) => discount === true,
      then: (schema) =>
        schema
          .required('Sale Price is required')
          .test(
            'is-non-negative',
            'Sale price must be a non-negative number',
            (value) => !value || parseFloat(value) >= 0
          ),
      otherwise: (schema) => schema.optional(),
    }),
    mainTopics: Yup.array().min(1, 'Choose at least one main topic option'),
    languages: Yup.array().min(1, 'Choose at least one language option'),
    tags: Yup.array().optional(),
    published: Yup.boolean(),
    hidePrice: Yup.boolean(),
    discount: Yup.boolean(),
    image: Yup.string().required('Image is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().nullable(),
    startTime: Yup.mixed()
      .required('Start time is required')
      .test('startTime', 'Start time must be before end time', function (startTime) {
        const { endTime } = this.parent;
        if (!startTime || !endTime) return true;

        // Get hour values for comparison
        const startHour = dayjs(startTime).hour();
        const endHour = dayjs(endTime).hour();

        return startHour < endHour;
      }),

    endTime: Yup.mixed()
      .required('End time is required')
      .test('endTime', 'End time must be after start time', function (endTime) {
        const { startTime } = this.parent;
        if (!endTime || !startTime) return true;

        // Get hour values for comparison
        const startHour = dayjs(startTime).hour();
        const endHour = dayjs(endTime).hour();

        return endHour > startHour;
      }),
  });

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * CALENDAR_COLOR_OPTIONS.length);
    return CALENDAR_COLOR_OPTIONS[randomIndex];
  }

  const defaultValues = useMemo(
    () => ({
      title: currentService?.title || '',
      description: currentService?.description || '',
      category: currentService?.category || '',
      totalSeats: currentService?.totalSeats || 0,
      sessionAmount: currentService?.sessionAmount || null,
      workDays: currentService?.workDays || [],
      sessionDuration: currentService?.sessionDuration || '',
      customSessionMinutes: currentService?.customSessionMinutes || 0,
      sessionPeriodicity: currentService?.sessionPeriodicity || '',
      price: currentService?.price || '',
      salePrice: currentService?.salePrice || '',
      mainTopics: currentService?.mainTopics || [],
      languages: currentService?.languages || [],
      tags: currentService?.tags || [],
      startDate: currentService?.startDate || new Date(),
      endDate: currentService?.endDate || null,
      startTime: currentService?.startTime || dayjs(dayjs().hour(9).minute(0)),
      endTime: currentService?.endTime || dayjs(dayjs().hour(18).minute(0)),
      color: currentService?.color || getRandomColor(),
      published: currentService?.published || true,
      hidePrice: currentService?.hidePrice || false,
      discount: currentService?.discount || false,
      image: currentService?.image || '',
    }),
    [currentService]
  );

  const methods = useForm({
    resolver: yupResolver(NewServiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    trigger,
  } = methods;

  useEffect(() => {
    if (currentService) {
      reset(defaultValues);
      setSelectedImage(currentService?.image);
      setQuestionaryForm({
        enabled: currentService?.questionnaire?.length > 0 ? true : false,
        fields: currentService?.questionnaire?.reduce((acc, question, index) => {
          acc[index] = question;
          return acc;
        }, {}),
      });
    } else {
      resetForm();
    }
  }, [currentService, defaultValues, reset, open]);

  const resetForm = () => {
    reset(defaultValues);
    setSelectedImage('');
    setQuestionaryForm({
      enabled: false,
      fields: {},
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
        widget_name: 'create_service_button',
        is_editing: Boolean(currentService?._id),
      });
      if (currentService) {
        const parsedData = questionaryForm.enabled
          ? {
              ...data,
              questionnaire: Object.values(questionaryForm.fields),
            }
          : data;
        await updateService(currentService._id, parsedData);
      } else {
        const response = await uploadPhoto(selectedImage);
        const { image, thumb } = response;
        const dataWithImage = { ...data, image, thumb };
        const parsedData = questionaryForm.enabled
          ? {
              ...dataWithImage,
              questionnaire: Object.values(questionaryForm.fields),
            }
          : dataWithImage;
        const { data: servicesResponse } = await createCoachService(currentCoach?._id, parsedData);
        setCreatedServiceId(servicesResponse?.service?._id);
      }
      enqueueSnackbar(
        currentService ? 'Service edited successfully' : 'Service created successfully'
      );
      if (currentService) {
        handleClose();
      } else {
        setModalConfirmOpen(true);
      }

      resetForm();
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
      notifyError(error, {
        context: 'finish-onboarding',
        user: currentCoach.email,
      });
    }
  });

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];

    if (newFile) {
      setSelectedImage(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }

    methods.setValue('image', newFile, { shouldValidate: true });
  }, []);

  const titleValue = useWatch({ control, name: 'title' });
  const descriptionValue = useWatch({ control, name: 'description' });
  const mainTopicsValue = useWatch({ control, name: 'mainTopics' });
  const categoryValue = useWatch({ control, name: 'category' });

  const titleAndDescription = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            → Service Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Add title, description, and category for your service
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Title</Typography>
              <Box sx={{ display: 'flex', flex: 1 }}>
                <RHFTextField name="title" capital placeholder="Ex: Life coaching consulting..." />
                <ImproveWithAISection
                  onlyIcon={true}
                  currentValue={titleValue}
                  callback={(message) => methods.setValue('title', message)}
                  prompt={`Improve this service title ${titleValue}`}
                  systemPrompt={
                    'You are an expert copywriter, creating a converting title for a coaching service in 30 tokens'
                  }
                  maxTokens={30}
                  section="service title"
                />
              </Box>
              <Typography
                variant="caption"
                textAlign="end"
                sx={{
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <AutoAwesome sx={{ mr: 1 }} />
                Improve your Service-Tittle with AI
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="description" />
              <ImproveWithAISection
                currentValue={descriptionValue}
                callback={(message) => {
                  methods.setValue('description', message);
                }}
                prompt={`Improve this service description ${descriptionValue}`}
                systemPrompt={`You are a professional copywritter, and you will write a converting description in 120 tokens`}
                maxTokens={120}
                section="service description"
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Category</Typography>

              <RHFAutocomplete
                name="category"
                capital
                freeSolo
                options={SERVICE_CATEGORIES}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Divider sx={{ heigth: '2px', width: '100%' }} />
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid
        xs={12}
        md={8}
        sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <RHFSwitch name="published" label="Publish" sx={{ flexGrow: 1, pl: 3, pt: 2 }} />

        <Stack direction="column" alignItems="flex-end" justifyContent="flex-start">
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit}
            loading={isSubmitting}
            sx={{ m: 2, maxWidth: '140px' }}
          >
            {!currentService ? 'Create Service' : 'Save Changes'}
          </LoadingButton>

          <ListErrors listErrors={errors} />
        </Stack>
      </Grid>
    </>
  );

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <Iconify icon="solar:danger-bold" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Service
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <FormProvider disableSubmitOnEnter={true} methods={methods} onSubmit={onSubmit}>
        <Grid container sx={{ padding: { xs: 1, md: 10 }, rowGap: 3 }}>
          {titleAndDescription}

          <RenderProperties
            handleDropSingleFile={handleDropSingleFile}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            errors={errors}
            control={control}
            trigger={trigger}
            methods={methods}
          />

          <>
            <Grid md={4}>
              <FormGroup>
                <FormControlLabel
                  onChange={() => {
                    setQuestionaryForm({ ...questionaryForm, enabled: !questionaryForm.enabled });
                  }}
                  control={<Switch defaultChecked checked={questionaryForm.enabled} />}
                  label="Add onboarding questionnaire"
                />
              </FormGroup>

              <Stack spacing={2} sx={{ pr: 5 }}>
                {questionaryForm.enabled && (
                  <>
                    <Typography variant="subtitle1" sx={{ color: 'text.primary', mt: 2, mb: 2 }}>
                      Questionnaire Preview
                    </Typography>
                    {Object.values(questionaryForm.fields).map((question, index) => (
                      <Stack spacing={2}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Question {index + 1}:{' '}
                        </Typography>
                        <Typography variant="subtitle2">{question}</Typography>
                        <Divider />
                      </Stack>
                    ))}
                  </>
                )}
              </Stack>
            </Grid>
          </>

          <Grid xs={12} md={8}>
            {questionaryForm.enabled && (
              <Stack spacing={2}>
                <Typography variant="h6">Questionnaire</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Add questions to help you understand your client's needs
                </Typography>
                <Divider />
                {Object.keys(questionaryForm.fields).map((questionKey) => (
                  <Stack spacing={2}>
                    <Typography variant="subtitle2">Question {Number(questionKey) + 1}</Typography>
                    <Box display="flex" alignItems="center">
                      <TextField
                        value={questionaryForm.fields[questionKey]}
                        onChange={(event) => {
                          setQuestionaryForm({
                            ...questionaryForm,
                            fields: {
                              ...questionaryForm.fields,
                              [questionKey]: event.target.value,
                            },
                          });
                        }}
                        placeholder="What are your goals?"
                        fullWidth
                        sx={{ mr: 2 }}
                      />
                      <Iconify
                        onClick={() => {
                          handleDeleteQuestion(questionKey);
                        }}
                        sx={{ cursor: 'pointer', color: 'red' }}
                        icon="solar:trash-bin-trash-bold"
                      />
                    </Box>
                  </Stack>
                ))}
                <Box display="flex" sx={{ gap: 5 }}>
                  <Button
                    onClick={() => {
                      setQuestionaryForm({
                        ...questionaryForm,
                        fields: {
                          ...questionaryForm.fields,
                          [Object.keys(questionaryForm.fields).length]: '',
                        },
                      });
                    }}
                    disabled={Object.keys(questionaryForm.fields).length >= 6}
                    sx={{ width: '100%' }}
                    color="primary"
                    variant="outlined"
                  >
                    Add question
                  </Button>
                  {Object.keys(questionaryForm.fields).length < 1 && (
                    <Button
                      onClick={async () => {
                        setQuestionaryLoading(true);
                        try {
                          const { data } = await executePrompt({
                            prompt: `Based on your expertise, create a questionnaire for your clients, Please create it in base of the following information, 1- Service title: ${titleValue}, 2- Service description: ${descriptionValue}, 3- Service category: ${categoryValue}, 4- Service main topics: ${mainTopicsValue.join(
                              ','
                            )}. The output SHOULD NOT HAVE PARSING ERRORS it should be an array of  4 strings with short questions, example ["What are your goals?", "What are your expectations?"], please double check the format to ensure the format is correct, you dont have to use all max tokens, you can use less, but the output should be an array of strings`,
                            systemPrompt:
                              'You are in a coaching automation platform, this is a questionnaire for your clients to fill out before the session',
                            coachId: currentCoach._id,
                            maxTokens: 600,
                          });
                          const dataParsed = JSON.parse(data.message);
                          let questions = {};
                          dataParsed.forEach((question, index) => {
                            questions[index] = question;
                          });
                          setQuestionaryForm({ ...questionaryForm, fields: dataParsed });
                        } catch (error) {
                          enqueueSnackbar(
                            'Something went wrong, please try creating the questionnaire manually',
                            { variant: 'error' }
                          );
                        }
                        setQuestionaryLoading(false);
                      }}
                      color="primary"
                      disabled={questionaryLoading}
                      sx={{ width: '100%' }}
                      variant="contained"
                    >
                      {questionaryLoading ? (
                        <CircularProgress sx={{ color: 'white' }} />
                      ) : (
                        'Generate it with AI'
                      )}
                    </Button>
                  )}
                </Box>
              </Stack>
            )}
          </Grid>

          {renderActions}
        </Grid>
      </FormProvider>
      <ServiceModalConfirm
        resourceId={createdServiceId}
        open={modalConfirmOpen}
        onClose={handleModalClose}
      />
    </Dialog>
  );
}

ServiceNewEditForm.propTypes = {
  currentService: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  coachId: PropTypes.string,
};
