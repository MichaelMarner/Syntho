import React, { Component } from 'react';
import { Row, Col, Alert, Card, Container } from 'react-bootstrap';
import { VCO } from './vco';
import { Filter } from './filter';
import { Lfo } from './lfo';
import { Adsr } from './adsr';
import { Keyboard } from './keyboard';

export class Syntho extends Component {
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
            <Keyboard />
          </Col>
        </Row>
      </Container>
    );
  }
}
