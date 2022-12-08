import { Box, Button, ListItem, Typography } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { useLoadImages } from '../hooks/useLoadImages';
import ErrorModal from './ErrorModal';
import Gallery from './Gallery';

const BUTTON_STATE = {
  LOADING: 'Загружается',
  SHOW: 'Показать',
  UPDATE: 'Обновить',
};

interface Props {
  breed: string;
  subBreed?: string;
}

const Breed: React.FC<PropsWithChildren<Props>> = ({ breed, subBreed, children }) => {
  const [open, setOpen] = useState(false);

  const openErrorModal = () => {
    setOpen(true);
  };

  const { images, isLoading, handleShowImages } = useLoadImages({
    breed,
    subBreed,
    openErrorModal,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const buttonText = isLoading
    ? BUTTON_STATE.LOADING
    : images.length === 0
      ? BUTTON_STATE.SHOW
      : BUTTON_STATE.UPDATE;

  return (
    <ListItem
      disablePadding
      sx={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginY: 0.5,
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        <Typography variant="subtitle1">
          {breed} {subBreed && subBreed}
        </Typography>
        <Button variant="contained" size="small" onClick={handleShowImages}>
          {buttonText}
        </Button>
      </Box>
      <Box>
        <Gallery images={images} />
      </Box>

      <ErrorModal open={open} onClose={handleClose} />
      {children}
    </ListItem>
  );
};

export default Breed;
