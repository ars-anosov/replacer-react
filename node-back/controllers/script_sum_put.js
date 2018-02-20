'use strict';

var apiTools  = require('../sub_modules/api_tools')
var sftpTools = require('../sub_modules/sftp_tools')

var fs        = require('fs')
var path      = require('path')


exports.apiAction = function(req, res, next) {

  var body                = req.swagger.params.body.value
  var sftpSettings        = req.myObj.sftp

  // Превращаю body в строку -> finalStr
  var finalStr = JSON.stringify(body, null, 2)

  // Записываю и отправляю по sftp
  let srcFilePath = path.join(__dirname,'../static_result/scripts/replacer__sum.js')
  let dstFilePath = sftpSettings.sftpPath+'/assets/scripts/replacer__sum.js'
  
  fs.writeFileSync(srcFilePath, 'var sum = '+finalStr+';');
  sftpTools.sftpPut(sftpSettings, srcFilePath, dstFilePath, (response) => {
    apiTools.apiResJson(res, response, response.code)
  })

  //apiTools.apiResJson(res, {code: 200, message: 'Put test'}, 200)

}