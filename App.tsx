import React, {useEffect, useState} from 'react';
import {Alert, Platform, Linking} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import RootNavigation from './src/navigation/RootNavigation';

function App() {
  return <RootNavigation />;
}

export default App;
