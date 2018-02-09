'use strict';

var m_feed_get    = require('./http_feed_get')
var m_feed_post   = require('./http_feed_post')
var m_feed_put    = require('./http_feed_put')
var m_feed_del    = require('./http_feed_del')





module.exports.feed_get = function feed_get(req, res, next) {
  m_feed_get.apiAction(req, res, next)
}

module.exports.feed_post = function feed_post(req, res, next) {
  m_feed_post.apiAction(req, res, next)
}

module.exports.feed_put = function feed_put(req, res, next) {
  m_feed_put.apiAction(req, res, next)
}

module.exports.feed_del = function feed_del(req, res, next) {
  m_feed_del.apiAction(req, res, next)
}