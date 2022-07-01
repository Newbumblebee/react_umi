import React, { Component } from 'react';
import { Button, message } from 'antd';

const MyContext = React.createContext<any>(() => {});

const Parent = () => {
  const hanldeChang = (id: any) => {
    message.info('这是定义在父组件中的函数，通过Context传递给子组件触发');
  };

  return (
    <div
      style={{ width: 500, height: 200, textAlign: 'center', marginTop: 100 }}
    >
      <MyContext.Provider value={hanldeChang}>
        <Son />
      </MyContext.Provider>
    </div>
  );
};

const Son = () => {
  return (
    <MyContext.Consumer>
      {(handleClick) => {
        return (
          <Button type="primary" onClick={handleClick}>
            点击
          </Button>
        );
      }}
    </MyContext.Consumer>
  );
};

export default Parent;
