import { InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchUsersQuery: {
          read() {
            return searchUsersQueryVar();
          }
        },
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          }
        },
        token: {
          read() {
            return tokenVar();
          }
        },
        loggedUser: {
          read() {
            return loggedUserVar();
          }
        }
      }
    }
  }
});

export const searchUsersQueryVar = makeVar('');
export const tokenVar = makeVar(null);
export const isLoggedInVar = makeVar(!!tokenVar);
export const loggedUserVar = makeVar(null);
