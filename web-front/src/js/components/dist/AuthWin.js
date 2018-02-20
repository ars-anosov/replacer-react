'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthWin = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthWin = exports.AuthWin = function (_React$Component) {
  _inherits(AuthWin, _React$Component);

  function AuthWin(args) {
    _classCallCheck(this, AuthWin);

    // наполняю this от PageAuth

    var _this = _possibleConstructorReturn(this, (AuthWin.__proto__ || Object.getPrototypeOf(AuthWin)).call(this, args));

    _this.state = {
      showWin: false
    };

    if (typeof window.Storage === 'undefined') {
      alert('Storage turned off...');
    }

    _this.onBtnClickHandler = function () {

      var authName = _this.refs.authName.value;
      var authPass = _this.refs.authPass.value;

      if (authName && authPass) {
        _this.props.swgClient.apis.Client.token_get({ auth_name: authName, auth_pass: authPass }).then(function (res) {
          if (res.status == '200' && res.body) {
            _this.setState({ showWin: false });
            window.localStorage.setItem('token', res.body.token);
            window.location.reload();
          }
          if (res.status == '202' && res.body) {
            //alert(res.body.message)
          }
        }).catch(function (err) {
          //console.log(err)
        });
      }
    };

    // Проверка пригодности token
    _this.props.swgClient.apis.Img.img_get({
      token: window.localStorage.getItem('token')
    }).then(function (res) {
      if (res.status === 200) {
        _this.setState({ showWin: false });
      } else {
        _this.setState({ showWin: true });
      }
    }).catch(function (err) {
      // err
    });

    return _this;
  }

  _createClass(AuthWin, [{
    key: 'render',
    value: function render() {
      var finalTemplate = _react2.default.createElement(
        'div',
        { className: this.state.showWin ? 'auth-win' : 'display-none', id: 'auth-win' },
        _react2.default.createElement('input', {
          type: 'text',
          defaultValue: '',
          placeholder: 'name',
          ref: 'authName'
        }),
        _react2.default.createElement('input', {
          type: 'password',
          defaultValue: '',
          placeholder: 'password',
          ref: 'authPass'
        }),
        _react2.default.createElement(
          'button',
          { onClick: this.onBtnClickHandler },
          'Login'
        )
      );

      return finalTemplate;
    }
  }]);

  return AuthWin;
}(_react2.default.Component);