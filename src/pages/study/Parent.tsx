import React, { Component } from 'react';

const MyContext = React.createContext(() => {});

const Parent = () => {
  const hanldeChang = (id) => {
    console.log('hanldeChang', id);
  };

  return (
    <MyContext.Provider value={hanldeChang}>
      <Son />
    </MyContext.Provider>
  );
};

const Son = () => {
  return (
    <MyContext.Consumer>
      {(val) => {
        return <span onClick={() => val(2)}>123</span>;
      }}
    </MyContext.Consumer>
  );
};

export default Parent;
