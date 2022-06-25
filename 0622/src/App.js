import "./App.css";
import { useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import countUp from "./countUpSlice";
import countDown from "./countDownSlice";
function Left1(props) {
  return (
    <div>
      <h1>Left1</h1>
      <Left2></Left2>
    </div>
  );
}
function Left2(props) {
  return (
    <div>
      <h1>Left1</h1>
      <Left3></Left3>
    </div>
  );
}
function Left3(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Left3</h1>
      <button
        onClick={() => {
          dispatch(countUp.actions.up(1));
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(countDown.actions.down(1));
        }}
      >
        -
      </button>
    </div>
  );
}
function Right1() {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}
function Right2() {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}
function Right3() {
  const countUp = useSelector((state) => {
    return state.countUp.value;
  });
  const countDown = useSelector((state) => {
    return state.countDown.value;
  });
  return (
    <div>
      <h1>Right3</h1>
      {countUp} | {countDown}
    </div>
  );
}
export default function App() {
  return (
    <div id="app">
      <h1>Root</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <Left1></Left1>
        <Right1></Right1>
      </div>
    </div>
  );
}
