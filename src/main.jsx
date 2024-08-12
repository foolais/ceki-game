import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import PlayingPage from "./pages/PlayingPage.jsx";
import PlayerHistory from "./pages/PlayerHistory.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/create", element: <CreatePage /> },
  { path: "/playing", element: <PlayingPage /> },
  { path: "/playing/:id", element: <PlayerHistory /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
