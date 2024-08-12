import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul, figure, blockquote, dl, dd {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background-color:#f2f2f2;
  }

  ul, ol {
    list-style: none;
  }

  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  input, button, textarea, select {
    font: inherit;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
