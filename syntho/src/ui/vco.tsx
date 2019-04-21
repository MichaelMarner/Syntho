import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Col, Row } from 'react-bootstrap';
import Knob from 'react-canvas-knob';

export class VCO extends Component {
  render() {
    return (
      <Card className="text-center">
        <Card.Header>VCO</Card.Header>
        <Card.Body>
          <Col>
            <Row className="justify-content-center mb-3">
              <ButtonGroup size="sm">
                <Button variant="secondary">saw</Button>
                <Button variant="secondary">sq</Button>
                <Button variant="secondary">tri</Button>
              </ButtonGroup>
            </Row>
            <Knob
              min={1}
              max={7}
              value={3}
              angleOffset={-125}
              angleArc={250}
              width={80}
              height={80}
            />
            <p>Octave</p>
            <Knob
              min={-500}
              max={500}
              value={0}
              angleOffset={-125}
              angleArc={250}
              width={80}
              height={80}
            />
            <p>Detune</p>
            <Knob
              min={0}
              max={100}
              value={100}
              angleOffset={-125}
              angleArc={250}
              width={80}
              height={80}
            />
            <p>Volume</p>
          </Col>
        </Card.Body>
      </Card>
    );
  }
}
