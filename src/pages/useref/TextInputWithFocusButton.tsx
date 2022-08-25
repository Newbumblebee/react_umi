import React, { PureComponent, useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl: any = useRef(null);
  const onButtonClick = () => {
    inputEl.current?.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <br />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

export default TextInputWithFocusButton;
