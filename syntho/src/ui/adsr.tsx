import React, { Component } from 'react';
import { Card, ButtonGroup, Button, Col, Row } from 'react-bootstrap';
import Knob from 'react-canvas-knob';
import { Adsr } from '../audio/adsr';

export interface AdsrComponentProps {
  adsr: Adsr;
}

export class AdsrComponent extends Component<AdsrComponentProps, any> {
  render() {
    return (
      <Card>
        <Card.Header>
          EG
          <div className="float-right">
            AMP:
            <ButtonGroup className="ml-2" size="sm">
              <Button variant="outline-secondary">gate</Button>
              <Button variant="outline-secondary">eg</Button>
            </ButtonGroup>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="text-center">
              <Knob
                max={4000}
                value={this.props.adsr.attack}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
                onChange={value => {
                  this.props.adsr.attack = value;
                  this.forceUpdate();
                }}
              />
              <p>Attack</p>
            </Col>
            <Col className="text-center">
              <Knob
                max={4000}
                value={this.props.adsr.decay}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
                onChange={value => {
                  this.props.adsr.decay = value;
                  this.forceUpdate();
                }}
              />
              <p>Decay</p>
            </Col>
            <Col className="text-center">
              <Knob
                max={1000}
                value={this.props.adsr.sustain * 1000}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
                onChange={value => {
                  this.props.adsr.sustain = value / 1000;
                  this.forceUpdate();
                }}
              />
              <p>Sustain</p>
            </Col>
            <Col className="text-center">
              <Knob
                max={4000}
                value={this.props.adsr.release}
                min={0}
                step={0.1}
                angleOffset={-125}
                angleArc={250}
                width={80}
                height={80}
                onChange={value => {
                  this.props.adsr.release = value;
                  this.forceUpdate();
                }}
              />
              <p>Release</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
