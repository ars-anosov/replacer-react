'use strict';

var apiTools  = require('../sub_modules/api_tools')
var sftpTools = require('../sub_modules/sftp_tools')

var cheerio   = require('cheerio')
var fs        = require('fs')
var path      = require('path')


exports.apiAction = function(req, res, next) {
  //console.log(req.swagger.params)
  var body                = req.swagger.params.body.value

  var sftpSettings        = req.myObj.sftp
  var request             = req.myObj.request.module
  
  var reqOptions          = {...req.myObj.request.reqOptions}
  var displayItem         = body.checkbox ? '' : ' mfp-hide'


  reqOptions.url = reqOptions.url+'/index.html'
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      //console.log(requestRes.statusCode)
      //console.log(requestBody)
      
      var $ = cheerio.load(requestBody)

      //Короткие
      var itemStr = ''+
'\n\t\t\t\t\t\t<div class="lf-item'+displayItem+'">'+
'\n\t\t\t\t\t\t\t<div class="lf-item__img">'+
'\n\t\t\t\t\t\t\t\t<img src="'+body.short_img+'">'+
'\n\t\t\t\t\t\t\t</div>'+
'\n\t\t\t\t\t\t\t<div class="lf-item__desc">'+
'\n\t\t\t\t\t\t\t\t<div class="lf-item__title">'+
'\n\t\t\t\t\t\t\t\t\t<h4>'+body.short_title+'</h4>'+
'\n\t\t\t\t\t\t\t\t\t<p class="lf-item__comments">'+body.short_comments+'</p>'+
'\n\t\t\t\t\t\t\t\t</div>'+
'\n\t\t\t\t\t\t\t\t<span class="lf-item__link link">Узнать больше</span>'+
'\n\t\t\t\t\t\t\t</div>'+
'\n\t\t\t\t\t\t</div>'+
'\n'

      // Добавляю новый itemStr
      $('.lf-items').prepend(itemStr)
      
      //Длинные
      var itemStr2 = ''+
'\n\t\t\t<div id="article-1" class="article mfp-hide">'+
'\n\t\t\t\t<div class="article__title">'+body.long_title+'</div>'+
'\n\t\t\t\t<div class="article__date">'+body.long_date+'</div>'+
'\n\t\t\t\t<div class="article__content">'+
'\n\t\t\t\t\t<img src="'+body.long_img+'" class="article__img" alt="Alt" role="presentation">'+
'\n\t\t\t\t\t<p>'+
body.long_content+
'\n\t\t\t\t\t</p>'+
'\n\t\t\t\t</div>'+
'\n\t\t\t</div>'+
'\n'
      
      // Сдвигаю id предыдущих элементов +1
      $('.article').map((i, row) => {
        let spltTxt = $(row).attr('id').split('-')
        $(row).attr('id', 'article-'+(parseInt(spltTxt[1])+1).toString() )
      })

      // Добавляю новый itemStr2 с id="article-1"
      $('.main-content').append(itemStr2)


      var htmlResult = $.html({decodeEntities: false})
      //console.log(htmlResult)



      fs.writeFileSync('./static_result/index.html', htmlResult);

      let srcFilePath = path.join(__dirname,'../static_result/index.html')
      let dstFilePath = sftpSettings.sftpPath+'/index.html'

      sftpTools.sftpPut(sftpSettings, srcFilePath, dstFilePath, (response) => {
        apiTools.apiResJson(res, response, response.code)
      })
      //apiTools.apiResJson(res, {code: 202, message: 'idx 1 added'}, 202)

    }
    else {
      apiTools.apiResJson(res, {code: 202, message: 'GET index.html no result'}, 202)
    }
  })





}