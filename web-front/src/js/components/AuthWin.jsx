import React from 'react';

export class AuthWin extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от PageAuth

    this.state = {
      showWin:       false,
    }

    if (typeof window.Storage === 'undefined') {
      alert('Storage turned off...');
    }

    this.onBtnClickHandler = () => {

      var authName = this.refs.authName.value
      var authPass = this.refs.authPass.value

      if (authName && authPass) {
        this.props.swgClient.apis.Client.token_get({auth_name: authName, auth_pass: authPass})
        .then((res) => {
          if (res.status == '200' && res.body) {
            this.setState({showWin: false})
            window.localStorage.setItem('token', res.body.token)
            window.location.reload()
          }
          if (res.status == '202' && res.body) {
            //alert(res.body.message)
          }
        })
        .catch((err) => {
          //console.log(err)
        })
      }
    }


    // Проверка пригодности token
    this.props.swgClient.apis.Img.img_get({
      token: window.localStorage.getItem('token')
    })
    .then((res) => {
      if (res.status === 200) {
        this.setState({showWin: false})
      }
      else {
        this.setState({showWin: true})
      }
    })
    .catch((err) => {
      // err
    })

  }

  render() {
    var finalTemplate =
    <div className={this.state.showWin ? 'auth-win' : 'display-none'} id='auth-win'>
      <input
        type='text'      
        defaultValue=''
        placeholder='name'
        ref='authName'
      />
      <input
        type='password'
        defaultValue=''
        placeholder='password'
        ref='authPass'
      />
      <button onClick={this.onBtnClickHandler}>Login</button>                        
    </div>             

    return finalTemplate
  }
}