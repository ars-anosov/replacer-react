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

        case 'tv':
          
          $('.option > .option__content > .option__items__wrap > .o-items > .o-items__product-1').map((i, row) => {
            $(row).attr('data-tv', price)
          })
          
          $('.option > .option__content > .option__items__wrap > .o-items > .o-items__product-1 > p > .o-items__sum').map((i, row) => {
            $(row).text('+ '+price+' &#8381;')
          })

          writeFlag = true
          break

        case 'tv-1':
          // nolimit (белая)
          $('.tv-1').attr('data-tv-1-sum', price)
          $('.tv-1 > p > .o-items__sum').text('+ '+price+' &#8381;')

          // limit (черная)
          $('.tv-l-1').attr('data-tv-l-1-sum', price)
          $('.tv-l-1 > p > .o-items__sum').text('+ '+price+' &#8381;')

          writeFlag = true
          break

        case 'wi-fi-1':
          // nolimit (белая)
          $('.wi-fi-1').attr('data-wi-fi-1-sum', price)
          $('.wi-fi-1 > p > .o-items__sum').text('+ '+price+' &#8381;')

          // limit (черная)
          $('.wi-fi-l-1').attr('data-wi-fi-l-1-sum', price)
          $('.wi-fi-l-1 > p > .o-items__sum').text('+ '+price+' &#8381;')

          writeFlag = true
          break

        case 'wi-fi-2':
          // nolimit (белая)
          $('.wi-fi-2').attr('data-wi-fi-2-sum', price)
          $('.wi-fi-2 > p > .o-items__sum').text('+ '+price+' &#8381;')

          // limit (черная)
          $('.wi-fi-l-2').attr('data-wi-fi-l-2-sum', price)
          $('.wi-fi-l-2 > p > .o-items__sum').text('+ '+price+' &#8381;')

          writeFlag = true
          break

        case 'wi-fi-3':
          // nolimit (белая)
          $('.wi-fi-3').attr('data-wi-fi-3-sum', price)
          $('.wi-fi-3 > p > .o-items__sum').text('+ '+price+' &#8381;')

          // limit (черная)
          $('.wi-fi-l-3').attr('data-wi-fi-l-3-sum', price)
          $('.wi-fi-l-3 > p > .o-items__sum').text('+ '+price+' &#8381;')

          writeFlag = true
          break
        
        default:
          apiTools.apiResJson(res, {code: 202, message: 'no device'}, 202)
          break
      }

      if (writeFlag) {
        var htmlResult = $.html({decodeEntities: false})
        //console.log(htmlResult)



        let srcFilePath = path.join(__dirname,'../static_result/index.html')
        let dstFilePath = sftpSettings.sftpPath+'/index.html'

        fs.writeFileSync(srcFilePath, htmlResult)
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