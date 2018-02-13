'use strict';

var apiTools  = require('../sub_modules/api_tools')
var cheerio   = require('cheerio')

var Client    = require('ssh2').Client;
var fs        = require('fs');
var path      = require('path')



exports.apiAction = function(req, res, next) {

  var args                = req.swagger.params.body.value
  //console.log(args)
  var sftpHost            = req.myObj.sftpHost
  var sftpUser            = req.myObj.sftpUser
  var sftpPass            = req.myObj.sftpPass

  var request             = req.myObj.request.module
  var reqOptions          = {...req.myObj.request.reqOptions}


  reqOptions.url = reqOptions.url+'/test/index.html'
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      //console.log(requestRes.statusCode)
      //console.log(requestBody)
      
      var $ = cheerio.load(requestBody)

      //Короткие
      var itemStr = ''+
'\n<!-- начало lf новости -->'+
'\n\t\t\t\t\t\t<div class="lf-item">'+
'\n\t\t\t\t\t\t\t<div class="lf-item__img">'+
'\n\t\t\t\t\t\t\t\t<img src="'+args.short_img+'">'+
'\n\t\t\t\t\t\t\t</div>'+
'\n\t\t\t\t\t\t\t<div class="lf-item__desc">'+
'\n\t\t\t\t\t\t\t\t<div class="lf-item__title">'+
'\n\t\t\t\t\t\t\t\t\t<h4>'+args.short_title+'</h4>'+
'\n\t\t\t\t\t\t\t\t\t<p class="lf-item__comments">'+args.short_comments+'</p>'+
'\n\t\t\t\t\t\t\t\t</div>'+
'\n\t\t\t\t\t\t\t\t<span class="lf-item__link link">Узнать больше</span>'+
'\n\t\t\t\t\t\t\t</div>'+
'\n\t\t\t\t\t\t</div>'+
'\n<!-- конец lf новости -->'
'\n'

      // Добавляю новый itemStr
      $('.lf-items').prepend(itemStr)
      
      //Длинные
      var itemStr2 = ''+
'\n<!-- начало lf всплывашки -->'+
'\n\t\t\t<div id="article-1" class="article mfp-hide">'+
'\n\t\t\t\t<div class="article__title">'+args.long_title+'</div>'+
'\n\t\t\t\t<div class="article__date">'+args.long_date+'</div>'+
'\n\t\t\t\t<div class="article__content">'+
'\n\t\t\t\t\t<img src="'+args.long_img+'" class="article__img" alt="Alt" role="presentation">'+
'\n\t\t\t\t\t<p>'+
args.long_content+
'\n\t\t\t\t\t</p>'+
'\n\t\t\t\t</div>'+
'\n\t\t\t</div>'+
'\n<!-- конец lf всплывашки -->'+
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











      // SFTP transfer index.html
      var connSettings = {
           host: sftpHost,
           port: 22,
           username: sftpUser,
           password: sftpPass
      };
       
      var conn = new Client();
      conn.on('ready', function() {
        conn.sftp(function(err, sftp) {
          if (err) {
            console.log(err)
            apiTools.apiResJson(res, {code: 202, message: 'SFTP connection error'}, 202)
          }
           
          var srcFilePath = path.join(__dirname,'../static_result/index.html')
          var readStream = fs.createReadStream( srcFilePath );
          var writeStream = sftp.createWriteStream( '/var/www/domonet/data/www/xn--80ahqgegdcb.xn--p1ai/test/index.html' ); // !!! ВНИМАТЕЛЬНО живой сайт !!!
      
          writeStream.on('close',function () {
              console.log( "- file transferred succesfully" );
              apiTools.apiResJson(res, {code: 200, message: 'remote index.html updated'}, 200)
          });
      
          writeStream.on('end', function () {
              console.log( "sftp connection closed" );
              conn.close();
          });
      
          // initiate transfer of file
          readStream.pipe( writeStream );
        });
      }).connect(connSettings);



    }
    else {
      apiTools.apiResJson(res, {code: 202, message: 'GET index.html no result'}, 202)
    }
  })





}