// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
// import { Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { setBaseUrls } from "./helpers/baseUrl";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { setBaseUrls } from "./helper/baseUrl";
// import { history } from "./helper/history";
// import ConfigureStore from "./package/store";
import reportWebVitals from "./reportWebVitals";

/**
 * components
 */
import App from "./App";

let xhrConfig: any;

const fetchConfig = () =>
  new Promise((resolve, reject) => {
    xhrConfig = new XMLHttpRequest();
    xhrConfig.open("GET", "/config.json", true);
    xhrConfig.setRequestHeader("Cache-Control", "no-cache");
    xhrConfig.onload = resolve;
    xhrConfig.onerror = reject; // () => reject(xhrConfig.statusText); //  console.error(xhrConfig.statusText);
    xhrConfig.send(null);
  });

function onConfigResult(config: any) {
  // set base properties
  setBaseUrls({
    baseUrl: config.baseUrlForApi,
  });
  if (process.env.NODE_ENV !== "development") console.log = () => {};
}

function requestOnLoad() {
  if (xhrConfig.readyState === 4 && xhrConfig.status === 200) {
    let serverConfig = JSON.parse(xhrConfig.responseText);
    onConfigResult(serverConfig);
    // const { store, persistor } = ConfigureStore();
    ReactDOM.render(
      <React.StrictMode>
        <React.Suspense fallback="loading...">
          <BrowserRouter
          // history={history}
          >
            <App />
          </BrowserRouter>
        </React.Suspense>
      </React.StrictMode>,
      document.getElementById("root")
    );
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    reportWebVitals();
  }
}

fetchConfig().then(requestOnLoad).catch();
