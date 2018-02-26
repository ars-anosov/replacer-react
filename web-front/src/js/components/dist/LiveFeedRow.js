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
      checkbox: _this.props.row.checkbox || false,
      short_title: _this.props.row.short_title || '',
      short_img: _this.props.row.short_img || '',
      short_comments: _this.props.row.short_comments || '',
      long_title: _this.props.row.long_title || '',
      long_date: _this.props.row.long_date || '',
      long_img: _this.props.row.long_img || '',
      long_content: _this.props.row.long_content || '',
      imgList: [],
      imgListSelected: _this.props.row.short_img || '',
      showResult: false,
      modBttnClass: 'gray-bttn'
    };

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

        // Select oprions (список картинок) -------------------------------------
        this.props.Win.props.swgClient.apis.Img[this.props.Win.apiCmd.imglist_get]({
          token: this.props.Win.apiCmd.token
        }).then(function (res) {

          if (res.status === 200) {
            _this2.setState({ imgList: res.body });
          } else {
            if (res.body.message === 'token Unauthorized') {
              document.getElementById('auth-win').setAttribute('class', 'auth-win');
            }
          }
        }).catch(function (err) {
          //err
        });

        // idx 0 не запрашиваем, это новый feed
        if (this.props.idx > 0) {
          this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.get]({
            token: this.props.Win.apiCmd.token,
            idx: this.props.idx
          }).then(function (res) {
            _this2.setState({
              checkbox: res.body[0].checkbox || '',
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
              idx: this.props.idx
            }).then(function (res) {
              _this3.setState({ showResult: false });
              _this3.props.Win.getFeeds();
            });
          }

          break;

        case event.target.value === 'mod':

          if (this.state.long_date.match(/^\d\d\.\d\d\.\d\d\d\d$/)) {
            this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.put]({
              token: this.props.Win.apiCmd.token,
              idx: this.props.idx,
              body: {
                checkbox: this.state.checkbox,
                short_title: this.state.short_title,
                short_img: this.state.short_img,
                short_comments: this.state.short_comments,
                long_title: this.state.long_title,
                long_date: this.state.long_date,
                long_img: this.state.long_img,
                long_content: this.state.long_content
              }
            }).then(function (res) {
              _this3.setState({ modBttnClass: 'gray-bttn' });
            });
          } else {
            alert('Формат даты ДД.ММ.ГГГГ');
          }

          break;

        case event.target.value === 'add':

          if (this.state.long_date.match(/^\d\d\.\d\d\.\d\d\d\d$/)) {
            this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.post]({
              token: this.props.Win.apiCmd.token,
              body: {
                checkbox: this.state.checkbox,
                short_title: this.state.short_title,
                short_img: this.state.short_img,
                short_comments: this.state.short_comments,
                long_title: this.state.long_title,
                long_date: this.state.long_date,
                long_img: this.state.long_img,
                long_content: this.state.long_content
              }
            }).then(function (res) {
              _this3.setState({ showResult: false });
              _this3.props.Win.getFeeds();
            });
          } else {
            alert('Формат даты ДД.ММ.ГГГГ');
          }

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
        case 'checkbox':
          this.setState({ checkbox: !this.state.checkbox });
          break;
        case 'short_title':
          this.setState({ short_title: event.target.value });
          this.setState({ long_title: event.target.value });
          break;
        case 'short_comments':
          this.setState({ short_comments: event.target.value });
          break;
        case 'short_img':
          //this.setState({short_img: event.target.value})
          break;
        case 'long_title':
          this.setState({ long_title: event.target.value });
          break;
        case 'long_date':
          this.setState({ long_date: event.target.value });
          break;
        case 'long_img':
          //this.setState({long_img: event.target.value})
          break;
        case 'long_content':
          this.setState({ long_content: event.target.value });
          break;
        case 'imgListSelected':
          this.setState({ imgListSelected: event.target.value });
          this.setState({ short_img: event.target.value });
          this.setState({ long_img: event.target.value });
          break;
      }

      this.setState({ modBttnClass: 'mod-bttn' });
      //this.setState({event.target.id: event.target.value})
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('render LiveFeedRow');
      var finalTemplate = null;
      var row = this.props.row;
      var liveUrl = window.localStorage.getItem('liveUrl'); // Выставляется в самом начале в index.html

      var rowColor = 'std-item-header-small';
      if (this.props.idx === 0) {
        rowColor = 'std-item-header-small-green';
      }
      if (this.state.checkbox) {
        rowColor = 'std-item-header-small-blue';
      }

      finalTemplate = _react2.default.createElement(
        'div',
        { className: 'live-feed-item' },
        _react2.default.createElement(
          'div',
          { className: rowColor, onClick: this.handleClkShowResult },
          _react2.default.createElement(
            'small',
            null,
            row.long_date,
            ':'
          ),
          ' ',
          row.short_title
        ),
        _react2.default.createElement(
          'div',
          { className: this.state.showResult ? 'live-feed-item-menu' : 'display-none' },
          _react2.default.createElement('input', { id: this.props.idx + '-checkbox', className: 'checkbox-big', type: 'checkbox', checked: this.state.checkbox, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          _react2.default.createElement('img', { src: liveUrl + '/' + this.state.short_img, border: '1' }),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'select',
            { id: this.props.idx + '-imgListSelected', size: '1', value: this.state.imgListSelected, onChange: this.handleChangeTextNotes },
            this.state.imgList.map(function (row, i) {
              return _react2.default.createElement(
                'option',
                { key: i, value: 'assets/images/' + row },
                'assets/images/' + row
              );
            })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          '\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { id: this.props.idx + '-short_title', className: 'live-feed-input', type: 'text', value: this.state.short_title, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          '\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('textarea', { id: this.props.idx + '-short_comments', className: 'live-feed-textarea-small', value: this.state.short_comments, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { id: this.props.idx + '-short_img', className: 'display-none', type: 'text', value: this.state.short_img, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            'h3',
            null,
            'magnificPopup (\u0412\u0441\u043F\u043B\u044B\u0432\u0430\u0448\u043A\u0430)'
          ),
          '\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { id: this.props.idx + '-long_title', className: 'live-feed-input', type: 'text', value: this.state.long_title, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          '\u0414\u0430\u0442\u0430:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { id: this.props.idx + '-long_date', className: 'live-feed-input', type: 'text', value: this.state.long_date, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          '\u041F\u043E\u043B\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043D\u043E\u0432\u043E\u0441\u0442\u0438:',
          _react2.default.createElement('br', null),
          _react2.default.createElement('textarea', { id: this.props.idx + '-long_content', className: 'live-feed-textarea', value: this.state.long_content, onChange: this.handleChangeTextNotes }),
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', { id: this.props.idx + '-long_img', className: 'display-none', type: 'text', value: this.state.long_img, onChange: this.handleChangeTextNotes }),
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

  return LiveFeedRow;
}(_react2.default.Component);

exports.default = LiveFeedRow;