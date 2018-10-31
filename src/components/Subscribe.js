import * as React from 'react'
import { Input } from './Input'
import { UpButton } from './UpButton'

export class Subscribe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      subscribed: false,
    }
  }
  componentDidMount() {
    const isUserSubscribed = window.localStorage.getItem('subscribed')
    if (isUserSubscribed) {
      this.setState({
        subscribed: true,
      })
    }
  }
  render() {
    if (this.state.subscribed) {
      return <div>Thank you for subscribing!</div>
    }
    return (
      <React.Fragment>
        <form
          action="https://online.us18.list-manage.com/subscribe/post?u=cff73d572350c30e7c497c973&amp;id=3adcea78e1"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          style={{
              margin:0,
              display:'flex',
              flexFlow:'row nowrap'
          }}
          ref={ref => {
            if (ref) {
              this.form = ref
            }
          }}
        >
          <Input
            name="EMAIL"
            value={this.state.value}
            onChange={e => {
              this.setState({
                value: e.target.value,
              })
            }}
          />
          <UpButton
            onClick={() => {
              if (this.state.value.match('@')) {
                window.localStorage.setItem('subscribed', 'subscribed')
                this.setState({ subscribed: true })
                this.form.submit()
                this.props.onSubscribe(this.state.value)
              }
            }}
          >
            ok
          </UpButton>
        </form>
      </React.Fragment>
    )
  }
}
