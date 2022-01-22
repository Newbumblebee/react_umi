import React from 'react';
import ReactDOM from 'react-dom';

function Clock(props) {
  return (
    <div>
      <h1>hello,world!</h1>
      <h2>It is {props.data.toLocaleTimeString()}</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(<Clock data={new Date()} />, document.getElementById('root'));
}

setInterval(tick, 1000);
