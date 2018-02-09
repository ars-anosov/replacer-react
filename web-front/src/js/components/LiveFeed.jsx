import React from 'react';
import LiveFeedRow from './LiveFeedRow'

export class LiveFeed extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от Page

    this.state = {
      groupList:        [],
      inputHostName:    this.props.inputHostName || '',
      selectHostGroup:  this.props.selectHostGroup || '',
      showResult:       true,
      searchResult:     null,
    }

    this.handleChangeInput    = this.handleChangeInput.bind(this)
    this.handleChangeSelect   = this.handleChangeSelect.bind(this)
    this.handleClkShowResult  = this.handleClkShowResult.bind(this)
    this.handleClkAction      = this.handleClkAction.bind(this)

    this.apiCmd = {
      token:      window.localStorage.getItem('token'),
      get:        'feed_get',
      post:       'feed_post',
      put:        'feed_put',
      del:        'feed_del',
    }


    //console.log(this.props.swgClient)
    this.hostSearch = () => {
      var searchResultTemplate = []

      var row_new =   {
        "short_title": "Новая запись в живой ленте",
        "short_img": "assets/images/speedtest.png",
        "short_comments": "Короткий текст новой новости...",
        "long_title": "Новая запись в живой ленте (всплывашка)",
        "long_date": "00.00.2000",
        "long_img": "assets/images/speedtest.png",
        "long_content": "Длинный текст новой новости..."
      }
      searchResultTemplate.push(<LiveFeedRow {...{Win: this}} row={row_new} idx={0} key={0} />)

      this.props.swgClient.apis.Http[this.apiCmd.get]({token: this.apiCmd.token, name: this.state.inputHostName, group: this.state.selectHostGroup})
      .then((res) => {

        if (res.status === 200) {
          res.body.map( (row, i) => {
            searchResultTemplate.push(<LiveFeedRow {...{Win: this}} row={row} idx={i+1} key={i+1}/>)
          })
        }
        else {
          console.log(res.body)
        }

        this.setState({searchResult: searchResultTemplate, showResult: true})
      })
      .catch((err) => {
        // err
      })
    }




  }





  handleChangeInput(event) {
    this.setState({inputHostName: event.target.value})
  }

  handleChangeSelect(event) {
    this.setState({selectHostGroup: event.target.value})
  }

  handleClkShowResult(event) {
    this.setState({showResult: !this.state.showResult})
  }

  handleClkAction(event) {
    switch (true) {

      case (event.target.value === 'search'):
        this.setState({searchResult: null})
        this.hostSearch()
        break

      case (event.target.value === 'add'):
        this.hostAdd()
        break

      default:
        console.log('default')
        break

    }

  }



  render() {
    console.log('LiveFeed render')

    var finalTemplate =
    <div className='live-feed-win'>
      <div className='std-item-header' onClick={this.handleClkShowResult}>{this.props.headerTxt}</div>
      <button className='get-bttn' onClick={this.handleClkAction} value='search'>Прочитать index.html с сайта</button>
      <div className={this.state.showResult ? '' : 'display-none'}>{this.state.searchResult}</div>

    </div>

    return finalTemplate
  }

}
