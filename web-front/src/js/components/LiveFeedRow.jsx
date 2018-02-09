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
      showResult:       false,
      showModNote:      false
    }

    this.handleChangeTextDesc   = this.handleChangeTextDesc.bind(this)
    this.handleChangeTextNotes  = this.handleChangeTextNotes.bind(this)
    this.handleClkShowResult    = this.handleClkShowResult.bind(this)
    this.handleClkAction        = this.handleClkAction.bind(this)

  }




  handleClkShowResult(event) {
    
    // Если результат скрыт, запрашиваем новые занчения
    if (!this.state.showResult) {
      console.log(this.props)
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
            idx: this.props.row.key
          })
          .then((res) => {
            this.props.Win.hostSearch()
          })
        }

        break

      case (event.target.value === 'mod'):
        
        var notesObj = false

        console.log(this.state.notes)
        
        try {
          notesObj = JSON.parse(this.state.notes)
        } catch (e) {
          alert('inventory.notes Must be JSON object!')
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
          })
          .then((res) => {
            this.setState({showModNote: true})
            setTimeout(() => {
              this.setState({showModNote: false})
            }, 500)
          })
        }

        break

      default:
        console.log('default')
        break

    }

  }




  handleChangeTextDesc(event) {
    this.setState({description: event.target.value})
  }

  handleChangeTextNotes(event) {
    this.setState({notes: event.target.value})
  }




  render() {
    console.log('render LiveFeedRow')
    var finalTemplate = null
    let row = this.props.row

    finalTemplate =
    <div className='live-feed-item'>
      <div className='std-item-header-small' onClick={this.handleClkShowResult}>
        <small>{row.long_date}:</small> {row.short_title}<strong className={this.state.showModNote ? 'mod-bttn' : 'display-none'}> Изменено </strong>
      </div>
      <div className={this.state.showResult ? 'live-feed-item-menu' : 'display-none'}>
        short_title:<br /><input className='live-feed-input' type='text' value={this.state.short_title} onChange={this.handleChangeTextNotes} /><br />
        short_comments:<br /><textarea className='live-feed-textarea-small' value={this.state.short_comments} onChange={this.handleChangeTextNotes}></textarea><br />
        short_img:<br /><input className='live-feed-input' type='text' value={this.state.short_img} onChange={this.handleChangeTextNotes} /><br />
        <hr />
        long_title:<br /><input className='live-feed-input' type='text' value={this.state.long_title} onChange={this.handleChangeTextNotes} /><br />
        long_date:<br /><input className='live-feed-input' type='text' value={this.state.long_date} onChange={this.handleChangeTextNotes} /><br />
        long_img:<br /><input className='live-feed-input' type='text' value={this.state.long_img} onChange={this.handleChangeTextNotes} /><br />
        long_content:<br /><textarea className='live-feed-textarea' value={this.state.long_content} onChange={this.handleChangeTextNotes}></textarea><br />
        
        <button className='del-bttn' onClick={this.handleClkAction} value='del'>Удалить</button>&nbsp;
        <button className='mod-bttn' onClick={this.handleClkAction} value='mod'>Изменить</button>
      </div>
    </div>

    return finalTemplate
  }

}