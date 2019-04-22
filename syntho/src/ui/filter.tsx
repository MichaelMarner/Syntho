import React, { Component } from 'react';
import {
  Card,
  ButtonGroup,
  Button,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import Knob from 'react-canvas-knob';
import { Lfo } from '../audio/lfo';
import { Lpf } from '../audio/lpf';

export interface FilterComponentProps {
  filter: Lpf;
}

export class FilterComponent extends Component<FilterComponentProps, any> {
  constructor(props: FilterComponentProps) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Header>
          Filter
          <ToggleButtonGroup
            name="filterMod"
            type="radio"
            value={this.props.filter.mode}
            className="float-right"
            size="sm"
            onChange={value => {
              this.props.filter.mode = value;
              this.forceUpdate();
            }}
          >
            <ToggleButton value="fixed" variant="outline-secondary">
              fixed
            </ToggleButton>
            <ToggleButton value="adsr" variant="outline-secondary">
              eg
            </ToggleButton>
            <ToggleButton value="lfo" variant="outline-secondary">
              lfo
            </ToggleButton>
          </ToggleButtonGroup>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="text-center">
              <Knob
                max={12000}
                value={this.props.filter.cutOff}
                min={0}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
                onChange={value => {
                  this.props.filter.cutOff = value;
                  this.forceUpdate();
                }}
              />
              <p>Cutoff</p>
            </Col>
            <Col className="text-center">
              <Knob
                min={0}
                max={50}
                value={this.props.filter.peak}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
                onChange={value => {
                  this.props.filter.peak = value;
                  this.forceUpdate();
                }}
              />
              <p>Peak</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
