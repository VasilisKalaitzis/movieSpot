import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

import Layout from "./components/Layout";

import "./css/App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App color-pallete1">
          <Layout />
        </div>
      </Provider>
    );
  }
}

export default App;
