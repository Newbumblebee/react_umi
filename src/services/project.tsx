import request from '../utils/request';
import { getHttpUrl } from '../utils/util';

//项目组织树
export async function queryOrgProTree(payload) {
  const asrParams = {
    activeOrg: false,
    appStatusProj: 1,
    debugStatus: false,
    imposeAreaProj: 'all',
    imposeTypeProj: 'all',
    isOnlyOrg: false,
    isPaymentProj: 'all',
    isPitOrg: '',
    isRatePay: '',
    limitFilter: true,
    localOrgId: 0,
    localProjId: 0,
    metadataCode: '',
    node: 'root',
    onlyOrgValue: '',
    outEasyProj: false,
    parentNodeId: '',
    pitOrgInit: '',
    queryMode: 'remote',
    showAllSubProj: true,
    simpleName: false,
    statProj: 'bid,clo,hit,ivt,lst,stp,sts,end,cpl,pcl,pau,zz',
    treeType: 'proj',
    useCache: true,
    withDept: false,
    withProj: true,
    ...payload,
  };
  return request(
    getHttpUrl(`/DMC/BusIntegration/BusIntegrationTree/GetOrgTreeData`),
    asrParams,
  );
}
