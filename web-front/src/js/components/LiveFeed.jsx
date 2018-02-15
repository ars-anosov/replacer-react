import React from 'react';
import LiveFeedRow from './LiveFeedRow'

export class LiveFeed extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от Page

    this.state = {
      showResult:       false,
      apiResult:        null,
    }

    this.handleClkShowResult  = this.handleClkShowResult.bind(this)

    this.apiCmd = {
      token:      window.localStorage.getItem('token'),
      get:        'feed_get',
      post:       'feed_post',
      put:        'feed_put',
      del:        'feed_del',
      imglist_get:    'img_get',
    }


    //console.log(this.props.swgClient)
    this.getFeeds = () => {
      var apiResultTemplate = []

      var row_new =   {
        "short_title": "Новая запись в живой ленте",
        "short_img": "assets/images/lf-item-img-2.png",
        "short_comments": "Короткий текст новой новости...",
        "long_title": "Новая запись в живой ленте (всплывашка)",
        "long_date": "00.00.2000",
        "long_img": "assets/images/lf-item-img-2.png",
        "long_content": "Длинный текст новой новости..."
      }
      apiResultTemplate.push(<LiveFeedRow {...{Win: this}} row={row_new} idx={0} key={0} />)

      this.props.swgClient.apis.Http[this.apiCmd.get]({token: this.apiCmd.token})
      .then((res) => {

        if (res.status === 200) {
          res.body.map( (row, i) => {
            apiResultTemplate.push(<LiveFeedRow {...{Win: this}} row={row} idx={i+1} key={i+1}/>)
          })
        }
        else {
          console.log(res.body)
        }

        this.setState({apiResult: apiResultTemplate, showResult: true})
      })
      .catch((err) => {
        // err
      })
    }
  }







  handleClkShowResult(event) {
    // Если результат скрыт, запрашиваем заново.
    if (!this.state.showResult) {
      this.setState({apiResult: null})
      this.getFeeds()
    }

    this.setState({showResult: !this.state.showResult})
  }





  render() {
    console.log('LiveFeed render')

    var finalTemplate =
    <div className='live-feed-win'>
      <div className='std-item-header' onClick={this.handleClkShowResult}>{this.props.headerTxt}</div>
      <div className={this.state.showResult ? '' : 'display-none'}>{this.state.apiResult}</div>

    </div>

    return finalTemplate
  }

}
