import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  scroll-behavior: smooth;
  box-sizing: border-box;
}

body {
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale; 
  text-rendering: optimizeLegibility; 
  height: 100%;
  margin: 0;
  font-family: Arial;
  font-optical-sizing: auto;
  font-style: normal;
  
  background-color: #E8E8E8;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
p,
span {
  margin: 0px;
}

ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}

img {
  max-width: 100%;
  display: block;
}

a {
  text-decoration: none;
}
`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
