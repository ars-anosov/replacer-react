'use strict';

var apiTools  = require('../sub_modules/api_tools')
var sftpTools = require('../sub_modules/sftp_tools')

var fs        = require('fs')
var path      = require('path')


exports.apiAction = function(req, res, next) {

  var request             = req.myObj.request.module
  var reqOptions          = {...req.myObj.request.reqOptions}

  reqOptions.url = reqOptions.url+'/assets/scripts/replacer__addr.js'

  var city                = req.swagger.params.city.value
  var sftpSettings        = req.myObj.sftp

  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      
      // Получаю JSON объект -> jsonResult
      var clearResult = requestBody
      clearResult = clearResult.replace(/^var replacer__addr = /, '').replace(/\}\;/, '}');
      var jsonResult = JSON.parse(clearResult)
      
      // Воздействую на jsonResult
      for (var key in jsonResult) {
        if (key === city) {
          delete(jsonResult[key])
        }
      }

      // Превращаю jsonResult в строку -> finalStr
      var finalStr = JSON.stringify(jsonResult, null, 2)

      // Записываю и отправляю по sftp
      let srcFilePath = path.join(__dirname,'../static_result/scripts/replacer__addr.js')
      let dstFilePath = sftpSettings.sftpPath+'/assets/scripts/replacer__addr.js'
    
      fs.writeFileSync(srcFilePath, 'var replacer__addr = '+finalStr+';');
      sftpTools.sftpPut(sftpSettings, srcFilePath, dstFilePath, (response) => {
        apiTools.apiResJson(res, response, response.code)
      })

      //apiTools.apiResJson(res, {code: 200, message: 'Del test'}, 200)

    }
    else {
      apiTools.apiResJson(res, {code: 202, message: 'get file problem'}, 202)
    }

  })

}