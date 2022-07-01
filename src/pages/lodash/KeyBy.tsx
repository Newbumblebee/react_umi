import React from 'react';
import _ from 'lodash';
import { Button } from 'antd';

export default function TestPage() {
  const data = [
    {
      id: '1',
      name: 'Kennedy',
      job: 'Chief Mobility Orchestrator',
      city: 'North Alec',
    },
    {
      id: '2',
      name: 'Lucius',
      job: 'Internal Research Manager',
      city: 'Littleland',
    },
    {
      id: '3',
      name: 'Carlos',
      job: 'Lead Configuration Analyst',
      city: 'South Lillian',
    },
  ];

  const handleClick = () => {
    const byName = _.keyBy(data, 'name');
    console.log('keyBy', byName);
  };

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        TestkeyBy
      </Button>
    </>
  );
}
