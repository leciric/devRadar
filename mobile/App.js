import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/Routes';

YellowBox.ignoreWarnings([
  'Urecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle ="lught-content" backgroundColor="#8e4dff"/>
      <Routes />
    </>
  );
}


