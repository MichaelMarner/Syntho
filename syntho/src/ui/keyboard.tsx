import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './keyboard.scss';

export interface KeyEvent {
  (number): void;
}
export interface KeyboardProps {
  keyDown: KeyEvent;
  keyUp: KeyEvent;
}
export class Keyboard extends Component<KeyboardProps, any> {
  constructor(props: KeyboardProps) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Header>Keys</Card.Header>
        <Card.Body>
          <div
            onMouseDown={() => this.props.keyDown(0)}
            onMouseUp={() => this.props.keyUp(0)}
            className="keyboard white-key"
          >
            C
          </div>
          <div
            onMouseDown={() => this.props.keyDown(1)}
            onMouseUp={() => this.props.keyUp(1)}
            className="keyboard black-key"
          >
            F
          </div>
          <div
            onMouseDown={() => this.props.keyDown(2)}
            onMouseUp={() => this.props.keyUp(2)}
            className="keyboard white-key"
          >
            V
          </div>
          <div
            onMouseDown={() => this.props.keyDown(3)}
            onMouseUp={() => this.props.keyUp(3)}
            className="keyboard black-key"
          >
            G
          </div>
          <div
            onMouseDown={() => this.props.keyDown(4)}
            onMouseUp={() => this.props.keyUp(4)}
            className="keyboard white-key"
          >
            B
          </div>
          <div
            onMouseDown={() => this.props.keyDown(5)}
            onMouseUp={() => this.props.keyUp(5)}
            className="keyboard white-key"
          >
            N
          </div>
          <div
            onMouseDown={() => this.props.keyDown(6)}
            onMouseUp={() => this.props.keyUp(6)}
            className="keyboard black-key"
          >
            J
          </div>
          <div
            onMouseDown={() => this.props.keyDown(7)}
            onMouseUp={() => this.props.keyUp(7)}
            className="keyboard white-key"
          >
            M
          </div>
          <div
            onMouseDown={() => this.props.keyDown(8)}
            onMouseUp={() => this.props.keyUp(8)}
            className="keyboard black-key"
          >
            K
          </div>
          <div
            onMouseDown={() => this.props.keyDown(9)}
            onMouseUp={() => this.props.keyUp(9)}
            className="keyboard white-key"
          >
            ,
          </div>
          <div
            onMouseDown={() => this.props.keyDown(10)}
            onMouseUp={() => this.props.keyUp(10)}
            className="keyboard black-key"
          >
            L
          </div>
          <div
            onMouseDown={() => this.props.keyDown(11)}
            onMouseUp={() => this.props.keyUp(11)}
            className="keyboard white-key"
          >
            .
          </div>
          <div
            onMouseDown={() => this.props.keyDown(12)}
            onMouseUp={() => this.props.keyUp(12)}
            className="keyboard white-key"
          >
            /
          </div>
        </Card.Body>
      </Card>
    );
  }
}
