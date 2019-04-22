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

export class Filter extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          Filter
          <ToggleButtonGroup
            name="filterMod"
            type="radio"
            value="fixed"
            className="float-right"
            size="sm"
          >
            <ToggleButton value="fixed" variant="outline-secondary">
              fixed
            </ToggleButton>
            <ToggleButton value="adsr" variant="outline-secondary">
              adsr
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
                value={12000}
                min={0}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
              />
              <p>Cutoff</p>
            </Col>
            <Col className="text-center">
              <Knob
                min={0}
                max={50}
                value={0}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
              />
              <p>Peak</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
