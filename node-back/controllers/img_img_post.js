'use strict';

var apiTools  = require('../sub_modules/api_tools')
var sftpTools = require('../sub_modules/sftp_tools')

var fs        = require('fs')
var path      = require('path')

//https://github.com/image-size/image-size
// Synchronous
var sizeOf = require('image-size');

exports.apiAction = function(req, res, next) {

  var args                 = req.swagger.params
  var sftpSettings        = req.myObj.sftp
  //console.log(args.file.value)

  // Только подходящий тип
  if (args.file.value.mimetype === 'image/png' || args.file.value.mimetype === 'image/jpeg') {
      let dimensions = sizeOf(args.file.value.buffer)
    // Только подходящий размер
    if (dimensions.width >= 330 && dimensions.width <= 350 && dimensions.height >= 194 && dimensions.height <= 205) {
      var localDstFilePath = path.join(__dirname,'../static_result/img/'+args.file.value.originalname)

      fs.writeFile(localDstFilePath, args.file.value.buffer, 'ascii', function(err) {
        if (err) {
          apiTools.apiResJson(res, {code: 202, message: 'img not posted'}, 202)
          console.log(err)
        }
        else {

          let dstFilePath = sftpSettings.sftpPath+'/assets/images/'+args.file.value.originalname
          console.log(dstFilePath)

          sftpTools.sftpPut(sftpSettings, localDstFilePath, dstFilePath, (response) => {
            apiTools.apiResJson(res, response, response.code)
          })
          //apiTools.apiResJson(res, {code: 200, message: args.file.value.originalname+' uploaded'}, 200)
        }
      })
    }
    else {
      apiTools.apiResJson(res, {code: 202, message: 'Неверный размер картинки: '+ dimensions.width+'x'+dimensions.height}, 202)
    }
  }
  else {
    apiTools.apiResJson(res, {code: 202, message: 'Неверный тип файла: '+ args.file.value.mimetype}, 202)
  }
}