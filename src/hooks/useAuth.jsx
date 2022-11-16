import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie, setCookie } from '../cookie';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    (async () => {
      
      if(code){
        try {
          const {
            data: { access_token, refresh_token, expires_in },
          } = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
            code,
          });
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          setExpiresIn(expires_in);
          setCookie("refresh_token", refresh_token, { "max-age": expires_in }); 
          setCookie("token", access_token, { "max-age": expires_in }); 
          window.history.pushState({}, null, '/');
        } catch {
          window.location = '/';
        }
      }else if(getCookie('refresh_token') && !getCookie('token')){
        console.log('test', getCookie('refresh_token'))
        setRefreshToken(getCookie('refresh_token'))
      }
    })();
  }, [code]);
  
  useEffect(() => {
    if (!refreshToken) return;
    (async () => {
      try {
        const {
          data: { access_token, expires_in },
        } = await axios.post(`${process.env.REACT_APP_BASE_URL}/refresh`, {
          refreshToken,
        });
        setAccessToken(access_token);
        setExpiresIn(expires_in);
      } catch {
        window.location = '/';
      }
    })();

  }, [refreshToken, expiresIn]);

  return accessToken || getCookie('token');
};

export default useAuth;
