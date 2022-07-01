import React, { useMemo } from 'react';
import _ from 'lodash';
import { useEvent, useSearchParam } from 'react-use';
import { message } from 'antd';

export function SearchBox({ data }) {
  const searchKey = useSearchParam('key') || '';

  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchKey.toLowerCase()),
    );
  }, [searchKey, data]);

  const handleSearch = _.debounce((evt) => {
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?key=${evt.target.value}`,
    );
  }, 3000);

  useEvent('keydown', (e) => {
    message.info(e);
  });

  return (
    <div className="08-filter-list">
      <h2>Movies (Debounced Search)</h2>
      <input
        defaultValue={searchKey}
        placeholder="Search..."
        onChange={handleSearch}
      />

      <ul style={{ marginTop: 20 }}>
        {filtered.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default function TestlodashDebounce() {
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

  return <SearchBox data={data} />;
}
