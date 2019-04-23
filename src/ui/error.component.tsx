import React, { Component } from 'react';
import { Alert, Container } from 'react-bootstrap';

export class ErrorMessage extends Component {
  render() {
    return (
      <Container>
        <Alert variant="danger" className="mt-5">
          <Alert.Heading>Web Audio Not Supported</Alert.Heading>
          <p>
            The audio engine could not be initialised. This probably means you are using a
            non-supported browser. Try giving Chrome or Firefox a go.
          </p>
        </Alert>
      </Container>
    );
  }
}
