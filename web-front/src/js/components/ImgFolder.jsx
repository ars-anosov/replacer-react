import React from 'react';
import ImgFolderRow from './ImgFolderRow'

export class ImgFolder extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от Page

    this.state = {
      showResult:       false,
      apiResult:        null,
    }

    this.handleClkShowResult  = this.handleClkShowResult.bind(this)
    this.handleChangeInput    = this.handleChangeInput.bind(this)

    this.apiCmd = {
      token:      window.localStorage.getItem('token'),
      get:        'img_get',
      post:       'img_post',
    }


    //console.log(this.props.swgClient)
    this.getImages = () => {
      var apiResultTemplate = []

      //var row_new = 'new.png'
      //apiResultTemplate.push(<ImgFolderRow {...{Win: this}} row={row_new} idx={0} key={0} />)

      this.props.swgClient.apis.Img[this.apiCmd.get]({
        token: this.apiCmd.token
      })
      .then((res) => {

        if (res.status === 200) {
          res.body.map( (row, i) => {
            apiResultTemplate.push(<ImgFolderRow {...{Win: this}} row={row} idx={i+1} key={i+1}/>)
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
      this.getImages()
    }

    this.setState({showResult: !this.state.showResult})
  }

  handleChangeInput(event) {
    switch (event.target.id) {
      case 'imgFile':

        this.props.swgClient.apis.Img[this.apiCmd.post]({
          token: this.apiCmd.token,
          file: event.target.files[0]
        })
        .then((res) => {
          if (res.status === 200) {
            this.setState({apiResult: null, showResult: true})
            this.getImages()
          }
          else {
            alert(res.body.message)
            console.log(res.body)
          }
        })
        .catch((err) => {
          //console.log(err)
        })

        break
    }
  }





  render() {
    console.log('ImgFolder render')

    var finalTemplate =
    <div className='live-feed-win'>
      <div className='std-item-header' onClick={this.handleClkShowResult}>{this.props.headerTxt}</div>

      <div className={this.state.showResult ? '' : 'display-none'}>
        <input className='std-item-header-small-green' id='imgFile' type="file" onChange={this.handleChangeInput}/>
        {this.state.apiResult}
      </div>

    </div>

    return finalTemplate
  }

}
