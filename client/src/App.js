import './App.css';
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

const btnValues = [
  [7, "8", "9", "/"],
  ["4", "5", "6", "X"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"]
];

function App() {
  const [value, setValue] = React.useState(0);

  const numClickHandler = (e) => {
    const numPressed = e.target.innerHTML;
    setValue(value + ' ' + numPressed);
  };
  
  const decimalClickHandler = (e) => {
  };

  const operatorClickHandler = (e) => {
    const operatorPressed = e.target.innerHTML;
    console.log(operatorPressed);
    setValue(value + ' ' + operatorPressed);
  };

  const equalsClickHandler = () => {
    setValue(0);
    console.log('clicked');
    const requestOptions = {
      method: 'POST',
  };
  fetch('http://localhost:3000/post', requestOptions)
      .then(response => response.json())
      .then(res => console.log(res))
      .then(r => <Screen value={r} />)
  };

  return (
    <Wrapper>
      <Screen 
        value={value}
      />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={""}
                value={btn}
                onClick={
                  btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? operatorClickHandler
                  : btn === "."
                  ? decimalClickHandler
                  : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
