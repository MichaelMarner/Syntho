import React, { Component } from 'react';
import { Row, Col, Alert, Card, Container } from 'react-bootstrap';
import { VCO } from './vco';
import { Filter } from './filter';
import { Lfo } from './lfo';
import { Adsr } from './adsr';
import { Keyboard } from './keyboard';
import { SynthoEngine } from '../audio/engine';
import { FrequencyMap } from '../audio/frequency-map';

interface SynthUIProps {
  engine: SynthoEngine;
  frequencyMap: FrequencyMap;
}
export class SynthUI extends Component<SynthUIProps, any> {
  constructor(props: SynthUIProps) {
    super(props);
  }

  keyDown(note: number) {
    if (note >= 0) {
      this.props.engine.vco1.frequency = this.props.frequencyMap.getFrequency(
        this.props.frequencyMap.getNoteIndex(this.props.engine.vco1.octave, note)
      );
      this.props.engine.vco2.frequency = this.props.frequencyMap.getFrequency(
        this.props.frequencyMap.getNoteIndex(this.props.engine.vco1.octave, note)
      );
      this.props.engine.vco3.frequency = this.props.frequencyMap.getFrequency(
        this.props.frequencyMap.getNoteIndex(this.props.engine.vco1.octave, note)
      );
      this.props.engine.trigger(1);
    }
  }
  keyUp(id: number) {
    this.props.engine.trigger(0);
  }

  render() {
    return (
      <Container>
        <Row className="mb-2">
          <Col md={12}>
            <Card>
              <Card.Header>
                <h1>
                  Syntho <small>React/Web Audio Synth</small>
                </h1>
              </Card.Header>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <VCO />
          </Col>
          <Col md={2}>
            <VCO />
          </Col>
          <Col md={2}>
            <VCO />
          </Col>
          <Col className="d-flex flex-column justify-content-between">
            <Row>
              <Col md={6}>
                <Filter />
              </Col>
              <Col md={6}>
                <Lfo />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Adsr />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={12}>
            <Keyboard
              keyDown={(note: number) => this.keyDown(note)}
              keyUp={(note: number) => this.keyUp(note)}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}