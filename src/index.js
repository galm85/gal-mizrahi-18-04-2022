import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import {theme} from './utils/theme';
import { Provider } from 'react-redux';
import store  from './redux/store';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
          <App />
      </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

