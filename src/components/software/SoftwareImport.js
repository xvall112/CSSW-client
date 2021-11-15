import { useState, useMemo } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Alert,
  Collapse
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useDropzone } from 'react-dropzone';
import XLSX from 'xlsx';

const CREATE_LICENCE = gql`
  mutation CreateLicenceMutation($input: [CreateLicenceInput]) {
    createLicence(input: $input) {
      name
    }
  }
`;

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const SoftwareImport = () => {
  //mutation
  const [createLicence, { data, loading, error }] = useMutation(
    CREATE_LICENCE,
    {
      /* refetchQueries: [{ query:  }], */
      awaitRefetchQueries: true,
      onCompleted() {
        handleSuccessAlertOpen();
      }
    }
  );
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSuccessAlertOpen = () => {
    setOpenSuccessAlert(true);
    acceptedFiles.splice(0, 1);
  };

  const handleSuccessAlertClose = () => {
    setOpenSuccessAlert(false);
  };

  //open modal for drop excel
  const handleClickOpen = () => {
    setOpen(true);
  };
  //close modal for drop excel
  const handleClose = () => {
    acceptedFiles.splice(0, 1);
    setOpen(false);
    handleSuccessAlertClose();
  };
  // write excel to databse
  const handleExcelDrop = () => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString; // !! converts object to boolean
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async (e) => {
        // Do what you want with the file contents
        const bstr = e.target.result;
        const workbook = XLSX.read(bstr, {
          type: rABS ? 'binary' : 'array'
        });
        const sheet_name_list = await workbook.SheetNames[0];
        const jsonFromExcel = await XLSX.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list],
          {
            raw: false,
            dateNF: 'MM-DD-YYYY',
            header: 1,
            defval: ''
          }
        );
        //get headers from excel
        const headers = jsonFromExcel[0];
        //remove headers from excel
        await jsonFromExcel.splice(0, 1);
        console.log('jsonFromExcel object=');
        console.log(jsonFromExcel);
        let data = [];
        //convert array to object
        await jsonFromExcel.forEach(async (row, index) => {
          let rowData = {};
          await row.forEach((element, index) => {
            rowData[headers[index]] = element;
          });
          await data.push(rowData);
        });
        console.log('excel data:', data);
        //vytvoreni zaznamu v databazi
        await createLicence({
          variables: {
            input: data
          }
        });
      };
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    });
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: '.xlsx, .csv',
    maxFiles: 1
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen()}
      >
        Importovat licence
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {loading && <LinearProgress />}

        <DialogTitle id="alert-dialog-title">
          {'  Importovat excel soubor s licencemi'}
        </DialogTitle>
        {error && <Alert severity="error">{error.message}</Alert>}
        <Collapse in={openSuccessAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleSuccessAlertClose();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Dokument byl úspěšně nahrán
          </Alert>
        </Collapse>
        <DialogContent>
          <section className="container">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>
                Přetáhněte sem soubor, nebo kliněte pro výběr z adresáře souborů
              </p>
            </div>
            <aside>
              <h4>Soubor:</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Zavřít
          </Button>
          <Button
            variant="contained"
            onClick={handleExcelDrop}
            autoFocus
            disabled={loading}
          >
            Nahrát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SoftwareImport;
