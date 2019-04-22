import React, { Component } from 'react';
import {
  Card,
  ButtonGroup,
  Button,
  Col,
  Row,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import Knob from 'react-canvas-knob';
import { Lfo } from '../audio/lfo';

export interface LfoComponentProps {
  lfo: Lfo;
}
export class LfoComponent extends Component<LfoComponentProps, any> {
  constructor(props: LfoComponentProps) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Header>
          LFO
          <ToggleButtonGroup
            value={this.props.lfo.type}
            type="radio"
            name="lfoType"
            className="float-right"
            size="sm"
            onChange={value => {
              this.props.lfo.type = value;
              this.forceUpdate();
            }}
          >
            <ToggleButton value="triangle" variant="outline-secondary">
              tri
            </ToggleButton>
            <ToggleButton value="square" variant="outline-secondary">
              sq
            </ToggleButton>
          </ToggleButtonGroup>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="text-center">
              <Knob
                max={30}
                value={this.props.lfo.frequency}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
                onChange={value => {
                  this.props.lfo.frequency = value;
                  this.forceUpdate();
                }}
              />
              <p>Rate</p>
            </Col>
            <Col className="text-center">
              <Knob
                max={50}
                value={Math.round(this.props.lfo.depth)}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
                onChange={value => {
                  this.props.lfo.depth = value;
                  this.forceUpdate();
                }}
              />
              <p>Depth</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
