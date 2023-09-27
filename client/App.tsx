import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { App } from './src/';

export default function MainApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
