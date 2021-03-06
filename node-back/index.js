'use strict';

// Arguments ---------------------------------------------
var nodePath  = process.argv[0]
var appPath   = process.argv[1]

var httpUrl    = process.argv[2]
var sftpHost   = process.argv[3]
var sftpPath   = process.argv[4]
var sftpUser   = process.argv[5]
var sftpPass   = process.argv[6]


console.log('HTTP URL:       '+httpUrl)
console.log()
console.log('SFTP Host:      '+sftpHost)
console.log('SFTP path:      '+sftpPath)
console.log('SFTP User:      '+sftpUser)
console.log('SFTP Password:  '+sftpPass)
console.log()



var fs = require('fs'),
    path = require('path')

var app = require('connect')()
var swaggerTools = require('swagger-tools')
var jsyaml = require('js-yaml')

var http = require('http')
var serverPort = 8008

var aaa_handle    = require('./sub_modules/aaa_handle')

//var https = require('https');
//var httpsServerPort = 8002;
//var httpsOptions = {
//  //ca:   fs.readFileSync('ssl/ca.crt'),
//  key:  fs.readFileSync('ssl/server.key'),
//  cert: fs.readFileSync('ssl/server.crt')  
//};

// https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/replacer-api.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);




// Глобальные переменные для мутации
const request = require('request');
var reqOptions = {  
  url: httpUrl,
  method: 'GET',
  encoding: 'utf8'
};

var aaa = {}

var sftp = {
  'port': 22,
  'host': sftpHost,
  'sftpPath': sftpPath,
  'username': sftpUser,
}
if (sftpPass) { sftp.password   = sftpPass }
else          { sftp.privateKey = fs.readFileSync('/root/.ssh/id_rsa') }




// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {


  // Работаю с модулем connect ======================================

  // Дополняю connect req дополнительными объектами
  app.use(function(req, res, next) {
    req.myObj = {
      'request': {
        'module': request,
        'reqOptions': reqOptions
      },
      'sftp': sftp,
      'aaa': aaa
    };
    next();
  });

  // CORS - добавляю заголовки
  app.use(function (req, res, next) {
    //console.log(req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // После OAuth2 клиент пробъет запросом OPTION с Access-Control-Request-Headers: authorization  +  Access-Control-Request-Method:GET
    // Надо сообщить браузеру клиента что мы эту умеем такое
    res.setHeader('Access-Control-Allow-Headers', 'authorization, token, content-type')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    next();
  });
  
  // Не включаю умную обработку OPTIONS
  app.use(function(req, res, next) {
    if (req.method == 'OPTIONS') {
      res.end();
    }
    else {
      next();
    }
  });

  // Если у запроса есть в Header поле Authorization:Bearer значит была пройдена OAuth2
  app.use(function(req, res, next) {
    if (req.headers.authorization) {
      console.log(req.headers.authorization);
    }
    next();
  });

  // Заготовка на отдачу static файла
  app.use(function (req, res, next) {

    switch (true) {

      case (req.url === '/favion.ico'):
        res.end()
        break

      case (req.url === '/miserables.json'):
        console.log('miserables.json')
        res.end()
        break

      default:
        next();
        break

    }

  });








  // Работаю с модулем swaggerTools (объект middleware) =============
  // https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator({
    validateResponse: true
  }));

  // AAA на базе HTTP Header "token"
  app.use(aaa_handle.checkAuth)

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  // https://github.com/apigee-127/swagger-tools/blob/master/middleware/swagger-ui.js
  app.use(middleware.swaggerUi({
    apiDocs: '/spec/swagger.json',
    swaggerUi: '/spec-ui'
  }));





  // Работаю с модулем http, https ==================================
  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Swagger UI started --> http://host:'+serverPort+'/spec-ui/');
  });

  //https.createServer(httpsOptions, app).listen(httpsServerPort, function () {
  //  console.log('Swagger https started on port '+httpsServerPort);
  //});

});
