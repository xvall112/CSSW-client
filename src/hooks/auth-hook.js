import { useState, useCallback, useEffect } from 'react';
import { loggedUserVar, tokenVar } from 'src/graphql/cahce';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback(
    (uid, token, name, userName, role, expirationDate) => {
      loggedUserVar({ id: uid, name: name, userName: userName, role: role });
      setToken(token);
      setUserId(uid);
      tokenVar(token);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 640);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: uid,
          name: name,
          userName: userName,
          token: token,
          role: role,
          expiration: tokenExpirationDate.toISOString()
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    tokenVar(null);
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    loggedUserVar(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    try {
    } catch (err) {}
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.name,
        storedData.userName,
        storedData.role,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
