import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import style from './index.less';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    return (
      <div>
        <h1>Hello,world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export function ClockFn() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Hello,world!1111111111111111111</h1>
      <h2>It is {date.toLocaleTimeString()}</h2>
    </div>
  );
}

export function ClockFn2() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Hello,world!2222222</h1>
      <h2>It is {date.toLocaleTimeString()}</h2>
    </div>
  );
}
