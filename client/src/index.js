import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {ChakraProvider} from "@chakra-ui/react"
import io from "socket.io-client";
const socket = io.connect(`${process.env.REACT_APP_FETCH_URL_}`);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
