import { Provider } from 'react-redux';
import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import theme from './theme';
import store from './store/configureStore';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();


reportWebVitals();
