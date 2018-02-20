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

var PriceRow = function (_React$Component) {
  _inherits(PriceRow, _React$Component);

  function PriceRow(args) {
    _classCallCheck(this, PriceRow);

    // наполняю this от Win

    var _this = _possibleConstructorReturn(this, (PriceRow.__proto__ || Object.getPrototypeOf(PriceRow)).call(this, args));

    _this.state = {
      device: _this.props.row.device,
      price: _this.props.row.price,
      showResult: false,
      modBttnClass: 'gray-bttn'
    };

    _this.handleChangeTextNotes = _this.handleChangeTextNotes.bind(_this);
    _this.handleClkShowResult = _this.handleClkShowResult.bind(_this);
    _this.handleClkAction = _this.handleClkAction.bind(_this);

    return _this;
  }

  _createClass(PriceRow, [{
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

        case event.target.value === 'mod':
          street_arr = this.state.price.split('\n');

          this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.put]({
            token: this.props.Win.apiCmd.token,
            body: {
              device: this.state.device,
              price: parseInt(this.state.price)
            }
          }).then(function (res) {
            _this2.setState({ modBttnClass: 'gray-bttn' });
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
        case 'price':
          this.setState({ price: event.target.value });
          break;
      }

      this.setState({ modBttnClass: 'mod-bttn' });
      //this.setState({event.target.id: event.target.value})
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('render PriceRow');
      var finalTemplate = null;
      var row = this.props.row;

      var deviceNormalName = '';
      switch (this.state.device) {
        case 'tv':
          deviceNormalName = 'Цифровое телевидение / месяц';
          break;
        case 'tv-1':
          deviceNormalName = 'ТВ-приемник';
          break;
        case 'wi-fi-1':
          deviceNormalName = 'Wi-Fi для 1 ком.кв';
          break;
        case 'wi-fi-2':
          deviceNormalName = 'Wi-Fi для 2+ ком.кв';
          break;
        case 'wi-fi-3':
          deviceNormalName = 'Настройка Wi-Fi';
          break;
        default:
          deviceNormalName = this.state.device;
          break;
      }

      finalTemplate = _react2.default.createElement(
        'div',
        { className: 'std-item' },
        _react2.default.createElement(
          'div',
          { className: 'std-item-header-small', onClick: this.handleClkShowResult },
          deviceNormalName
        ),
        _react2.default.createElement(
          'div',
          { className: this.state.showResult ? 'std-item-menu' : 'display-none' },
          '\u0426\u0435\u043D\u0430: ',
          _react2.default.createElement('input', { id: this.props.idx + '-price', className: 'price-input', type: 'text', value: this.state.price, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
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

  return PriceRow;
}(_react2.default.Component);

exports.default = PriceRow;