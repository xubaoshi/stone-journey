exports.keys = 'StoneJourney';

// mount middleware
exports.middleware = ['errorHandler', 'apiWrapper'];
exports.errorHandler = {
    match: '/api'
};

exports.security = {
    domainWhiteList:[
      'http://127.0.0.1'
    ],
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
};

exports.cors = {
  allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
};

exports.redis = {
  client: {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: 'auth',
    db: 0,
  },
}



