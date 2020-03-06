import * as React from 'react';
import { UpButton } from './UpButton';
import { Subscribe } from './Subscribe';

export class SubscribeButton extends React.Component {
  state = {
    subscribing: false,
  };

  render() {
    if (this.state.subscribing) {
      return <Subscribe onSubscribe={() => {}} />;
    }

    return (
      <UpButton
        href={null}
        onClick={() => {
          this.setState({
            subscribing: true,
          });
        }}
      >
        Subscribe
      </UpButton>
    );
  }
}
