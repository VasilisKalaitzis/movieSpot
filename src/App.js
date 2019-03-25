import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

import Layout from "./components/Layout";

import "./css/App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faUserCircle,
  faHeart,
  faStar
} from "@fortawesome/free-solid-svg-icons";

library.add(faCog, faUserCircle, faHeart, faStar);

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
