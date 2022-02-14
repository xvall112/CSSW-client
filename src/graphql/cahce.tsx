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
        searchLicensesQuery: {
          read() {
            return searchLicensesQueryVar();
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

export const searchUsersQueryVar = makeVar({
  name: '',
  limit: 25,
  offset: 0,
  pageNumber: 0
});
export const searchLicensesQueryVar = makeVar({
  name: '',
  limit: 25,
  offset: 0,
  pageNumber: 0
});
export const tokenVar = makeVar(null);
export const isLoggedInVar = makeVar(!!tokenVar);
export const loggedUserVar = makeVar(null);
