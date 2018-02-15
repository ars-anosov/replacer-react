'use strict';

var m_img_get    = require('./img_img_get')
var m_img_post   = require('./img_img_post')




module.exports.img_get = function img_get(req, res, next) {
  m_img_get.apiAction(req, res, next)
}

module.exports.img_post = function img_post(req, res, next) {
  m_img_post.apiAction(req, res, next)
}
