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
  const [clear, setClear] = React.useState(false);

  const numClickHandler = (e) => {
    const numPressed = e.target.innerHTML;
    if(
      value === 0 ||
      Number.isInteger(value) ||
      (value % 1 !== 0 && clear === true)
    ) {
      setValue(numPressed);
      setClear(false);
    }
    else {
      setValue(value + numPressed);
    }
  };
  
  const decimalClickHandler = (e) => {
    const decimalPressed = e.target.innerHTML;
    setValue(value + decimalPressed);
  };

  const operatorClickHandler = (e) => {
    const operatorPressed = e.target.innerHTML;
    setValue(value + operatorPressed);
  };

  const equalsClickHandler = () => {
    setClear(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        value: value
      })
  };
  fetch('http://localhost:3000/post', requestOptions)
      .then(response => response.json())
      .then(solution => setValue(solution.message));
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
