import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "./styles/tailwind.css";
import reportWebVitals from "./reportWebVitals";
import { router } from "./routes/router";

const root = ReactDOM.createRoot(
  document.getElementById("content") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();
