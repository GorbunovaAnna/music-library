import React, { SyntheticEvent, useState } from "react";
export interface Credentials {
  login: string;
  password: string;
}
export const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({ login: "", password: "" });

  const signUp = () => {
    console.log(credentials);
  };
  const loginValueHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prev) => ({ ...prev, login: e.target.value }));
  };
  const passwordValueHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prev) => ({ ...prev, password: e.target.value }));
  };
  return (
    <>
      <label htmlFor="login">Login</label>
      <input id="login" type="text" onChange={loginValueHandler} />
      <label htmlFor="password">Password</label>
      <input id="password" type="text" onChange={passwordValueHandler} />
      <button onClick={signUp}>Sign up</button>
      <button>Sign in</button>
    </>
  );
};
