import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './layouts/Main';
import NotFound from "./pages/NotFound";
import publicRoutes from "./routes/PublicRoutes";
import protectedRoutes from "./routes/ProtectedRoutes";
import { createBrainstack } from '@brainstack/react';
// import css
import "./assets/css/remixicon.css";
// import scss
import "./scss/style.scss";
import { calendarEventsList, events } from "./apps/AppCalendar/CalendarEvents1";

// Create BrainStack instance with options
const options = {
  eventHubOptions: [],
  stateOptions: {
      contacts: [],
      calendarEvents: events
  },
  loggerOptions: [
    5
  ],
};

export const { BrainStackProvider, useBrainStack, core, getValue, createEventHandlerMutator } = createBrainstack(options);

// set skin on load
window.addEventListener("load", function () {
  let skinMode = localStorage.getItem("skin-mode");
  let HTMLTag = document.querySelector("html");

  if (skinMode) {
    HTMLTag.setAttribute("data-skin", skinMode);
  }
});

export default function App() {
  return (
    <React.Fragment>
      <BrainStackProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              {protectedRoutes.map((route, index) => {
                return (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={index}
                  />
                )
              })}
            </Route>
            {publicRoutes.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={route.element}
                  key={index}
                />
              )
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BrainStackProvider>
    </React.Fragment>
  );
}