import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './keyboard.scss';
export class Keyboard extends Component {
  render() {
    return (
      <Card>
        <Card.Header>Keys</Card.Header>
        <Card.Body>
          <div className="keyboard white_key">C</div>
          <div className="keyboard black_key">F</div>
          <div className="keyboard white_key">V</div>
          <div className="keyboard black_key">G</div>
          <div className="keyboard white_key">B</div>
          <div className="keyboard white_key">N</div>
          <div className="keyboard black_key">J</div>
          <div className="keyboard white_key">M</div>
          <div className="keyboard black_key">K</div>
          <div className="keyboard white_key">,</div>
          <div className="keyboard black_key">L</div>
          <div className="keyboard white_key">.</div>
          <div className="keyboard white_key">/</div>
        </Card.Body>
      </Card>
    );
  }
}
