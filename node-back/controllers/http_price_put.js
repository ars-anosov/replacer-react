'use strict';

var apiTools  = require('../sub_modules/api_tools')
var sftpTools = require('../sub_modules/sftp_tools')

var cheerio   = require('cheerio')
var fs        = require('fs')
var path      = require('path')


exports.apiAction = function(req, res, next) {

  var device              = req.swagger.params.body.value.device
  var price               = req.swagger.params.body.value.price
  //console.log(body)
  var sftpSettings        = req.myObj.sftp
  var request             = req.myObj.request.module
  
  var reqOptions          = {...req.myObj.request.reqOptions}

  reqOptions.url = reqOptions.url+'/index.html'
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      //console.log(requestRes.statusCode)
      //console.log(requestBody)
      
      var $ = cheerio.load(requestBody)

      var writeFlag = false
      switch (device) {
        case 'tv-1':
          // white
          $('.tv-1').attr('data-tv-1-sum', price)
          $('.tv-1 > p > .o-items__sum').text('+ '+price+' &#8381')

          // black
          $('.tv-l-1').attr('data-tv-l-1-sum', price)
          $('.tv-l-1 > p > .o-items__sum').text('+ '+price+' &#8381')

          writeFlag = true
          break
        
        default:
          apiTools.apiResJson(res, {code: 202, message: 'no device'}, 202)
          break
      }

      if (writeFlag) {
        var htmlResult = $.html({decodeEntities: false})
        //console.log(htmlResult)



        fs.writeFileSync('./static_result/index.html', htmlResult);

        let srcFilePath = path.join(__dirname,'../static_result/index.html')
        let dstFilePath = sftpSettings.sftpPath+'/index.html'

        sftpTools.sftpPut(sftpSettings, srcFilePath, dstFilePath, (response) => {
          apiTools.apiResJson(res, response, response.code)
        })
        //apiTools.apiResJson(res, {code: 202, message: 'attr set'}, 202)
      }

    }
    else {
      apiTools.apiResJson(res, {code: 202, message: 'GET index.html no result'}, 202)
    }
  })





}