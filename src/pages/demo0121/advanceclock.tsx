import React from 'react';
import ReactDOM from 'react-dom';
import Clock, { ClockFn, ClockFn2 } from '../../component/clock';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { date: new Date() };
  }

  render() {
    return <ClockFn2 />;
  }
}
