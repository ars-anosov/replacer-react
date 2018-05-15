'use strict';

var apiTools  = require('../sub_modules/api_tools')
var sftpTools = require('../sub_modules/sftp_tools')

var cheerio   = require('cheerio')
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


  // Еще на заглавной странице
  var request             = req.myObj.request.module
  var reqOptions          = {...req.myObj.request.reqOptions}

  reqOptions.url = reqOptions.url+'/index.html'
  console.log(reqOptions)
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {

      var $ = cheerio.load(requestBody)
      $('.light > .half-header__cell > .h-items > .h-item > .h-item__desc > span').eq(2).text(body.noLimit +' &#8381; / 30 дней')
      $('.dark > .half-header__cell > .h-items > .h-item > .h-item__desc > span').eq(2).text(body.limit +' &#8381; / 30 дней')
      var htmlResult = $.html({decodeEntities: false})



      srcFilePath = path.join(__dirname,'../static_result/index.html')
      dstFilePath = sftpSettings.sftpPath+'/index.html'

      fs.writeFileSync(srcFilePath, htmlResult)
      sftpTools.sftpPut(sftpSettings, srcFilePath, dstFilePath, (response) => {
        //apiTools.apiResJson(res, response, response.code)
        console.log(response)
      })

    }
  })

}