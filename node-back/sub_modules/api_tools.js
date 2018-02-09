'use strict';

module.exports.apiResJson = function apiResJson(res, resObj, statusCode) {
  var response = {};
  response['application/json'] = resObj;

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify(response[Object.keys(response)[0]] || {}, null, 2));
}