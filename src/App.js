import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { themeLight, themeDark, GlobalStyles } from './theme';
import { Reset } from 'styled-reset';

import store from './redux/store';
import theme from './theme';
import Home from './pages/Home';

function App() {
  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
        <GlobalStyles />
        <Reset />
        {/* <button onClick={() => themeToggler()}>Mudar tema</button> */}
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
