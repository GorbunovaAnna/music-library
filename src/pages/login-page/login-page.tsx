// import React, { SyntheticEvent, useState } from "react";
// export interface Credentials {
//   login: string;
//   password: string;
// }
// export const Login = () => {
//   const [credentials, setCredentials] = useState<Credentials>({ login: "", password: "" });

//   const signUp = () => {
//     console.log(credentials);
//   };
//   const loginValueHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setCredentials((prev) => ({ ...prev, login: e.target.value }));
//   };
//   const passwordValueHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setCredentials((prev) => ({ ...prev, password: e.target.value }));
//   };
//   return (
//     <>
//       <label htmlFor="login">Login</label>
//       <input id="login" type="text" onChange={loginValueHandler} />
//       <label htmlFor="password">Password</label>
//       <input id="password" type="text" onChange={passwordValueHandler} />
//       <button onClick={signUp}>Sign up</button>
//       <button>Sign in</button>
//     </>
//   );
// };
import React, { useEffect } from "react";
import { getTokenFromUrl, loginUrl } from "../../spotify";
import { getCookie, setCookie } from "../../cookie";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  
const navigate = useNavigate();


  useEffect(() => {
    const res = getTokenFromUrl();

    if (res?.access_token?.length) {
      
      setCookie("token", res.access_token, { "max-age": 3600 }); 
      navigate('/');
    }
  }, []);

  return (
    <div>
      <p>Welcome to the music library</p>
      <p>Here you can listen to your favorite music and create unique playlists</p>
      <p>Follow the link and register</p>
      <a href={loginUrl}>Sign in with spotify</a>
      {/* <span style={{ color: "#fff" }}>{authState.access_token}</span> */}
    </div>
  )
}
