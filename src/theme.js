import { createGlobalStyle } from 'styled-components';

export const themeLight = {
  colors: {
    primary: '#6200ee',
    background: '#00000014',
    text: '#000000B3',
    success: '#135E01',
  },
  fonts: {
    fontFamily: 'Roboto, sans-serif',
  },
  colors2: {
    primary: '#6200ee',
    background: '#ffffff',
    text: '#000000B3',
  },
  colors3: {
    primary: '#6200ee',
    background: '#ffffff',
    text: '#000000B3',
  },
};

export const themeDark = {
  colors: {
    primary: '#6200ee',
    background: '#1c1c1c',
    text: '#6200ee',
    success: '#135E01',
    border: '#6200ee',
  },
  fonts: {
    fontFamily: 'Roboto, sans-serif',
  },
  colors2: {
    primary: '#6200ee',
    background: '#1c1c1c',
    text: '#6200ee',
  },
  colors3: {
    primary: '#6200ee',
    background: '#000',
    text: '#6200ee',
  },
};

export const GlobalStyles = createGlobalStyle`

  body {

    background-color: ${(props) => props.theme.background};

  }

  `;
