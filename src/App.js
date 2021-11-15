import { useReactiveVar } from '@apollo/client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { routes, loginRoutes, userRoutes } from 'src/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';
import { tokenVar, loggedUserVar } from 'src/graphql/cahce';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const logedUser = useReactiveVar(loggedUserVar);
  const routing = useRoutes(
    logedUser ? (logedUser.role === 'user' ? userRoutes : loginRoutes) : routes
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
