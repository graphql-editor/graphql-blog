import * as React from 'react'
import { UpButton } from './UpButton'
import { Subscribe } from './Subscribe'

export class SubscribeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subscribing: false,
    }
  }
  render() {
    if (this.state.subscribing) {
      return <Subscribe onSubscribe={e => {}} />
    }
    return (
      <React.Fragment>
        <UpButton
          href={null}
          onClick={() => {
            this.setState({
              subscribing: true,
            })
          }}
        >
          Subscribe
        </UpButton>
      </React.Fragment>
    )
  }
}
