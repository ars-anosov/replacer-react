'use strict';

var apiTools  = require('../sub_modules/api_tools')
var sftpTools  = require('../sub_modules/sftp_tools')

var cheerio   = require('cheerio')
var fs        = require('fs')
var path      = require('path')


exports.apiAction = function(req, res, next) {

  var idx                 = req.swagger.params.idx.value
  //console.log(args)
  var sftpSettings        = req.myObj.sftp
  var request             = req.myObj.request.module
  
  var reqOptions          = {...req.myObj.request.reqOptions}


  reqOptions.url = reqOptions.url+'/index.html'
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      
      var $ = cheerio.load(requestBody)

      // Удаляю элемент
      if (idx > 0) {
        $('.lf-item').eq(idx-1).remove()
        $('#article-'+idx).remove()
      }

      // Изменяю нумерацию article
      var j = 1
      for (let i = 1; i <= $('.lf-item').length+1 ; i = i+1) {
        if ( $('#article-'+i + ' > .article__title').text() ) {
          $('#article-'+i).attr('id', 'article_tmp-'+j)
          console.log(i + ' -> ' + 'tmp-'+j)
          j = j + 1
        }
      }
      $('.article').map((i, row) => {
        let spltTxt = $(row).attr('id').split('-')
        console.log(spltTxt[0]+'-'+spltTxt[1] + ' -> ' + 'article-'+spltTxt[1])
        $(row).attr('id', 'article-'+spltTxt[1])
      })

      var htmlResult = $.html({decodeEntities: false})
      //console.log(htmlResult)



      fs.writeFileSync('./static_result/index.html', htmlResult);

      let srcFilePath = path.join(__dirname,'../static_result/index.html')
      let dstFilePath = sftpSettings.sftpPath+'/index.html'

      sftpTools.sftpPut(sftpSettings, srcFilePath, dstFilePath, (response) => {
        apiTools.apiResJson(res, response, response.code)
      })
      //apiTools.apiResJson(res, {code: 202, message: idx+' idx deleted'}, 202)

    }
    else {
      apiTools.apiResJson(res, {code: 202, message: 'GET index.html no result'}, 202)
    }
  })





}