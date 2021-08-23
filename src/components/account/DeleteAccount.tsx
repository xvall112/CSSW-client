import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteAccount = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        smazat uživatele
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Oprvadu chcete smazat uživatele?'}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Zrušit
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            smazat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteAccount;
