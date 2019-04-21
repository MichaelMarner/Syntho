import React, { Component } from 'react';
import { Card, ButtonGroup, Button, Col, Row } from 'react-bootstrap';
import Knob from 'react-canvas-knob';

export class Adsr extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          LFO
          <ButtonGroup className="float-right" size="sm">
            <Button variant="outline-secondary">tri</Button>
            <Button variant="outline-secondary">sq</Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="text-center">
              <Knob
                max={50}
                value={0}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
              />
              <p>Attack</p>
            </Col>
            <Col className="text-center">
              <Knob
                max={100}
                value={0}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
              />
              <p>Decay</p>
            </Col>
            <Col className="text-center">
              <Knob
                max={100}
                value={0}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
              />
              <p>Sustain</p>
            </Col>
            <Col className="text-center">
              <Knob
                max={100}
                value={0}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
              />
              <p>Release</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
