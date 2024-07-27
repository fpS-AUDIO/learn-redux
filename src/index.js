import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// you need to import Provider from react-redux
import { Provider } from "react-redux";

import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Then you need to wrap entire App inside the Provider like in Context API */}
    {/* Then you need to provide the Redux store inside the 'store' prop */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
