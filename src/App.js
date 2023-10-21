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
import { events } from "./apps/AppCalendar/datamock";
import { demandesList } from "./apps/Demandes/assets/datamock";
import { usersList } from './apps/UsersManagement/datamock'
import { notesList } from "./apps/Notes/datamock";
import { contactList } from "./apps/Contacts/contactList";
import EventManagement from "./dashboard/EventManagement";

// Create BrainStack instance with options
const options = {
  eventHubOptions: [],
  stateOptions: {
    search:"",
    contacts: contactList,
    calendarEvents: events,
    demandes: demandesList,
    users: usersList,
    notes: notesList
  },
  loggerOptions: [
    5
  ],
};

export const { BrainStackProvider, useBrainStack, core, getValue, createEventHandlerMutator, createEventHandlerMutatorShallow } = createBrainstack(options);

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
            <Route index element={<EventManagement />} />
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