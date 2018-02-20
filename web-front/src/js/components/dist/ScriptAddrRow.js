'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScriptAddrRow = function (_React$Component) {
  _inherits(ScriptAddrRow, _React$Component);

  function ScriptAddrRow(args) {
    _classCallCheck(this, ScriptAddrRow);

    // наполняю this от Win

    var _this = _possibleConstructorReturn(this, (ScriptAddrRow.__proto__ || Object.getPrototypeOf(ScriptAddrRow)).call(this, args));

    _this.state = {
      city: _this.props.row.city,
      streetsTxt: _this.props.streetsTxt,
      showResult: false,
      modBttnClass: 'gray-bttn'
    };

    _this.handleChangeTextNotes = _this.handleChangeTextNotes.bind(_this);
    _this.handleClkShowResult = _this.handleClkShowResult.bind(_this);
    _this.handleClkAction = _this.handleClkAction.bind(_this);

    return _this;
  }

  _createClass(ScriptAddrRow, [{
    key: 'handleClkShowResult',
    value: function handleClkShowResult(event) {
      // Показываем/скрываем результат
      this.setState({ showResult: !this.state.showResult });
    }
  }, {
    key: 'handleClkAction',
    value: function handleClkAction(event) {
      var _this2 = this;

      var street_arr = [];

      switch (true) {

        case event.target.value === 'del':

          var confAnswer = window.confirm("Delete?");
          if (confAnswer) {
            this.props.Win.props.swgClient.apis.Script[this.props.Win.apiCmd.del]({
              token: this.props.Win.apiCmd.token,
              city: this.props.row.city
            }).then(function (res) {
              _this2.setState({ showResult: false });
              _this2.props.Win.getData();
            });
          }

          break;

        case event.target.value === 'mod':
          street_arr = this.state.streetsTxt.split('\n');

          this.props.Win.props.swgClient.apis.Script[this.props.Win.apiCmd.put]({
            token: this.props.Win.apiCmd.token,
            idx: this.props.idx,
            body: {
              city: this.state.city,
              street_arr: street_arr
            }
          }).then(function (res) {
            _this2.setState({ modBttnClass: 'gray-bttn' });
          });

          break;

        case event.target.value === 'add':
          street_arr = this.state.streetsTxt.split('\n');

          this.props.Win.props.swgClient.apis.Script[this.props.Win.apiCmd.post]({
            token: this.props.Win.apiCmd.token,
            body: {
              city: this.state.city,
              street_arr: street_arr
            }
          }).then(function (res) {
            _this2.setState({ showResult: false });
            _this2.props.Win.getData();
          });

          break;

        default:
          console.log('default');
          break;

      }
    }
  }, {
    key: 'handleChangeTextNotes',
    value: function handleChangeTextNotes(event) {
      var spltId = event.target.id.split('-');
      switch (spltId[1]) {
        case 'streetsTxt':
          this.setState({ streetsTxt: event.target.value });
          break;
        case 'city':
          this.setState({ city: event.target.value });
          break;
      }

      this.setState({ modBttnClass: 'mod-bttn' });
      //this.setState({event.target.id: event.target.value})
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('render ScriptAddrRow');
      var finalTemplate = null;
      var row = this.props.row;

      var rowColor = 'std-item-header-small';
      if (this.props.idx === 0) {
        rowColor = 'std-item-header-small-green';
      }

      finalTemplate = _react2.default.createElement(
        'div',
        { className: 'std-item' },
        _react2.default.createElement(
          'div',
          { className: rowColor, onClick: this.handleClkShowResult },
          this.state.city
        ),
        _react2.default.createElement(
          'div',
          { className: this.state.showResult ? 'std-item-menu' : 'display-none' },
          _react2.default.createElement('input', { id: this.props.idx + '-city', className: this.props.idx === 0 ? 'script-addr-input' : 'display-none', type: 'text', value: this.state.city, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          '\u0423\u043B\u0438\u0446\u044B:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('textarea', { id: this.props.idx + '-streetsTxt', className: 'script-addr-textarea', value: this.state.streetsTxt, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'button',
            { className: this.props.idx > 0 ? 'del-bttn' : 'display-none', onClick: this.handleClkAction, value: 'del' },
            '\u0423\u0434\u0430\u043B\u0438\u0442\u044C'
          ),
          '\xA0',
          _react2.default.createElement(
            'button',
            { className: this.props.idx > 0 ? this.state.modBttnClass : 'display-none', onClick: this.handleClkAction, value: 'mod' },
            '\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C'
          ),
          _react2.default.createElement(
            'button',
            { className: this.props.idx > 0 ? 'display-none' : 'add-bttn', onClick: this.handleClkAction, value: 'add' },
            '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
          )
        )
      );

      return finalTemplate;
    }
  }]);

  return ScriptAddrRow;
}(_react2.default.Component);

exports.default = ScriptAddrRow;