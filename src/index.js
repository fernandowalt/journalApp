import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

import { JournalApp } from "./JournalApp";

import "./styles/styles.scss";

ReactDOM.render(
  <Provider store={store}>
    <JournalApp />
  </Provider>,
  document.getElementById("root")
);
