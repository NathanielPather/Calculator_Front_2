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
  const numClickHandler = (e) => {
    console.log('number clicked')
  };
  
  const commaClickHandler = (e) => {
  };

  const signClickHandler = (e) => {
  };

  const equalsClickHandler = () => {
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
      <Screen value={0} />
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
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
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
