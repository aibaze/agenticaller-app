import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useTheme } from '@mui/material/styles';
import { ImproveWithAIModal } from './ImproveWithAIModal';
import { useAuthContext } from 'src/auth/hooks';

export const ImproveWithAISection = ({
  currentValue,
  prompt,
  systemPrompt,
  maxTokens,
  section,
  callback,
  withBreak,
  onlyIcon,
}) => {
  const { currentCoach } = useAuthContext();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  if (onlyIcon) {
    return (
      <>
        <IconButton
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <AutoAwesomeIcon />
        </IconButton>
        {openModal && (
          <ImproveWithAIModal
            onClose={() => setOpenModal(false)}
            open={openModal}
            aiModalProperties={{
              currentValue,
              prompt,
              systemPrompt,
              maxTokens,
              section,
              callback,
            }}
          />
        )}
      </>
    );
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        pt: 2,
        borderRadius: 1,
        color: theme.palette.mode === 'dark' ? '#fff' : '#637381',
        gap: 4,
      }}
    >
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        variant="outlined"
      >
        <AutoAwesomeIcon sx={{ mr: 2 }} />
        <Typography variant="body1">Improve Content with AI</Typography>
      </Button>

      <Typography variant="body1">
        Improvements {withBreak && <br />}({currentCoach.tokens}) available
      </Typography>

      {openModal && (
        <ImproveWithAIModal
          onClose={() => setOpenModal(false)}
          open={openModal}
          aiModalProperties={{
            currentValue,
            prompt,
            systemPrompt,
            maxTokens,
            section,
            callback,
          }}
        />
      )}
    </Box>
  );
};

export default ImproveWithAISection;
