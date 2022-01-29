import './App.css';
import Wrapper from "./components/Wrapper";
import ScreenWrapper from "./components/ScreenWrapper";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React from "react";

const btnValues = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "X"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"]
];

function App() {
  const [value, setValue] = React.useState(0);
  const [clear, setClear] = React.useState(false);
  
  /** Handler for number button clicks.
   * @param {SyntheticEvent} e - Event e.
   * Prevents number clicks under illegal events.
   */
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
  
  /** Handler for decimal button clicks.
   * @param {SyntheticEvent} e - Event e.
   * Adds a decimal point to current value.
   */
  const decimalClickHandler = (e) => {
    const decimalPressed = e.target.innerHTML;
    setValue(value + decimalPressed);
  };

  /** Handler for operator button clicks.
   * @param {SyntheticEvent} e - Event e.
   * Adds an operator to current value.
   */
  const operatorClickHandler = (e) => {
    const operatorPressed = e.target.innerHTML;
    setValue(value + operatorPressed);
  };

  /** Handler for equals button clicks.
   * @param {SyntheticEvent} e - Event e.
   * Sends post request with equation.
   * Displays the result as new value.
   */
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
      <ScreenWrapper 
        setValue={setValue}
        setClear={setClear}
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
