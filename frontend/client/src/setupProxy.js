const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
	console.log('running')
	app.use(
		'/router',
		createProxyMiddleware({
			target: 'http://frontrouter:5000',
			changeOrigin:true,
			secure: false,

			
		})
	);
};
// const { createProxyMiddleware } = require('http-proxy-middleware');


// module.exports = function (app) {
// 	console.log('running')
// 	app.use(
// 		'/router',
// 		createProxyMiddleware({
// 			target: 'http://nginx:8080',
// 			changeOrigin:true,
// 			secure: false,

			
// 		})
// 	);
// };
