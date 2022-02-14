import React, { useState } from 'react';
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { debounce } from 'debounce';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Skeleton,
  CircularProgress
} from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

interface Item {
  id: number;
  evidenceNumber: string;
  software: {
    name: string;
  };
}

interface License {
  software: any;
}

//vsechny licence na stanici
export const GET_STATION_SOFTWARE = gql`
  query getStationLicenses($station: Int!) {
    getStationLicenses(station: $station) {
      licenses {
        id
        evidenceNumber
        software {
          id
          name
        }
      }
    }
  }
`;

//,utace na overeni stanice v SIS
export const IS_STATION = gql`
  mutation isStation($station: Int) {
    isStation(station: $station)
  }
`;

//mutace na odstraneni licenci ze stanice
export const REMOVE_LICENSES = gql`
  mutation removeLicenses(
    $station: Int!
    $requirement: String!
    $licenseId: [String]!
  ) {
    removeLicenses(
      station: $station
      requirement: $requirement
      licenseId: $licenseId
    ) {
      id
      evidenceNumber
      software {
        name
      }
    }
  }
`;

const validationSchema = Yup.object({
  cisloStanice: Yup.number().required('Vyplňte číslo stanice'),
  cisloPozadavku: Yup.string().max(255).required('Vyplňte číslo požadavku'),
  licenseId: Yup.array().required('Zvolte software')
});
const FunctionRemoveSoftware = () => {
  const [station, setStation] = useState(2);

  const formik = useFormik({
    initialValues: {
      cisloStanice: null,
      cisloPozadavku: '',
      licenseId: []
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      removeLicenses({
        variables: {
          station: values.cisloStanice,
          requirement: values.cisloPozadavku,
          licenseId: values.licenseId
        }
      });
    }
  });

  const {
    data: stationSoftwareData,
    loading: stationSoftwareDataLoading,
    error: stationSoftwareDataError
  } = useQuery(GET_STATION_SOFTWARE, {
    variables: {
      station: station ? station : 0
    }
  });

  const [
    isStation,
    { data: dataIsStation, loading: loadingIsStation, error: errorIsStation }
  ] = useMutation(IS_STATION);

  const [removeLicenses, { data, loading, error }] = useMutation(
    REMOVE_LICENSES,
    {
      onCompleted(data) {
        toast.success(
          `Na stanici ${
            formik.values.cisloStanice
          } byl úspěšně odebrán software ${data.removeLicenses.map(
            (license: License) => license.software.name
          )}`,
          {}
        );
        formik.resetForm();
      },
      onError(error) {
        toast.error(`Nepodařilo se odebrat licence: ${error.message}`, {});
      },
      refetchQueries: [
        'GetLicenses',
        'GetStationSoftware',
        'getStationLicenses',
        'allSoftware'
      ],
      awaitRefetchQueries: true
    }
  );

  if (stationSoftwareDataError)
    return <>{`Error! ${stationSoftwareDataError.message}`}</>;
  //funkce volana po zadani cisla stanice do pole, vrati licence(software), ktery je instalovany na stanici
  const getStationSoftware = debounce((e: any) => {
    setStation(parseInt(e.target.value));
    isStation({ variables: { station: parseInt(e.target.value) } });
  }, 500);

  return (
    <Grid item xs={12}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(
            formik.touched.cisloStanice && formik.errors.cisloStanice
          )}
          fullWidth
          helperText={formik.touched.cisloStanice && formik.errors.cisloStanice}
          label="Číslo stanice"
          margin="normal"
          name="cisloStanice"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            getStationSoftware(e);
          }}
          type="number"
          value={formik.values.cisloStanice}
          variant="outlined"
          InputProps={{
            endAdornment: (
              /* overeni zda je stanice v SIS */
              <InputAdornment position="end">
                <>
                  {formik.touched.cisloStanice &&
                    (stationSoftwareDataLoading || loadingIsStation ? (
                      <CircularProgress />
                    ) : dataIsStation && dataIsStation.isStation ? (
                      <DoneIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    ))}
                </>
              </InputAdornment>
            )
          }}
        />
        <TextField
          error={Boolean(
            formik.touched.cisloPozadavku && formik.errors.cisloPozadavku
          )}
          fullWidth
          helperText={
            formik.touched.cisloPozadavku && formik.errors.cisloPozadavku
          }
          label="Číslo požadavku"
          margin="normal"
          name="cisloPozadavku"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="name"
          value={formik.values.cisloPozadavku}
          variant="outlined"
        />
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
          xs={12}
        >
          <FormControl
            sx={{ mt: 2 }}
            component="fieldset"
            variant="standard"
            error={Boolean(formik.touched.licenseId && formik.errors.licenseId)}
            onChange={formik.handleChange}
          >
            <FormLabel component="legend">Software</FormLabel>
            <FormGroup>
              {stationSoftwareDataLoading ? (
                <>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={40} />
                </>
              ) : (
                stationSoftwareData.getStationLicenses &&
                stationSoftwareData.getStationLicenses.licenses.map(
                  (item: Item) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formik.values.licenseId.some(
                              (soft) => parseInt(soft) === item.id
                            )}
                            color="primary"
                            name="licenseId"
                            value={item.id}
                          />
                        }
                        label={`${item.software.name} (${item.evidenceNumber})`}
                        key={item.id}
                      />
                    );
                  }
                )
              )}
            </FormGroup>
            <FormHelperText>
              {formik.touched.licenseId && formik.errors.licenseId}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Box sx={{ py: 2, mt: 'auto' }}>
          <Button
            color="primary"
            disabled={
              formik.isSubmitting || (dataIsStation && !dataIsStation.isStation)
            }
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            odebrat software
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default FunctionRemoveSoftware;
