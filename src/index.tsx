import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { SynthoEngine } from './audio/engine';
import { ErrorMessage } from './ui/error.component';
import { SynthUI } from './ui/synth-ui';
import { FrequencyMap } from './audio/frequency-map';

try {
  const audioContext: AudioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const engine = new SynthoEngine(audioContext);

  const frequencyMap = new FrequencyMap();
  ReactDOM.render(
    <SynthUI engine={engine} frequencyMap={frequencyMap} />,
    document.getElementById('root')
  );
} catch (err) {
  ReactDOM.render(<ErrorMessage />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
