const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'https://localhost:7007';

const context = [
    "/api",
];

const onError = (err, req, resp, target) => {
    console.error(`${err.message}`);
}

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        // Handle errors to prevent the proxy middleware from crashing when
        // the ASP NET Core webserver is unavailable
        onError: onError,
        secure: false,
        // Uncomment this line to add support for proxying websockets
        //ws: true,
        headers: {
            Connection: 'Keep-Alive'
        }
    });

    app.use(appProxy);
};
