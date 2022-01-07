import { Drawer, Button } from 'antd';
import React, { useState, useEffect } from 'react';

export function DrawerFnCom(props) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="site-drawer-render-in-current-wrapper">
      Render in this
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="Test Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <p>Some contents...</p>
      </Drawer>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
