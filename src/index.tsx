import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppUiProvider } from "@canva/app-ui-kit";
import { createRoot } from "react-dom/client";
import {App} from "./app";
import "@canva/app-ui-kit/styles.css";

const root = createRoot(document.getElementById("root") as Element);
function render() {
  root.render(
    <AppUiProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AppUiProvider>
  );
}

render();

if (module.hot) {
  module.hot.accept("./app", render);
}
