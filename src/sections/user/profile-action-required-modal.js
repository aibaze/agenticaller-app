import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import Editor from 'src/components/editor/editor';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { updateCoach } from 'src/api/coach';
import { uploadPhoto } from 'src/api/files';
import { useAuthContext } from 'src/auth/hooks';

import { Upload } from 'src/components/fileUpload';
// ----------------------------------------------------------------------

export default function ActionRequiredModal({ modalData, setModalData }) {
  const { currentCoach, updateUser } = useAuthContext();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const onClose = () => {
    setModalData({ action: '', open: false });
  };
  const onSubmit = async () => {
    try {
      setIsLoading(true);

      if (modalData.type === 'file') {
        const response = await uploadPhoto(file);
        const { image, thumb } = response;
        const updatedCoach = await updateCoach(
          { profileImg: thumb, professionalImg: image },
          currentCoach?._id,
          currentCoach.token
        );
        updateUser(updatedCoach.data);
      } else {
        await handleUpdateCoach();
      }
      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleUpdateCoach = async () => {
    const updatedCoach = await updateCoach(formData, currentCoach?._id);
    updateUser(updatedCoach.data);
  };

  const onChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);

  return (
    <div>
      <Dialog open={modalData.open} onClose={onClose} fullWidth>
        <DialogTitle>
          {modalData.title} {!modalData.update && 'to complete your profile'}{' '}
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>{modalData.title}</Typography>

          {modalData.actionKey === 'description' && (
            <Editor
              label={modalData.title}
              autoFocus
              value={formData.description}
              onChange={(value) => {
                onChange('description', value);
              }}
            />
          )}

          {modalData.type === 'file' && (
            <Card>
              <CardHeader title="Upload Single File" />
              <CardContent>
                <Upload file={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
              </CardContent>
            </Card>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={onSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ActionRequiredModal.propTypes = {
  modalData: PropTypes.any,
  setModalData: PropTypes.any,
};
