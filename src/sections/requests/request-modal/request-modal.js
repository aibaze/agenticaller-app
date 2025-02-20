import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { trackMixPanelEvent, MIXPANEL_ACTION } from 'src/utils/mixpanel';
import {
  Typography,
  Avatar,
  Button,
  Box,
  Modal,
  Stack,
  Divider,
  CircularProgress,
} from '@mui/material';
import { GoogleScopeAuthModal } from 'src/components/GoogleScopeAuthModal/GoogleScopeAuthModal';
import { getServicesById } from 'src/api/coach';
import {
  StyledBox,
  HeaderContainer,
  LabelsContainer,
  StyledLabel,
  DateTypography,
  ContentContainer,
  MessageTypography,
  EditorContainer,
  DateTimeContainer,
  DateTimeBox,
} from './styles';
import Editor from 'src/components/editor';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { fDateTime } from 'src/utils/format-time';
import ServiceRequestDetails from 'src/components/ServiceRequestDetails';
import QuestionnaireResults from './QuestionnaireResults';

const answeredQuestion = 'ANSWERED';
const questionState = 'QUESTION';

export function RequestModal({
  currentMessage = {},
  currentCoach = {},
  open,
  clientAnswer,
  setOpen,
  handleAnswer,
  handleDeleteRequest,
  fromPage,
  ...other
}) {
  const theme = useTheme();
  const [answerField, setAnswerField] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentService, setCurrentService] = useState({});
  const formattedDate = currentMessage.createdAt ? fDateTime(currentMessage.createdAt) : '';

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendCallback = (error) => {
    handleClose();
    setLoading(false);
  };
  const handleSend = () => {
    trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
      widget_name: 'request_modal_confirm',
      request_type: currentMessage.priority,
    });
    setLoading(true);
    handleAnswer(currentMessage._id, answerField, currentMessage.priority, handleSendCallback);
    setAnswerField('');
  };

  const handleDelete = () => {
    trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
      widget_name: 'request_modal_delete',
      request_type: currentMessage.priority,
    });
    handleDeleteRequest(currentMessage._id);
    setAnswerField('');
    handleClose();
  };

  useEffect(() => {
    setAnswerField(clientAnswer ? '' : currentMessage.answer || '');

    const getService = async () => {
      if (currentMessage.serviceId) {
        try {
          const { data } = await getServicesById(currentMessage.serviceId);
          setCurrentService(data.service);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getService();
  }, [currentMessage]);

  const sendButton = () => {
    // Helper function to determine the button label
    const getButtonLabel = (clientAnswer, currentMessage, answeredQuestion, questionState) => {
      if (clientAnswer) {
        return 'Send';
      }

      if (currentMessage.state === answeredQuestion) {
        return currentMessage.priority === questionState ? 'Answered' : 'Confirmed session';
      }

      return currentMessage.priority === questionState ? 'Send' : 'Confirm session';
    };
    return (
      <Button
        onClick={handleSend}
        disabled={clientAnswer ? false : currentMessage.state === answeredQuestion}
        variant="contained"
        color="success"
        startIcon={
          !clientAnswer && currentMessage.state === answeredQuestion ? <DoneAllIcon /> : null
        }
        endIcon={currentMessage.state !== answeredQuestion || clientAnswer ? <SendIcon /> : null}
        sx={{ borderRadius: '20px' }}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          getButtonLabel(clientAnswer, currentMessage, answeredQuestion, questionState)
        )}
      </Button>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <HeaderContainer>
          <LabelsContainer>
            <StyledLabel ownerState={{ bgColor: theme.palette.grey[900] }}>
              {currentMessage.serviceTitle || 'N/A'}
            </StyledLabel>

            <StyledLabel
              ownerState={{
                bgColor:
                  currentMessage.priority === 'QUESTION'
                    ? theme.palette.landing.facebookBlue
                    : theme.palette.success.main,
              }}
            >
              {currentMessage.priority === 'QUESTION' ? 'Message' : 'Session'}
            </StyledLabel>
          </LabelsContainer>
          <DateTypography id="modal-modal-title" variant="overline">
            {formattedDate}
          </DateTypography>
        </HeaderContainer>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          {currentMessage.serviceTitle || 'N/A'}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <ContentContainer>
          <Avatar sx={{ width: 60, height: 60 }}>A</Avatar>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle2">{currentMessage.name}</Typography>
            <Typography
              variant="body2"
              sx={{ wordBreak: 'break-word' }}
              color={theme.palette.grey[600]}
            >
              {currentMessage.email}
            </Typography>
          </Box>
        </ContentContainer>

        <MessageTypography
          id="modal-modal-description"
          dangerouslySetInnerHTML={{
            __html: clientAnswer ? currentMessage.answer : currentMessage.message || 'No message',
          }}
        />

        <QuestionnaireResults questionnaireResults={currentMessage.questionnaire} />

        <EditorContainer>
          <Editor
            id="editor"
            simpleDisable={clientAnswer ? false : currentMessage.state === answeredQuestion}
            user={`${currentCoach.firstName} ${currentCoach.lastName}`}
            placeholder="Write your answer here..."
            readOnly={!clientAnswer && currentMessage.state === answeredQuestion}
            value={answerField}
            onChange={(value) => setAnswerField(value)}
            {...other}
          />
        </EditorContainer>

        {currentMessage.requestedDate && (
          <DateTimeContainer>
            <DateTimeBox>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                Selected date
              </Typography>
              <Typography variant="body2" color={theme.palette.grey[500]}>
                {fDateTime(currentMessage.requestedDate, 'dd MMM yyyy')}
              </Typography>
            </DateTimeBox>
            <DateTimeBox>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                Selected Time
              </Typography>
              <Typography variant="body2" color={theme.palette.grey[500]}>
                {currentMessage?.requestedTime
                  ? fDateTime(currentMessage?.requestedTime, 'HH:mm')
                  : 'N/A'}
              </Typography>
            </DateTimeBox>
          </DateTimeContainer>
        )}

        {currentMessage.priority === 'REQUEST' && currentService._id && (
          <ServiceRequestDetails
            service={currentService}
            request={currentMessage}
            action={'CONFIRM'}
          />
        )}

        <Stack direction="row" justifyContent="space-between">
          {sendButton()}
          {!clientAnswer && (
            <Button onClick={handleDelete} color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          )}
        </Stack>
        {fromPage === 'REQUEST_PAGE' &&
          currentMessage.state === 'NEW' &&
          currentMessage.priority === 'REQUEST' && <GoogleScopeAuthModal />}
      </StyledBox>
    </Modal>
  );
}
