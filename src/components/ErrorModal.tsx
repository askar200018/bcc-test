import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ErrorModal = ({ open, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText color="error" id="alert-dialog-description">
          Упс! Что-то пошло не так
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus color="error" size="small">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
