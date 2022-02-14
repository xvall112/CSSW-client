import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gql, useMutation } from '@apollo/client';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';

const DELETE_USER = gql`
  mutation DeleteUserMutation($id: ID!) {
    deleteUser(id: $id) {
      name
    }
  }
`;

interface Props {
  userData: {
    id: String;
    name: String;
  };
  disabled?: boolean;
}

const DeleteAccount = ({ userData, disabled }: Props) => {
  let navigate = useNavigate();
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER, {
    onCompleted() {
      toast.success(`Uživatel ${name} byl úspěšně smazán`, {});
    },
    onError(error) {
      toast.error(
        `Uživatele ${name} se nepodařilo smazat: ${error.message}`,
        {}
      );
    },
    refetchQueries: [
      'GetSearchUsers' // Query name
    ],
    awaitRefetchQueries: true
  });
  const { id, name } = userData;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await setOpen(false);
    await navigate(`/app/users`);
    await deleteUser({
      variables: {
        id: id
      }
    });
  };

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
        smazat uživatele
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Oprvadu chcete smazat uživatele ${name}?`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Zrušit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            smazat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteAccount;
