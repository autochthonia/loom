import 'regenerator-runtime/runtime'

// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react';
import { configure /* addDecorator */ } from '@storybook/react';
// import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';
// import theme from 'components/themes/default';

const req = require.context('../src', true, /.stories.jsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
