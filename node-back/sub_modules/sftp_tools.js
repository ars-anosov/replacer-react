'use strict';

var Client    = require('ssh2').Client
var fs        = require('fs')
var path      = require('path')

module.exports.sftpPut = function sftpPut(connSettings, srcFilePath, dstFilePath, cb) {

  // SFTP transfer index.html
  var conn = new Client();
  conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
      if (err) {
        console.log(err)
        cb({code: 202, message: 'SFTP connection error'})
      }

      var readStream = fs.createReadStream( srcFilePath );
      var writeStream = sftp.createWriteStream( dstFilePath ); // !!! ВНИМАТЕЛЬНО живой сайт !!!

      writeStream.on('close',function () {
          console.log( "- file transferred succesfully" );
          cb({code: 200, message: 'file transferred succesfully'})
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