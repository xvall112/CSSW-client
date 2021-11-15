import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gql, useMutation } from '@apollo/client';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import { SEARCH_USERS } from '../../pages/UsersList';

const RESET_USER_PASSWORD = gql`
  mutation ResetPassword($id: ID!) {
    resetPassword(id: $id) {
      name
    }
  }
`;

interface Props {
  userData: { id: String; name: String };
  disabled?: boolean;
}

const ResetPassword = ({ userData, disabled }: Props) => {
  const { id, name } = userData;
  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_USER_PASSWORD,
    {
      refetchQueries: [{ query: SEARCH_USERS }]
    }
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = async () => {
    await setOpen(false);
    await resetPassword({
      variables: {
        id: id
      }
    });
    toast.success(`Uživateli ${name} bylo úspěšně resetováno heslo`, {});
  };
  if (error) {
    toast.error(
      `Uživatele ${name} se nepodařilo resetovat heslo: ${error.message}`,
      {}
    );
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Button
        variant="outlined"
        color="error"
        disabled={disabled}
        onClick={handleClickOpen}
      >
        resetovat heslo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Oprvadu chcete uživateli ${name} resetovat heslo?`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Zrušit
          </Button>
          <Button variant="outlined" color="error" onClick={handleReset}>
            resetovat heslo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ResetPassword;
