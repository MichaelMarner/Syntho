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
import { Adsr } from '../audio/adsr';
import { Vca } from '../audio/vca';
import { ModType } from '../audio/engine';

export interface AdsrComponentProps {
  adsr: Adsr;
  vca: Vca;
  patchVca: Function;
}

export class AdsrComponent extends Component<AdsrComponentProps, any> {
  render() {
    return (
      <Card>
        <Card.Header>
          EG
          <div className="float-right">
            AMP:
            <ToggleButtonGroup
              name="amp setting"
              type="radio"
              value={this.props.vca.patch}
              className="ml-2"
              size="sm"
              onChange={value => {
                this.props.patchVca(value);
                this.forceUpdate();
              }}
            >
              <ToggleButton value={ModType.gate} variant="outline-secondary">
                gate
              </ToggleButton>
              <ToggleButton value={ModType.eg} variant="outline-secondary">
                eg
              </ToggleButton>
            </ToggleButtonGroup>
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
