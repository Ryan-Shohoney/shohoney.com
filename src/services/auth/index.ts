import auth0, { WebAuth } from "auth0-js";
import { navigate } from 'gatsby';
import React, { useCallback, useEffect, useState } from "react";
const isBrowser = typeof window !== "undefined";

const auth: WebAuth = isBrowser
  ? new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    redirectUri: process.env.AUTH0_CALLBACK,
    responseType: "token id_token",
    scope: "openid profile email",
  }) : null;
interface IAuthTokens {
  accessToken: string;
  idToken: string,
  expiresAt: number;
}

const tokens: IAuthTokens = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
};

let user = {};
const setSession = (cb = () => { }, path = '/admin') => (err, authResult) => {
  if (err) {
    navigate('/');
    auth.logout({});
    cb();
  } else if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    tokens.accessToken = authResult.accessToken;
    tokens.idToken = authResult.idToken;
    tokens.expiresAt = expiresAt;
    user = authResult.idTokenPayload;
    localStorage.setItem("isLoggedIn", true.toString());
    navigate(path);
    cb();
  };
}

const LOGGED_IN_KEY = 'isLoggedIn';
export const isAuthenticated = (): boolean => isBrowser && localStorage.getItem(LOGGED_IN_KEY) === 'true';
export const login = (): void => isBrowser && auth.authorize();
export const logout = (): void => {
  if (isBrowser) {
    localStorage.setItem(LOGGED_IN_KEY, false.toString());
    auth.logout({});
  }
}
export const handleAuthentication = () => isBrowser && auth.parseHash(setSession());
export const getProfile = () => user;
export const silentAuth = (callback) => {
  console.warn();
  if (!isAuthenticated()) {
    return callback();
  }
  auth.checkSession({}, setSession(callback, window.location.pathname));
};

export const SessionCheck: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const handleCheckSessionCallback = useCallback(() => {
    setLoading(false);
  }, [loading]);
  useEffect(() => {
    silentAuth(handleCheckSessionCallback);
  }, [handleCheckSessionCallback]);
  return null;
}