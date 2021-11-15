import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink
} from '@apollo/client';
import { cache, tokenVar } from 'src/graphql/cahce';

const endpointUrl = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
  const token = tokenVar();
  if (token !== null) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointUrl })]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
