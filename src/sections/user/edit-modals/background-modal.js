import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Divider, CircularProgress } from '@mui/material';
import Editor from 'src/components/editor';
import { useResponsive } from 'src/hooks/use-responsive';
import { updateCoach } from 'src/api/coach';
import { useAuthContext } from 'src/auth/hooks';
import { enqueueSnackbar } from 'notistack';
import { ImproveWithAISection } from 'src/components/ImproveWithAIModal/ImproveWithAISection';

const BackgroundModal = ({ open, handleClose, initialData }) => {
  const { currentCoach, updateUser } = useAuthContext();
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const smDown = useResponsive('down', 'sm');

  useEffect(() => {
    if (initialData) {
      setDescription(initialData);
    }
  }, [initialData]);

  const handleChange = (value) => {
    setDescription(value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const updatedCoach = await updateCoach(
      {
        description,
      },
      currentCoach?._id,
      currentCoach.token
    );

    if (updateUser) {
      updateUser(updatedCoach.data);
    }
    enqueueSnackbar('Background updated successfully', { variant: 'success' });
    setIsLoading(false);

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: smDown ? '90%' : '700px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '20px',
          gap: 2,
        }}
      >
        <Typography id="modal-title" variant="h4" component="h4" sx={{ mb: 3 }}>
          Edit your Background
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body2" component="p" sx={{ mb: 3, color: 'text.secondary' }}>
          *share your background with your clients
        </Typography>
        <Editor
          simple
          id="editor"
          placeholder="Write something awesome..."
          value={description}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="space-between" alignItems={'center'} mt={3}>
          <ImproveWithAISection
            currentValue={description}
            callback={handleChange}
            prompt={`Improve this description: ${description}`}
            systemPrompt={`You are a professional copywritter, and you will write a converting description in 120 tokens`}
            maxTokens={120}
            section="Background"
            withBreak
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: '20px',
              width: smDown ? '100%' : 'auto',
              height: '40px',
            }}
            disabled={isLoading}
            onClick={handleSave}
          >
            {isLoading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BackgroundModal;
