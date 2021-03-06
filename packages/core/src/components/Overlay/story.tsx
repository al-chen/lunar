import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Button from '../Button';
import Text from '../Text';
import NotchedBox from '../NotchedBox';
import Overlay from '.';

type OverlayDemoState = { open: boolean };

class OverlayDemo extends React.Component<{}, OverlayDemoState> {
  state = { open: false };

  handleToggle = () => this.setState((prevState) => ({ open: !prevState.open }));

  render() {
    return (
      <div>
        <Button onClick={this.handleToggle}>Open overlay</Button>

        <Overlay open={this.state.open} onClose={this.handleToggle}>
          <div style={{ width: 400, backgroundColor: 'white', padding: 10 }}>
            <Text>
              <LoremIpsum />
            </Text>
          </div>
        </Overlay>
      </div>
    );
  }
}

class OverlayNoBgDemo extends React.Component<{}, OverlayDemoState> {
  state = { open: false };

  handleToggle = () => this.setState((prevState) => ({ open: !prevState.open }));

  render() {
    return (
      <div style={{ overflowY: 'scroll', height: 200 }}>
        <Text>When scrolling of any parent occurs, the overlay should close</Text>

        <div style={{ margin: '10px 0' }}>
          <Button onClick={this.handleToggle}>Open overlay</Button>

          <Overlay noBackground open={this.state.open} onClose={this.handleToggle}>
            <div style={{ width: 200, marginTop: 2 }}>
              <NotchedBox>
                <Text>Hello World</Text>
              </NotchedBox>
            </div>
          </Overlay>
        </div>

        <Text>
          <LoremIpsum />
        </Text>
      </div>
    );
  }
}

export default {
  title: 'Core/Overlay',
  parameters: {
    happo: false,
    inspectComponents: [Overlay],
  },
};

export function anOverlayWithVisibleDarkBackground() {
  return <OverlayDemo />;
}

anOverlayWithVisibleDarkBackground.story = {
  name: 'An overlay with visible dark background.',
};

export function withNoBackground() {
  return <OverlayNoBgDemo />;
}

withNoBackground.story = {
  name: 'With no background.',
};
