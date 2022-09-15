import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { decrement, increment } from "./features/counter/counterSlice";
import { getCountState } from "./features/counter/selectors";
import { getTokenFromUrl, loginUrl } from "./spotify";

function App() {
  const countState = useSelector(getCountState);
  const dispatch = useDispatch();
  console.log(11, getTokenFromUrl());
  const res = getTokenFromUrl();
  return (
    <div className="App">
      <a href={loginUrl}>Sign in with spotify</a>
      <p>Count: {countState}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default App;
