import React from "react";
import { Provider } from "react-redux";
import Routing from "./Routing";
import store from "../store";

const App = () => (
  <Provider store={store}>
    <Routing />
  </Provider>
);

export default App;
