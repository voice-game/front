import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reducer from "./reducers";
import AuthService from "./api/auth_service.js";

const middleware = [];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));
const authService = new AuthService();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App authService={authService} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
