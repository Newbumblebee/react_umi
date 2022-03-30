import request, {
  getCookie,
  getUserInfo,
  getQueryValue,
} from '@/utils/request';
import { message } from 'antd';
import moment from 'moment';

const isTest = false;

//获取主界面对象
function GetWFrame() {
  let cw;
  try {
    cw = window;
    while (cw !== window.top) {
      if (cw.MainFrame) break;
      else cw = cw.parent;
    }
  } catch (e) {}

  //跨域访问不允许
  try {
    return cw.MainFrame;
  } catch (e) {
    return undefined;
  }
}

export { getUserInfo, getCookie, getQueryValue as GetQueryValue };

export function uniqueArr(arr, id) {
  const res = [];
  const obj = {};
  arr.forEach((a) => {
    const key = id ? a[id] : a;
    if (!obj[key]) {
      obj[key] = 1;
      res.push(a);
    }
  });
  return res;
}

export const openUrl = (url, title) => {
  const f = GetWFrame();
  if (title) {
    url += url.indexOf('?') > -1 ? '&' : '?';
    url += 'AppTitle=' + encodeURIComponent(title);
  }
  if (f && f.Center) {
    f.Center.openTab(title || '', url);
  } else if (window.external && window.external.ShowExternalWebForm) {
    window.external.ShowExternalWebForm(url); //主界面中打开
  } else {
    window.open(url, '_blank'); //主界面中打开
  }
};

export const closeTab = (type, tab) => {
  if (type === 'web' && tab) {
    //纯web
    tab.canClose = true; //给指示可以关闭
  }
  const f = GetWFrame();
  if (f && f.Center) {
    tab = f.Center.getComponent(tab) || f.Center.getActiveTab();
    f.Center.remove(tab);
  } else if (window.external && window.external.CloseSelectedTabPage) {
    window.external.CloseSelectedTabPage(!!tab);
  } else {
    window.close();
  }
};

// 外部链接url类型
export const UrlTypeEnums = {
  WDNH: 'wdnh', // 文档内核
  YYSQ: 'yysq', // 用印申请
  HY: 'hy', // 会议
  LYJS: 'lyjs', // 利益检索
  SJLB: 'sjlb', // 商机列表
  SJDJ: 'sjdj', // 商机登记
  RYGL: 'rygl', // 人员管理
  LSBB: 'lsbb', // 文档历史版本
  YYLS: 'yyls', // 用印历史
  None: '',
};

export const openUrlType = (type, params = {}) => {
  const userInfo = getUserInfo();
  const { phIdDoc, phIdPro, linkAdr, title: paramTitle } = params; // phIdDoc 文档phid， phIdPro 项目phid , linkAdr 链接地址
  let url = '';
  switch (type) {
    case UrlTypeEnums.WDNH: // 文档内核 额外参数phIdPro=${项目phid}&phIdDoc=${文档phid}',
      url = `/PMS/EntPC/PmsProjectKernel/PmsProjectKernelEdit?otype=add&proCen=1&phIdPro=${
        phIdPro || ''
      }&phIdDoc=${phIdDoc || ''}`;
      break;
    case UrlTypeEnums.YYSQ: // 用印申请 额外参数 proid=${项目phid}
      //title = '印章使用-新增';
      url = `/WM/Signet/EsAppmst/EsAppmstEdit?otype=addfordoc&phIdPro=${
        phIdPro || ''
      }&phIdDoc=${phIdDoc || ''}`;
      break;
    case UrlTypeEnums.HY: // 会议
      url = '/WM/Meet/Meeting/MyMeetingList';
      break;
    case UrlTypeEnums.LYJS: // 利益检索
      url = '/CRM/BOM/BusinessOpp/BenefitConflictSearchList';
      break;
    case UrlTypeEnums.SJLB: // 商机列表
      url = '/CRM/BOM/BusinessOpp/BusinessOppList';
      break;
    case UrlTypeEnums.SJDJ: // 商机登记
      url = '/CRM/BOM/BusinessOpp/BusinessOppEdit?otype=add';
      break;
    case UrlTypeEnums.RYGL: // 人员管理
      url = '/PMS/EntPC/PmsProjectInfo/ProEmpMan';
      break;
    case UrlTypeEnums.LSBB: // 文档历史版本
      //title = '文档历史版本';
      url = `/WM/Doc/Document/DocHisList?comeform=pro&rightname=ProjectDocumentList&id=${phIdDoc}`;
      break;
    case UrlTypeEnums.YYLS: // 用印历史
      url = `/WM/Signet/EsAppmst/EsAppmstList?proid=${phIdPro || ''}`;
      break;
    case UrlTypeEnums.None: // 威科或指定链接地址
      url = linkAdr;
      break;
    default:
      break;
  }
  if (url) {
    openUrl(url.replace(/\${logid}/gi, userInfo.logid));
  }
};

export const getHttpUrl = (url) => {
  const userInfo = getUserInfo();
  if (url.indexOf('/') === 0) {
    url = url.substring(1);
  }
  if (userInfo.product === 'i8') {
    url = url.replace('/EntPC/PmsProjectInfo/', '/PC/ProjectTable/');
    if (url.indexOf('/PC/ProjectTable/') > -1) {
      const funName = url.split('?')[0].split('/').pop();
      url = url.replace('/' + funName, '/' + funName + 'I8');
    }
  }
  return `${window.C_ROOT}${url}`;
};

function encodeJson(str) {
  try {
    const Fn = Function;
    return new Fn('return ' + str)();
    //  return eval('(' + str + ')');
  } catch (e) {}
  return str;
}

const requesting = {};

function getKey(url, payload) {
  return encodeURIComponent(url + JSON.stringify(payload)).replace(/%/g, '');
}

function dealError(error, reject) {
  if (message.hide) {
    message.hide();
    message.hide = null;
  } else {
    message.destroy();
  }
  message.error(
    error.ErrorMessage ||
      error.Message ||
      error.Msg ||
      error.statusText ||
      '服务器错误',
  );
  reject(error);
}

function dealResult(res, requestArray) {
  console.log('dealResult:', res);
  if (typeof res === 'string') {
    res = encodeJson(res);
  }
  const resolve = (d) => requestArray.forEach((r) => r[0](d));
  const reject = (d) => requestArray.forEach((r) => r[1](d));

  if (!res) {
    resolve(res);
    return;
  }

  if (
    (typeof res === 'string' && res.indexOf('<!DOCTYPE html>') === 0) ||
    res.status === 404 ||
    res.ErrorMessage ||
    res.IsError
  ) {
    dealError(res, reject);
    return;
  }
  const tmp = res.KeyCodes || res.Results || res.Data || res.Record;
  if (tmp !== undefined) {
    resolve(tmp);
    return;
  }
  resolve(res);
}

export const getRequest = (url, payload = {}, testData) => {
  const key = getKey(url, payload);
  return new Promise((resolve, reject) => {
    if (requesting[key]) {
      console.warn('重复请求:', url);
      requesting[key].push([resolve, reject]);
      return;
    }
    requesting[key] = [[resolve, reject]];
    if (isTest) {
      setTimeout(() => {
        dealResult(testData, requesting[key]);
        requesting[key] = null;
        delete requesting[key];
      }, 250);
    } else {
      request(url, { ...payload })
        .then(
          (res) => {
            dealResult(res, requesting[key]);
          },
          () => {
            requesting[key].forEach((r) => r[1]());
          },
        )
        .finally(() => {
          requesting[key] = null;
          delete requesting[key];
        });
    }
  });
};

export const postRequest = (url, payload = {}, testData) => {
  const key = getKey(url, payload);
  return new Promise((resolve, reject) => {
    if (requesting[key]) {
      console.warn('重复请求:', url);
      requesting[key].push([resolve, reject]);
      return;
    }
    requesting[key] = [[resolve, reject]];
    if (isTest) {
      setTimeout(() => {
        dealResult(testData, requesting[key]);
        requesting[key] = null;
        delete requesting[key];
      }, 250);
    } else {
      request(url, { method: 'POST', data: payload, requestType: 'form' })
        .then(
          (res) => {
            dealResult(res, requesting[key]);
          },
          () => {
            requesting[key].forEach((r) => r[1]());
          },
        )
        .finally(() => {
          requesting[key] = null;
          delete requesting[key];
        });
    }
  });
};

//post 请求返回完整的请求返回数据
export const postRequestALl = (url, payload = {}, testData) => {
  const key = getKey(url, payload);
  return new Promise((resolve, reject) => {
    if (requesting[key]) {
      console.warn('重复请求:', url);
      requesting[key].push([resolve, reject]);
      return;
    }
    requesting[key] = [[resolve, reject]];
    if (isTest) {
      setTimeout(() => {
        dealResult(testData, requesting[key]);
        requesting[key] = null;
        delete requesting[key];
      }, 250);
    } else {
      request(url, { method: 'POST', data: payload, requestType: 'form' })
        .then(
          (res) => {
            resolve(res);
          },
          () => {
            requesting[key].forEach((r) => r[1]());
          },
        )
        .finally(() => {
          requesting[key] = null;
          delete requesting[key];
        });
    }
  });
};

/**
 * 获取对象的value值
 * @param obj 对象
 * @param dv 默认值
 * @param key 默认 value
 * @returns {string|*|string}
 */
export const getString = (obj, dv = '', key = 'value') => {
  if (obj) {
    return obj[key] || dv;
  } else {
    return dv;
  }
};

export const dateFormat = (date, format = 'YYYY-MM-DD HH:mm') => {
  return date ? moment(date).format(format) : '';
};

export const timeFormat = (date, time) => {
  const str = [];
  if (date) {
    str.push(dateFormat(date, 'YYYY-MM-DD'));
  }
  if (time) {
    str.push(moment(time).format('HH:mm'));
  }
  if (str.length > 0) {
    return str.join(' ');
  } else {
    return '';
  }
};

export const setValueInLabel = (obj, key, splitStr = '') => {
  const val = obj[key];
  if (typeof val !== 'object') {
    if (val !== '0' && val) {
      if (splitStr) {
        const labelArr = (obj[key + 'Dec'] || val).split(splitStr);
        return val
          .split(splitStr)
          .map((v, i) => ({ value: v, label: labelArr[i], key: v }));
      }
      return { value: val, label: obj[key + 'Dec'] || val, key: val };
    } else {
      return undefined;
    }
  }
  return val || undefined;
};

export function handleResult(result) {
  const status = (result && parseInt(result.Status)) || 0;
  if (!status) {
    message.error(result.Message);
    return false;
  } else {
    return true;
  }
}

export function getParentElementByClass(target, cls) {
  while (target) {
    if (target.classList.contains(cls)) {
      return target;
    }
    target = target.parentElement;
  }
  return null;
}

export function flatArray(arr, depth = 1) {
  if (Array.prototype.flat) {
    return arr.flat(depth);
  } else {
    const dgFn = (itemArr, dh) => {
      if (dh < 0 || !Array.isArray(itemArr)) {
        return [itemArr];
      }
      return itemArr.reduce((result, item) => {
        return [...result, ...dgFn(item, dh - 1)];
      }, []);
    };

    return dgFn(arr, depth);
  }
}

export function watchObject(obj, cb) {
  let callback = cb;
  Object.keys(obj).forEach((key) => {
    let val = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(value) {
        if (val !== value) {
          val = value;
          callback && callback(key, value);
        }
      },
    });
  });
  return () => {
    callback = null;
  };
}

export const elUtils = {
  addClass(target, cls) {
    target && target.classList.add(cls);
  },
  removeClass(target, cls) {
    target && target.classList.remove(cls);
  },
  closest(el, fn) {
    while (el && el.nodeType === 1) {
      if (fn(el)) {
        return el;
      }
      el = el.parentNode;
    }
    return null;
  },
};
