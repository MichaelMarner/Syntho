import React, { Component } from 'react';
import { Card, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import Knob from 'react-canvas-knob';

export class Filter extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          Filter
          <ButtonGroup className="float-right" size="sm">
            <Button variant="outline-secondary">fixed</Button>
            <Button variant="outline-secondary">adsr</Button>
            <Button variant="outline-secondary">lfo</Button>
          </ButtonGroup>
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
