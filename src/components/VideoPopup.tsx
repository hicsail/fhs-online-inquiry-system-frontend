import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import videoPath from '../assets/demo-with-narration.mp4';
import { FC } from 'react';

interface VideoPopupProps {
  open: boolean;
  onClose: () => void;
}

export const VideoPopup: FC<VideoPopupProps> = ({ open, onClose }) => {
  console.log('videoPath', videoPath);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, color: 'grey' }}>
        <CloseIcon />
      </IconButton>
      <video src={videoPath} controls autoPlay></video>
    </Dialog>
  );
};
