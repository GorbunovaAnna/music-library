import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromUrl, loginUrl, spotifyURL } from "../../spotify";
import { getAuthCredentials } from "../../redux/selectors";
import { setCredentials } from '../../redux/authSlice';
import axios from "axios";

export const Main = () => {
  const authState = useSelector(getAuthCredentials);
  const res = getTokenFromUrl();
  const dispatch = useDispatch();
  useEffect(()=>{

    if(!authState.access_token.length){
      dispatch(setCredentials(res));
    }

    axios.get(`${spotifyURL}/browse/new-releases`, {headers: {'Authorization': `Bearer ${res.access_token || authState.access_token}`}})
      .then((res)=>{
        console.log(res);
      })
  }, [])
  return (
    <div className="App">
      <a href={loginUrl}>Sign in with spotify</a>
      <span style={{color: '#fff'}}>{ authState.access_token }</span>
    </div>
  );
};
