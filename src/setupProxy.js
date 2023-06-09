// https://create-react-app.dev/docs/proxying-api-requests-in-development
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3408/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};