const rightObj = window['rights'] || {}; // {40117: true}

const pmsRights = {
  scheduleLog: ['40117', '40118', '40024', '45436'], // 日程日志tab (40118是原来的日志tab页合并过来，兼容历史数据先不删除)
  project: ['40119'], // 项目tab
  doc: ['40120', '39995', '43521'], // 文档tab
  contract: ['40121'], // 合同tab
  wdnh: ['40712'], // 文档内核
  yysq: ['43438'], // 用印申请
  hy: ['45637'], // 会议
  lcjs: ['47951'], // 利冲检索
  rygl: ['48342'], // 人员管理
  sjdj: ['47953'], // 商机登记
  sjlb: ['47954'], // 商机列表
  yyls: ['39988'], // 用印历史
  cDfdsrOrXgf: ['1000'], // 合同对方当事人和相关方是否显示
  xmbg: ['46849'], //项目变更
  htxz: ['59972'], //合同新增
};

Object.keys(pmsRights).forEach((key) => {
  const rightIds = pmsRights[key];
  Object.defineProperty(pmsRights, key, {
    get() {
      return (
        process.env.NODE_ENV === 'development' ||
        rightIds.some((rightId) => rightObj[rightId])
      );
    },
  });
});

export default pmsRights;
