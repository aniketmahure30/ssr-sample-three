import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { fetchData } from "../src/features/dataSlice";

const app = express();
let PORT = 3080;

app.get("/*", async (req, res) => {
  const entryPoint = ["/main.js"];

  // Fetch data and dispatch it to the Redux store
  await store.dispatch(fetchData());

  const preloadedState = store.getState();

  const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
    {
      bootstrapScripts: entryPoint,
      onAllReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.send("<!doctype html><p>Loading...</p>");
      },
    }
  );
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
