import React, { Component } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { VcoComponent } from './vco';
import { FilterComponent } from './filter.component';
import { LfoComponent } from './lfo.component';
import { AdsrComponent } from './adsr.component';
import { Keyboard } from './keyboard.component';
import { SynthoEngine } from '../audio/engine';
import { FrequencyMap } from '../audio/frequency-map';
import { PhysicalKeyboard } from './physical-keyboard';

interface SynthUIProps {
  engine: SynthoEngine;
  frequencyMap: FrequencyMap;
}

export class SynthUI extends Component<SynthUIProps, any> {
  physicalKeyboard: PhysicalKeyboard;

  constructor(props: SynthUIProps) {
    super(props);
    this.physicalKeyboard = new PhysicalKeyboard({
      keyEvent: note => this.changeNote(note),
      triggerEvent: val => this.trigger(val)
    });
  }

  trigger(val: number) {
    this.props.engine.trigger(val);
  }

  changeNote(note: number) {
    this.props.engine.vco1.frequency = this.props.frequencyMap.getFrequency(
      this.props.frequencyMap.getNoteIndex(this.props.engine.vco1.octave, note)
    );
    this.props.engine.vco2.frequency = this.props.frequencyMap.getFrequency(
      this.props.frequencyMap.getNoteIndex(this.props.engine.vco2.octave, note)
    );
    this.props.engine.vco3.frequency = this.props.frequencyMap.getFrequency(
      this.props.frequencyMap.getNoteIndex(this.props.engine.vco3.octave, note)
    );
  }

  keyDown(note: number) {
    this.changeNote(note);
    this.trigger(1);
  }
  keyUp(id: number) {
    this.trigger(0);
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
            <VcoComponent vco={this.props.engine.vco1} />
          </Col>
          <Col md={2}>
            <VcoComponent vco={this.props.engine.vco2} />
          </Col>
          <Col md={2}>
            <VcoComponent vco={this.props.engine.vco3} />
          </Col>
          <Col className="d-flex flex-column justify-content-between">
            <Row>
              <Col md={6}>
                <FilterComponent
                  filter={this.props.engine.lpf}
                  patchFilter={value => this.props.engine.patchFilter(value)}
                />
              </Col>
              <Col md={6}>
                <LfoComponent lfo={this.props.engine.lfo} />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <AdsrComponent
                  adsr={this.props.engine.adsr}
                  vca={this.props.engine.vca}
                  patchVca={value => this.props.engine.patchVca(value)}
                />
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
