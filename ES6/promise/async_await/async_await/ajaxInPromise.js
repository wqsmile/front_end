function ajax(options) {
  return new Promise((resolve, reject) => {
    var {
      url = '',
      method = 'get',
      data = '',
      success,
      async = true // 是否异步请求
    } = options;

    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject('Mrcrosoft-XMLHTTP');
    } else {
      return alert('您的浏览器不支持XMLHttpRequest')
    }

    var dataStr = '';
    if (typeof data === 'object' && data !== null) {
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          datatStr += prop + '=' + data[prop] + '&';
        }
      }
      dataStr.slice(0, dataStr.length - 1);
    } else if (typeof data === 'string') {
      dataStr = data;
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {        
        if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) { // 第二次请求相同内容时，若有缓存，则返回304
          resolve(JSON.parse(xhr.responseText));
          // success && success(xhr.responseText)
        } else {
          // alert('Request eas unsuccessful: ' + xhr.status)
          reject(xhr.status);
        }
      }
    }

    method = method.toLowerCase();
    if (method === 'get') {
      xhr.open(method, url + '?' + dataStr, async) // 建立链接
      xhr.send(null); // 发送请求
    } else if (method === 'post') {
      xhr.open(method, url, async);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(dataStr);
    }

  })
}