import React from 'react';
import ReactDOM from 'react-dom';
import OrgProjectTree from '../../component/orgprojecttree';

export default class Index extends React.Component {
  constructor(props: any) {
    super(props);
    //this.state = { date: new Date() };
  }

  render() {
    return <OrgProjectTree />;
  }
}
