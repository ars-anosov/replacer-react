'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Price = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PriceRow = require('./PriceRow');

var _PriceRow2 = _interopRequireDefault(_PriceRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Price = exports.Price = function (_React$Component) {
  _inherits(Price, _React$Component);

  function Price(args) {
    _classCallCheck(this, Price);

    // наполняю this от Page

    var _this = _possibleConstructorReturn(this, (Price.__proto__ || Object.getPrototypeOf(Price)).call(this, args));

    _this.state = {
      showResult: false,
      apiResult: null
    };

    _this.handleClkShowResult = _this.handleClkShowResult.bind(_this);

    _this.apiCmd = {
      token: window.localStorage.getItem('token'),
      get: 'http_price_get',
      put: 'http_price_put'

      //console.log(this.props.swgClient)
    };_this.getData = function () {
      var apiResultTemplate = [];

      _this.props.swgClient.apis.Http[_this.apiCmd.get]({
        token: _this.apiCmd.token
      }).then(function (res) {

        if (res.status === 200) {
          res.body.map(function (row, i) {
            apiResultTemplate.push(_react2.default.createElement(_PriceRow2.default, _extends({ Win: _this }, { row: row, idx: i + 1, key: i + 1 })));
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

  _createClass(Price, [{
    key: 'handleClkShowResult',
    value: function handleClkShowResult(event) {
      // Если результат скрыт, запрашиваем заново.
      if (!this.state.showResult) {
        this.setState({ apiResult: null });
        this.getData();
      }

      this.setState({ showResult: !this.state.showResult });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('Price render');

      var finalTemplate = _react2.default.createElement(
        'div',
        { className: 'std-win' },
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

  return Price;
}(_react2.default.Component);