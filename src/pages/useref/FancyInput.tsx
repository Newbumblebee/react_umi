import React, { forwardRef, useImperativeHandle, useRef } from 'react';

// function FancyInput(props, ref) {
//     const inputRef:any = useRef(null);
//     useImperativeHandle(ref, () => ({
//         focus: () => {
//             inputRef.current?.focus();
//         }
//     }));
//     return <input ref={inputRef} />;
// }

const FancyInput = forwardRef((props, ref) => {
  const inputRef: any = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));
  return <input ref={inputRef} />;
});

export default function Parent() {
  const tref: any = useRef();

  const onButtonClick = () => {
    tref.current?.focus();
  };

  return (
    <div>
      <FancyInput ref={tref} />
      <button onClick={onButtonClick}>Focus the input</button>
    </div>
  );
}
