'use strict';

var m_script_addr_get    = require('./script_addr_get')
var m_script_addr_post   = require('./script_addr_post')
var m_script_addr_put    = require('./script_addr_put')
var m_script_addr_del    = require('./script_addr_del')

var m_script_sum_get     = require('./script_sum_get')
var m_script_sum_put     = require('./script_sum_put')




module.exports.script_addr_get = function script_addr_get(req, res, next) {
  m_script_addr_get.apiAction(req, res, next)
}

module.exports.script_addr_post = function script_addr_post(req, res, next) {
  m_script_addr_post.apiAction(req, res, next)
}

module.exports.script_addr_put = function script_addr_put(req, res, next) {
  m_script_addr_put.apiAction(req, res, next)
}

module.exports.script_addr_del = function script_addr_del(req, res, next) {
  m_script_addr_del.apiAction(req, res, next)
}


module.exports.script_sum_get = function script_sum_get(req, res, next) {
  m_script_sum_get.apiAction(req, res, next)
}

module.exports.script_sum_put = function script_sum_put(req, res, next) {
  m_script_sum_put.apiAction(req, res, next)
}