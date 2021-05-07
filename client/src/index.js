import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import rootSaga from "./sagas/rootSaga";
//Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./redux/reducers";

//Redux Saga
import createSagaMiddleware from "redux-saga"; // hàm này có nhiệm vụ tạo ra một middleware năm giữa action và reducer trong redux
// Middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

sagaMiddleware.run(rootSaga); // Hàm này là chạy các saga

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
