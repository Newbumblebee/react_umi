import { extend } from 'umi-request';
import { notification } from 'antd';

function getCookie(name, dv = null) {
  let arr;
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]) || dv;
  else return dv;
}

function getQueryValue(search, queryName) {
  const reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i');
  if (search.indexOf('?') === 0) {
    search = search.substr(1);
  }
  const r = search.match(reg);
  if (r != null) {
    return decodeURI(r[2]) || '';
  } else {
    return '';
  }
}

let _userInfo = null;

function getUserInfo() {
  if (!_userInfo) {
    let cw = window;
    let ret = {
      dbServer: '',
      logid: '',
      ocode: '',
      orgID: '',
      uCode: '',
      userID: '',
      username: '',
    };
    while (cw !== window.top) {
      if (cw.MainFrame) break;
      else cw = cw.parent;
    }
    if (cw.$appinfo) {
      ret = cw.$appinfo;
    } else if (window.external && window.external.GetAppInfo) {
      const tmp = window.external.GetAppInfo('votingurl');
      ret = {
        dbServer: '',
        logid: getQueryValue(tmp, 'LoginID'), //登录
        ocode: getQueryValue(tmp, 'orgCode'), //组织
        orgID: window.external.GetAppInfo('orgid'), //组织PhId
        uCode: getQueryValue(tmp, 'userCode'), //DBName
        userID: '',
        username: '',
      };
    }
    const reg = new RegExp('^Auth\\$#\\$.*\\$#\\$.*\\$#\\$' + ret.logid + '$');
    const authKey = Object.keys(window.sessionStorage).find((key) =>
      reg.test(key),
    );
    let product = window['C_ROOT'].replace(/\//g, '');
    let Authorization = getQueryValue(window.location.search, 'Authorization');
    if (authKey) {
      product = authKey.split('$#$')[1];
      Authorization =
        Authorization || window.sessionStorage.getItem(authKey) || '';
    }
    const lang = getCookie('recentLanguage', 'zh-CN');
    _userInfo = {
      ...ret,
      lang,
      product,
      Authorization: decodeURIComponent(Authorization),
    };
  }
  return _userInfo;
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

//设置host
const request = extend({
  errorHandler, // 默认错误处理
  mode: 'cors',
  headers: {
    Authorization: getUserInfo().Authorization,
  },
  credentials: 'include', // 默认请求是否带上cookie
});

function handleParams(params) {
  if (!params) return '';
  return Object.keys(params).reduce(function (acc, ckey) {
    if (params[ckey] !== undefined) {
      return `${acc}&${ckey}=${
        typeof params[ckey] === 'object'
          ? JSON.stringify(params[ckey])
          : params[ckey]
      }`;
    } else {
      return acc;
    }
  }, '');
}

function handleURL(url, payload) {
  const params = handleParams(payload);
  if (!params) return url;
  if (url.indexOf('?') < 0) {
    return `${url}?${params.substr(1)}`;
  }

  if (url.charAt(url.length - 1) === '?') {
    return `${url}${params.substr(1)}`;
  } else {
    return `${url}${params}`;
  }
}

export { getCookie, getQueryValue, getUserInfo };

export default function (url, payload) {
  if (payload && payload.method === 'POST') {
    payload.data = payload.data || {};
    payload.data.AppTitle = document.title;
    return request(url, payload);
  } else {
    return request(handleURL(url, { ...payload }));
  }
}

export function get(url, params, options = {}) {
  return request(handleURL(url, params), { ...options, method: 'GET' });
}

export function pfRequest(url, payload) {
  return request(url, {
    ...payload,
    method: 'POST',
    body: handleFormPost(payload),
    headers: {
      'content-type': 'application/x-www-form-urlencoded', //application/x-www-form-urlencoded
    },
    credentials: 'include',
  });
}

function handleFormPost(obj = {}) {
  return Object.keys(obj)
    .map((key) => {
      if (typeof obj[key] === 'object') {
        return `${key}=${JSON.stringify(obj[key])}`;
      }
      return `${key}=${obj[key]}`;
    })
    .join('&');
}
