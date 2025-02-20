import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Modal, Chip, CircularProgress, IconButton } from '@mui/material';
import { executePrompt } from 'src/api/openAI';
import { useTheme } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Editor from '../editor';
import { useAuthContext } from 'src/auth/hooks';
import { containsHTML } from 'src/utils/format-string';

export function ImproveWithAIModal({ open, onClose, aiModalProperties, ...other }) {
  const { currentCoach, updateUser } = useAuthContext();
  const theme = useTheme();
  const [notEnoughTokens, setNotEnoughTokens] = useState(false);
  const [currentIteration, setCurrentIteration] = useState({
    text: '',
    attempt: 0,
    loading: false,
  });

  const handleInsertText = () => {
    aiModalProperties.callback(currentIteration.text);
    onClose();
  };

  const handleGetImprovement = async () => {
    if (currentCoach.tokens < 1) {
      setNotEnoughTokens(true);
      return;
    }
    setCurrentIteration({
      ...currentIteration,
      loading: true,
    });
    const { data } = await executePrompt({
      prompt:
        currentIteration.attempt > 0
          ? `Improve this ${aiModalProperties.section}: ${currentIteration.text} in ${aiModalProperties.maxTokens} tokens`
          : aiModalProperties.prompt,
      systemPrompt: aiModalProperties.systemPrompt,
      maxTokens: aiModalProperties.maxTokens,
      coachId: currentCoach._id,
    });
    updateUser({
      ...currentCoach,
      tokens: currentCoach.tokens - 1,
    });
    setCurrentIteration({
      text: data.message,
      attempt: currentIteration.attempt + 1,
      loading: false,
    });
  };

  useEffect(() => {
    if (aiModalProperties.currentValue) {
      handleGetImprovement();
    }
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      {...other}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          maxWidth: 700,
          width: '100%',
          height: '80%',
          textAlign: 'center',
          overflow: 'auto',
          p: 5,
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Chip
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
              color: theme.palette.mode === 'dark' ? '#000' : '#fff',
              mr: 2,
            }}
            icon={<AutoAwesomeIcon />}
            label="AI-Improvement"
          />
          <Chip
            sx={{
              backgroundColor: 'primary.main',
            }}
            icon={<AutoAwesomeIcon />}
            label={`${currentCoach.tokens}/20`}
          />
        </Box>

        <Box
          sx={{
            borderRadius: 1,
            mb: 2,
            width: '100%',
            border: '1px solid',
            borderColor: 'grey.300',
            backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.200',
            display: 'flex',
            pt: 3,
            pb: 3,
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderBottom: '1px dotted',
          }}
        >
          <Typography
            variant="body1"
            textAlign="start"
            sx={{
              pl: 2,
              mb: 2,
              borderColor: 'primary.main',
              borderBottom: `1px dotted ${theme.palette.grey[300]}`,
              width: '100%',
            }}
          >
            Content (You)
          </Typography>
          {containsHTML(aiModalProperties.currentValue) ? (
            <Editor
              id="editor"
              simpleDisable={true}
              readOnly={true}
              value={aiModalProperties.currentValue}
            />
          ) : (
            <Typography variant="body1" textAlign="start" sx={{ ml: 2 }}>
              {aiModalProperties.currentValue}
            </Typography>
          )}
        </Box>

        <Typography
          variant="body1"
          textAlign="start"
          sx={{ ml: 2, mb: 2, mt: 5, border: '1px dotted primary.main' }}
        >
          Content (AI Version)
        </Typography>
        <Box
          sx={{
            borderRadius: 1,
            mb: 2,
            width: '100%',
            border: '1px solid',
            borderColor: 'grey.300',
            display: 'flex',
            pt: 3,
            pb: 3,
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderBottom: '1px dotted',
          }}
        >
          <Typography
            variant="body1"
            textAlign="start"
            sx={{
              ml: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: currentIteration.loading ? '100%' : 'auto',
            }}
          >
            {currentIteration.loading ? <CircularProgress /> : currentIteration.text}
          </Typography>
        </Box>
        {notEnoughTokens && (
          <Typography variant="caption" sx={{ color: 'error.main', mt: 2 }}>
            You don't have enough tokens to get more improvements
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            p: 2,
            pl: 4,
            pr: 4,
            gap: 5,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={
              currentIteration.loading ||
              !aiModalProperties.currentValue ||
              (currentCoach.tokens < 1 && !currentIteration.text)
            }
            onClick={handleInsertText}
            startIcon={<FavoriteIcon />}
            sx={{ mr: 1, borderRadius: 2, width: '100%' }}
          >
            Insert this text
          </Button>
          <Button
            startIcon={<AutoAwesomeIcon />}
            variant="contained"
            disabled={
              currentIteration.loading || !aiModalProperties.currentValue || currentCoach.tokens < 1
            }
            onClick={handleGetImprovement}
            sx={{ borderRadius: 2, width: '100%' }}
          >
            Try other version with AI
          </Button>
        </Box>
        <Typography variant="caption" sx={{ mt: 2, mb: 5, pb: 2 }}>
          {currentCoach.tokens}/20 Versions Left
        </Typography>
      </Box>
    </Modal>
  );
}
