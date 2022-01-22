import React, { useState, useEffect } from 'react';
import { Spin, Tree, message, Input } from 'antd';
import { BankOutlined, FilePptTwoTone } from '@ant-design/icons';
import { queryOrgProTree } from '../../services/project';
import style from './index.css';
const { Search } = Input;

function handleTree(treeData) {
  if (treeData && treeData.length > 0) {
    const getChildren = (data) => {
      data.map((item) => {
        item.title = item.text;
        item.key = item.id;
        item.disabled = item.nodeType === 'ORG';
        item.icon =
          item.nodeType === 'ORG' ? <BankOutlined /> : <FilePptTwoTone />;
        item.expanded = true;
        item.children.map((element) => {
          element.title = element.text;
          element.key = element.id;
          element.expanded = true;
          element.disabled = element.nodeType === 'ORG';
          element.icon =
            element.nodeType === 'ORG' ? <BankOutlined /> : <FilePptTwoTone />;
          getChildren(element.children);
        });
      });
      return data;
    };
    treeData = getChildren(treeData);
  }
  return treeData;
}

const loop = (searchValue, data) => {
  let selectItem = [];
  data.map((item) => {
    if (item.title.indexOf(searchValue) > -1) {
      selectItem = [...selectItem, item];
    }
    if (item.children) {
      var children = loop(searchValue, item.children);
      if (children.length > 0) {
        selectItem = [...selectItem, ...children];
      }
    }
  });
  return selectItem;
};

export default function OrgProjectTree(props) {
  const { onSelect } = props;

  const [tkeyword, setTkeyword] = useState(''); //关键词
  //查询关键字
  const [searchValue, setSearchValue] = useState('');
  //选中的key数组
  const [selectedKeys, setSelectedKeys] = useState([]);
  //查询到的所有key
  const [allSelectedKeys, setAllSelectedKeys] = useState([]);
  //索引
  const [selectedIndex, setSelectedIndex] = useState(0);
  //树数据
  const [orgProTreeData, setOrgProTreeData] = useState({
    data: [],
    loading: true,
  });

  //树节点选中事件
  const handleSelect = (selectedKeys, e) => {
    setSelectedKeys(selectedKeys);
    onSelect && onSelect(e.PhId || e.node.PhId);
  };

  useEffect(() => {
    //查询组织项目树
    queryOrgProTree().then((res) => {
      let treeData = handleTree(res);
      setOrgProTreeData({
        loading: false,
        data: treeData,
      });
    });
  }, []);

  const searchTreeData = (params) => {
    const { keyword } = params;

    if (!keyword || keyword == '') return;

    let selectItemNode;

    if (searchValue == '' || keyword != searchValue) {
      const selectItems = loop(keyword, orgProTreeData.data);

      selectItemNode =
        selectItems.length > 0 ? selectItems.slice(0, 1)[0] : undefined;
      //选中搜索后的第一个
      setSearchValue(keyword);
      setSelectedKeys([selectItemNode?.key]);
      setAllSelectedKeys(selectItems);
      setSelectedIndex(0);
    } else {
      let index = selectedIndex + 1;
      if (allSelectedKeys.length > index) {
        selectItemNode = allSelectedKeys.slice(index, index + 1)[0];
        setSelectedKeys([selectItemNode?.key]);
        setSelectedIndex(index);
      } else {
        selectItemNode =
          allSelectedKeys.length > 0
            ? allSelectedKeys.slice(0, 1)[0]
            : undefined;
        setSelectedKeys([selectItemNode?.key]);
        setSelectedIndex(0);
      }
    }

    if (!selectItemNode) {
      messageAlter();
      selectItemNode = { PhId: 1 };
    }

    handleSelect([selectItemNode?.key], selectItemNode);
  };

  const messageAlter = () => {
    message.warning(langType.cannotfindnode);
  };

  const keywordSearch = () => {
    const params = {
      keyword: tkeyword,
    };
    searchTreeData(params);
  };

  //关键词搜索输入框
  const handleInputChange = (event) => {
    setTkeyword(event.target.value);
  };

  const clearSelected = () => {
    setAllSelectedKeys([]);
    setSelectedIndex(0);
    setSelectedKeys([]);
    setTkeyword('');
  };

  return (
    <div>
      <Search
        width={160}
        onSearch={keywordSearch}
        defaultValue={tkeyword}
        onChange={handleInputChange}
      />

      <Spin
        wrapperClassName={'spin-loading'}
        spinning={orgProTreeData.loading}
        className={style.pageLoading}
      >
        <div className={style.tree_div}>
          {orgProTreeData.data.length > 0 && (
            <Tree
              showIcon
              selectedKeys={selectedKeys}
              defaultExpandAll={true}
              treeData={orgProTreeData.data}
              onSelect={handleSelect}
            />
          )}
        </div>
      </Spin>
    </div>
  );
}
