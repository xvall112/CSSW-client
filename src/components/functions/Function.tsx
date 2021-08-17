import { Grid } from '@material-ui/core';
import FunctionLayout from './components/functionLayout';
import FunctionAddSISstation from './components/functionAddSISstation';
import FunctionRemoveSISstation from './components/functionRemoveSISstation';
import FunctionAddSoftware from './components/functionAddSoftware';
import FunctionReinstalSIS from './components/functionReinstalSIS';
import FunctionRemoveSoftware from './components/functionRemoveSoftware';

const Function = () => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12} md={4}>
        <FunctionLayout
          type="přidání"
          title="přidat stanici šis"
          color="success.main"
        >
          <FunctionAddSISstation />
        </FunctionLayout>
      </Grid>
      <Grid item xs={12} md={4}>
        <FunctionLayout
          type="odebrání"
          title="odebrat stanici šis"
          color="error.main"
        >
          <FunctionRemoveSISstation />
        </FunctionLayout>
      </Grid>
      <Grid item xs={12} md={4}>
        <FunctionLayout
          type="reinstalace"
          title="reinstalace stanice šis"
          color="warning.main"
        >
          <FunctionReinstalSIS />
        </FunctionLayout>
      </Grid>
      <Grid item xs={12} md={4}>
        <FunctionLayout
          type="přidání"
          title="přiřadit software"
          color="success.main"
        >
          <FunctionAddSoftware />
        </FunctionLayout>
      </Grid>
      <Grid item xs={12} md={4}>
        <FunctionLayout
          type="odebrání"
          title="odebrat software"
          color="error.main"
        >
          <FunctionRemoveSoftware />
        </FunctionLayout>
      </Grid>
    </Grid>
  );
};
export default Function;
