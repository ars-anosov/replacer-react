'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScriptSum = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScriptSum = exports.ScriptSum = function (_React$Component) {
  _inherits(ScriptSum, _React$Component);

  function ScriptSum(args) {
    _classCallCheck(this, ScriptSum);

    // наполняю this от Page

    var _this = _possibleConstructorReturn(this, (ScriptSum.__proto__ || Object.getPrototypeOf(ScriptSum)).call(this, args));

    _this.state = {
      showResult: false,
      apiResult: null,
      modBttnClass: 'gray-bttn',
      noLimit: 0,
      limit: 0
    };

    _this.handleClkShowResult = _this.handleClkShowResult.bind(_this);
    _this.handleChangeTextNotes = _this.handleChangeTextNotes.bind(_this);
    _this.handleClkAction = _this.handleClkAction.bind(_this);

    _this.apiCmd = {
      token: window.localStorage.getItem('token'),
      get: 'script_sum_get',
      put: 'script_sum_put'

      //console.log(this.props.swgClient)
    };_this.getData = function () {
      var apiResultTemplate = [];

      _this.props.swgClient.apis.Script[_this.apiCmd.get]({
        token: _this.apiCmd.token
      }).then(function (res) {

        if (res.status === 200) {
          _this.setState({ noLimit: res.body.noLimit, limit: res.body.limit, showResult: true });
        } else {
          if (res.body.message === 'token Unauthorized') {
            document.getElementById('auth-win').setAttribute('class', 'auth-win');
          }
        }
      }).catch(function (err) {
        // err
      });
    };

    return _this;
  }

  _createClass(ScriptSum, [{
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
    key: 'handleChangeTextNotes',
    value: function handleChangeTextNotes(event) {
      var spltId = event.target.id.split('-');
      switch (spltId[1]) {
        case 'noLimit':
          this.setState({ noLimit: event.target.value });
          break;
        case 'limit':
          this.setState({ limit: event.target.value });
          break;
      }

      this.setState({ modBttnClass: 'mod-bttn' });
      //this.setState({event.target.id: event.target.value})
    }
  }, {
    key: 'handleClkAction',
    value: function handleClkAction(event) {
      var _this2 = this;

      switch (true) {

        case event.target.value === 'mod':
          this.props.swgClient.apis.Script[this.apiCmd.put]({
            token: this.apiCmd.token,
            body: {
              noLimit: parseInt(this.state.noLimit),
              limit: parseInt(this.state.limit)
            }
          }).then(function (res) {
            _this2.setState({ modBttnClass: 'gray-bttn' });
          });
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('ScriptSum render');

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
          '\u0411\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { id: '1-noLimit', className: 'script-sum-input', type: 'text', value: this.state.noLimit, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          '\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u044B\u0439:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { id: '1-limit', className: 'script-sum-input', type: 'text', value: this.state.limit, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'button',
            { className: this.state.modBttnClass, onClick: this.handleClkAction, value: 'mod' },
            '\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C'
          )
        )
      );

      return finalTemplate;
    }
  }]);

  return ScriptSum;
}(_react2.default.Component);