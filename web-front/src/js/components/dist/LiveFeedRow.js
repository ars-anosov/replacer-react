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

var LiveFeedRow = function (_React$Component) {
  _inherits(LiveFeedRow, _React$Component);

  function LiveFeedRow(args) {
    _classCallCheck(this, LiveFeedRow);

    // наполняю this от Win

    var _this = _possibleConstructorReturn(this, (LiveFeedRow.__proto__ || Object.getPrototypeOf(LiveFeedRow)).call(this, args));

    _this.state = {
      short_title: _this.props.row.short_title || '',
      short_img: _this.props.row.short_img || '',
      short_comments: _this.props.row.short_comments || '',
      long_title: _this.props.row.long_title || '',
      long_date: _this.props.row.long_date || '',
      long_img: _this.props.row.long_img || '',
      long_content: _this.props.row.long_content || '',
      showResult: false,
      showModNote: false
    };

    _this.handleChangeTextDesc = _this.handleChangeTextDesc.bind(_this);
    _this.handleChangeTextNotes = _this.handleChangeTextNotes.bind(_this);
    _this.handleClkShowResult = _this.handleClkShowResult.bind(_this);
    _this.handleClkAction = _this.handleClkAction.bind(_this);

    return _this;
  }

  _createClass(LiveFeedRow, [{
    key: 'handleClkShowResult',
    value: function handleClkShowResult(event) {
      var _this2 = this;

      // Если результат скрыт, запрашиваем новые занчения
      if (!this.state.showResult) {
        console.log(this.props);
        this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.get]({
          token: this.props.Win.apiCmd.token,
          idx: this.props.idx
        }).then(function (res) {
          _this2.setState({
            short_title: res.body[0].short_title || '',
            short_img: res.body[0].short_img || '',
            short_comments: res.body[0].short_comments || '',
            long_title: res.body[0].long_title || '',
            long_date: res.body[0].long_date || '',
            long_img: res.body[0].long_img || '',
            long_content: res.body[0].long_content || ''
          });
        });
      }

      // Показываем/скрываем результат
      this.setState({ showResult: !this.state.showResult });
    }
  }, {
    key: 'handleClkAction',
    value: function handleClkAction(event) {
      var _this3 = this;

      switch (true) {

        case event.target.value === 'del':

          var confAnswer = window.confirm("Delete?");
          if (confAnswer) {
            this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.del]({
              token: this.props.Win.apiCmd.token,
              idx: this.props.row.key
            }).then(function (res) {
              _this3.props.Win.hostSearch();
            });
          }

          break;

        case event.target.value === 'mod':

          var notesObj = false;

          console.log(this.state.notes);

          try {
            notesObj = JSON.parse(this.state.notes);
          } catch (e) {
            alert('inventory.notes Must be JSON object!');
          }

          if (notesObj) {
            this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.put]({
              token: this.props.Win.apiCmd.token,
              hostid: this.props.row.hostid,
              body: {
                description: this.state.description,
                inventory: {
                  notes: this.state.notes
                }
              }
            }).then(function (res) {
              _this3.setState({ showModNote: true });
              setTimeout(function () {
                _this3.setState({ showModNote: false });
              }, 500);
            });
          }

          break;

        default:
          console.log('default');
          break;

      }
    }
  }, {
    key: 'handleChangeTextDesc',
    value: function handleChangeTextDesc(event) {
      this.setState({ description: event.target.value });
    }
  }, {
    key: 'handleChangeTextNotes',
    value: function handleChangeTextNotes(event) {
      this.setState({ notes: event.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('render LiveFeedRow');
      var finalTemplate = null;
      var row = this.props.row;

      finalTemplate = _react2.default.createElement(
        'div',
        { className: 'live-feed-item' },
        _react2.default.createElement(
          'div',
          { className: 'std-item-header-small', onClick: this.handleClkShowResult },
          _react2.default.createElement(
            'small',
            null,
            row.long_date,
            ':'
          ),
          ' ',
          row.short_title,
          _react2.default.createElement(
            'strong',
            { className: this.state.showModNote ? 'mod-bttn' : 'display-none' },
            ' \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043E '
          )
        ),
        _react2.default.createElement(
          'div',
          { className: this.state.showResult ? 'live-feed-item-menu' : 'display-none' },
          'short_title:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { className: 'live-feed-input', type: 'text', value: this.state.short_title, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          'short_comments:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('textarea', { className: 'live-feed-textarea-small', value: this.state.short_comments, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          'short_img:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { className: 'live-feed-input', type: 'text', value: this.state.short_img, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          _react2.default.createElement('hr', null),
          'long_title:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { className: 'live-feed-input', type: 'text', value: this.state.long_title, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          'long_date:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { className: 'live-feed-input', type: 'text', value: this.state.long_date, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          'long_img:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { className: 'live-feed-input', type: 'text', value: this.state.long_img, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          'long_content:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('textarea', { className: 'live-feed-textarea', value: this.state.long_content, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'button',
            { className: 'del-bttn', onClick: this.handleClkAction, value: 'del' },
            '\u0423\u0434\u0430\u043B\u0438\u0442\u044C'
          ),
          '\xA0',
          _react2.default.createElement(
            'button',
            { className: 'mod-bttn', onClick: this.handleClkAction, value: 'mod' },
            '\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C'
          )
        )
      );

      return finalTemplate;
    }
  }]);

  return LiveFeedRow;
}(_react2.default.Component);

exports.default = LiveFeedRow;