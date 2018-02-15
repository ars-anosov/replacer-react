import React from 'react'


export default class LiveFeedRow extends React.Component {
  
  constructor(args) {
    super(args)      // наполняю this от Win

    this.state = {
      short_title:      this.props.row.short_title || '',
      short_img:        this.props.row.short_img || '',
      short_comments:   this.props.row.short_comments || '',
      long_title:       this.props.row.long_title || '',
      long_date:        this.props.row.long_date || '',
      long_img:         this.props.row.long_img || '',
      long_content:     this.props.row.long_content || '',
      imgList:          [],
      imgListSelected:  this.props.row.short_img || '',
      showResult:       false,
      modBttnClass:     'gray-bttn'
    }

    this.handleChangeTextNotes  = this.handleChangeTextNotes.bind(this)
    this.handleClkShowResult    = this.handleClkShowResult.bind(this)
    this.handleClkAction        = this.handleClkAction.bind(this)




  }




  handleClkShowResult(event) {
    
    // Если результат скрыт, запрашиваем новые занчения
    if (!this.state.showResult) {


      // Select oprions (список картинок) -------------------------------------
      this.props.Win.props.swgClient.apis.Img[this.props.Win.apiCmd.imglist_get]({
        token: this.props.Win.apiCmd.token
      })
      .then((res) => {

        if (res.status === 200) {
          this.setState({imgList: res.body})
        }
        else {
          console.log(res.body)
        }

      })
      .catch((err) => {
        //err
      })

      // idx 0 не запрашиваем, это новый feed
      if (this.props.idx > 0) {
        this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.get]({
          token: this.props.Win.apiCmd.token,
          idx: this.props.idx
        })
        .then((res) => {
          this.setState({
            short_title:      res.body[0].short_title || '',
            short_img:        res.body[0].short_img || '',
            short_comments:   res.body[0].short_comments || '',
            long_title:       res.body[0].long_title || '',
            long_date:        res.body[0].long_date || '',
            long_img:         res.body[0].long_img || '',
            long_content:     res.body[0].long_content || '',
          })
        })
      }
    }
    
    // Показываем/скрываем результат
    this.setState({showResult: !this.state.showResult})
  }

  handleClkAction(event) {
    switch (true) {

      case (event.target.value === 'del'):
        
        var confAnswer=window.confirm("Delete?")
        if (confAnswer) {
          this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.del]({
            token: this.props.Win.apiCmd.token,
            idx: this.props.idx
          })
          .then((res) => {
            this.setState({showResult: false})
            this.props.Win.getFeeds()
          })
        }

        break

      case (event.target.value === 'mod'):

        if (this.state.long_date.match(/^\d\d\.\d\d\.\d\d\d\d$/)) {
          this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.put]({
            token: this.props.Win.apiCmd.token,
            idx: this.props.idx,
            body: {
              short_title:      this.state.short_title,
              short_img:        this.state.short_img,
              short_comments:   this.state.short_comments,
              long_title:       this.state.long_title,
              long_date:        this.state.long_date,
              long_img:         this.state.long_img,
              long_content:     this.state.long_content
            }
          })
          .then((res) => {
            this.setState({modBttnClass: 'gray-bttn'})
          })
        }
        else {
          alert('Формат даты ДД.ММ.ГГГГ')
        }

        break

      case (event.target.value === 'add'):

        if (this.state.long_date.match(/^\d\d\.\d\d\.\d\d\d\d$/)) {
          this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.post]({
            token: this.props.Win.apiCmd.token,
            body: {
              short_title:      this.state.short_title,
              short_img:        this.state.short_img,
              short_comments:   this.state.short_comments,
              long_title:       this.state.long_title,
              long_date:        this.state.long_date,
              long_img:         this.state.long_img,
              long_content:     this.state.long_content
            }
          })
          .then((res) => {
            this.setState({showResult: false})
            this.props.Win.getFeeds()
          })
        }
        else {
          alert('Формат даты ДД.ММ.ГГГГ')
        }

        break

      default:
        console.log('default')
        break

    }

  }





  handleChangeTextNotes(event) {
    switch (event.target.id) {
      case 'short_title':
        this.setState({short_title: event.target.value})
        this.setState({long_title: event.target.value})
        break
      case 'short_comments':
        this.setState({short_comments: event.target.value})
        break
      case 'short_img':
        //this.setState({short_img: event.target.value})
        break
      case 'long_title':
        this.setState({long_title: event.target.value})
        break
      case 'long_date':
        this.setState({long_date: event.target.value})
        break
      case 'long_img':
        //this.setState({long_img: event.target.value})
        break
      case 'long_content':
        this.setState({long_content: event.target.value})
        break
      case 'imgListSelected':
        this.setState({imgListSelected: event.target.value})
        this.setState({short_img: event.target.value})
        this.setState({long_img: event.target.value})
        break
    }

    this.setState({modBttnClass: 'mod-bttn'})
    //this.setState({event.target.id: event.target.value})
  }




  render() {
    console.log('render LiveFeedRow')
    var finalTemplate = null
    let row = this.props.row
    const liveUrl = window.localStorage.getItem('liveUrl')  // Выставляется в самом начале в index.html

    finalTemplate =
    <div className='live-feed-item'>
      <div className={this.props.idx > 0 ? 'std-item-header-small' : 'std-item-header-small-green'} onClick={this.handleClkShowResult}>
        <small>{row.long_date}:</small> {row.short_title}
      </div>
      <div className={this.state.showResult ? 'live-feed-item-menu' : 'display-none'}>
        <img src={liveUrl+'/'+this.state.short_img}></img><br />
        <select id='imgListSelected' size='1' value={this.state.imgListSelected} onChange={this.handleChangeTextNotes}>
          {
            this.state.imgList.map((row,i) =>
              <option key={i} value={'assets/images/'+row}>{'assets/images/'+row}</option>
            )
          }
        </select>
        <br />
        <br />
        Заголовок:<br /><input id='short_title' className='live-feed-input' type='text' value={this.state.short_title} onChange={this.handleChangeTextNotes} /><br />
        Краткое описание:<br /><textarea id='short_comments' className='live-feed-textarea-small' value={this.state.short_comments} onChange={this.handleChangeTextNotes}></textarea><br />
        <input id='short_img' className='display-none' type='text' value={this.state.short_img} onChange={this.handleChangeTextNotes}/>
        <hr />
        <h3>magnificPopup (Всплывашка)</h3>
        Краткое описание:<br /><input id='long_title' className='live-feed-input' type='text' value={this.state.long_title} onChange={this.handleChangeTextNotes} /><br />
        Дата:<br /><input id='long_date' className='live-feed-input' type='text' value={this.state.long_date} onChange={this.handleChangeTextNotes} /><br />
        Полный текст новости:<br /><textarea id='long_content' className='live-feed-textarea' value={this.state.long_content} onChange={this.handleChangeTextNotes}></textarea><br />
        <input id='long_img' className='display-none' type='text' value={this.state.long_img} onChange={this.handleChangeTextNotes}/>
        
        <button className={this.props.idx > 0 ? 'del-bttn' : 'display-none'} onClick={this.handleClkAction} value='del'>Удалить</button>&nbsp;
        <button className={this.props.idx > 0 ? this.state.modBttnClass : 'display-none'} onClick={this.handleClkAction} value='mod'>Изменить</button>
        <button className={this.props.idx > 0 ? 'display-none' : 'add-bttn'} onClick={this.handleClkAction} value='add'>Добавить</button>
      </div>
    </div>

    return finalTemplate
  }

}