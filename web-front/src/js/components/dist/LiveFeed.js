'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiveFeed = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LiveFeedRow = require('./LiveFeedRow');

var _LiveFeedRow2 = _interopRequireDefault(_LiveFeedRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LiveFeed = exports.LiveFeed = function (_React$Component) {
  _inherits(LiveFeed, _React$Component);

  function LiveFeed(args) {
    _classCallCheck(this, LiveFeed);

    // наполняю this от Page

    var _this = _possibleConstructorReturn(this, (LiveFeed.__proto__ || Object.getPrototypeOf(LiveFeed)).call(this, args));

    _this.state = {
      showResult: false,
      apiResult: null
    };

    _this.handleClkShowResult = _this.handleClkShowResult.bind(_this);

    _this.apiCmd = {
      token: window.localStorage.getItem('token'),
      get: 'feed_get',
      post: 'feed_post',
      put: 'feed_put',
      del: 'feed_del',
      imglist_get: 'img_get'

      //console.log(this.props.swgClient)
    };_this.getFeeds = function () {
      var apiResultTemplate = [];

      var row_new = {
        "checkbox": false,
        "short_title": "Новая запись в живой ленте",
        "short_img": "assets/images/lf-item-img-2.png",
        "short_comments": "Короткий текст новой новости...",
        "long_title": "Новая запись в живой ленте (всплывашка)",
        "long_date": "00.00.2000",
        "long_img": "assets/images/lf-item-img-2.png",
        "long_content": "Длинный текст новой новости..."
      };
      apiResultTemplate.push(_react2.default.createElement(_LiveFeedRow2.default, _extends({ Win: _this }, { row: row_new, idx: 0, key: 0 })));

      _this.props.swgClient.apis.Http[_this.apiCmd.get]({ token: _this.apiCmd.token }).then(function (res) {

        if (res.status === 200) {
          res.body.map(function (row, i) {
            apiResultTemplate.push(_react2.default.createElement(_LiveFeedRow2.default, _extends({ Win: _this }, { row: row, idx: i + 1, key: i + 1 })));
          });
        } else {
          if (res.body.message === 'token Unauthorized') {
            document.getElementById('auth-win').setAttribute('class', 'auth-win');
          }
        }

        _this.setState({ apiResult: apiResultTemplate, showResult: true });
      }).catch(function (err) {
        // err
      });
    };
    return _this;
  }

  _createClass(LiveFeed, [{
    key: 'handleClkShowResult',
    value: function handleClkShowResult(event) {
      // Если результат скрыт, запрашиваем заново.
      if (!this.state.showResult) {
        this.setState({ apiResult: null });
        this.getFeeds();
      }

      this.setState({ showResult: !this.state.showResult });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('LiveFeed render');

      var finalTemplate = _react2.default.createElement(
        'div',
        { className: 'live-feed-win' },
        _react2.default.createElement(
          'div',
          { className: 'std-item-header', onClick: this.handleClkShowResult },
          this.props.headerTxt
        ),
        _react2.default.createElement(
          'div',
          { className: this.state.showResult ? '' : 'display-none' },
          this.state.apiResult
        )
      );

      return finalTemplate;
    }
  }]);

  return LiveFeed;
}(_react2.default.Component);