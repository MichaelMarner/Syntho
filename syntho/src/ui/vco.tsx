import React, { Component } from 'react';
import {
  ButtonGroup,
  Button,
  Card,
  Col,
  Row,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import Knob from 'react-canvas-knob';
import { Vco } from '../audio/vco';

export interface VcoComponentProps {
  vco: Vco;
}
export class VcoComponent extends Component<VcoComponentProps, any> {
  render() {
    return (
      <Card className="text-center">
        <Card.Header>
          VCO
          <Button
            active={this.props.vco.modIn.gain.value == 1.0}
            variant="outline-secondary"
            className="float-right"
            size="sm"
            onClick={() => {
              this.props.vco.lfoMod = !this.props.vco.lfoMod;
              this.forceUpdate();
            }}
          >
            lfo
          </Button>
        </Card.Header>
        <Card.Body>
          <Col>
            <Row className="justify-content-center mb-3">
              <ToggleButtonGroup
                onChange={value => {
                  this.props.vco.type = value;
                  this.forceUpdate();
                }}
                type="radio"
                name="waveform"
                value={this.props.vco.type}
                size="sm"
              >
                <ToggleButton value="sawtooth" variant="outline-secondary">
                  saw
                </ToggleButton>
                <ToggleButton value="square" variant="outline-secondary">
                  sq
                </ToggleButton>
                <ToggleButton value="triangle" variant="outline-secondary">
                  tri
                </ToggleButton>
              </ToggleButtonGroup>
            </Row>
            <Knob
              min={1}
              max={7}
              value={this.props.vco.octave}
              angleOffset={-125}
              angleArc={250}
              width={80}
              height={80}
              onChange={value => {
                this.props.vco.octave = value;
                this.forceUpdate();
              }}
            />
            <p>Octave</p>
            <Knob
              min={-500}
              max={500}
              value={this.props.vco.detune}
              angleOffset={-125}
              angleArc={250}
              width={80}
              height={80}
              onChange={value => {
                this.props.vco.detune = value;
                this.forceUpdate();
              }}
            />
            <p>Detune</p>
            <Knob
              min={0}
              max={100}
              value={Math.round(this.props.vco.gain * 100)}
              angleOffset={-125}
              angleArc={250}
              width={80}
              height={80}
              onChange={value => {
                this.props.vco.gain = value / 100;
                this.forceUpdate();
              }}
            />
            <p>Volume</p>
          </Col>
        </Card.Body>
      </Card>
    );
  }
}
