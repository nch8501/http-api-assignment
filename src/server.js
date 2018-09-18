const http = require('http');
const url = require('url');

const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  notFound: responseHandler.notFound,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);
  
  switch(request.method){
		case 'GET':
			if(parsedUrl.pathname === '/'){
				htmlHandler.getIndex(request, response);
			}
			else if(parsedUrl.pathname === '/style.css'){
				htmlHandler.getCSS(request, response);
			}
			else if(urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
      }
			else{
				urlStruct.notFound(request, response, params, acceptedTypes);
			}
			break;
		default:
      break;
	}
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
