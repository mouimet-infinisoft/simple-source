import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import NotFound from './pages/NotFound';
import publicRoutes from './routes/PublicRoutes';
import protectedRoutes from './routes/ProtectedRoutes';
import { createBrainstack } from '@brainstack/react';
// import css
import './assets/css/remixicon.css';
// import scss
import './scss/style.scss';
import { events } from './apps/AppCalendar/datamock';
import { demandesList } from './apps/Demandes/assets/datamock';
import { usersList } from './apps/UsersManagement/datamock';
import { notesList } from './apps/Notes/datamock';
import { contactList } from './apps/Contacts/contactList';
import EventManagement from './dashboard/EventManagement';
import { dossiersList } from './apps/Dossiers/assets/datamock';

// Create BrainStack instance with options
const options = {
  eventHubOptions: [],
  stateOptions: {
    search: '',
    contacts: contactList,
    calendarEvents: events,
    demandes: demandesList,
    users: usersList,
    notes: notesList,
    dossiers: dossiersList,
    me: {
      name: 'Sarah Diaz',
      address: ' Montreal, Quebec',
    },
  },
  loggerOptions: [5],
};

export const {
  BrainStackProvider,
  useBrainStack,
  core,
  getValue,
  createEventHandlerMutator,
  createEventHandlerMutatorShallow,
} = createBrainstack(options);

// set skin on load
window.addEventListener('load', function () {
  let skinMode = localStorage.getItem('skin-mode');
  let HTMLTag = document.querySelector('html');

  if (skinMode) {
    HTMLTag.setAttribute('data-skin', skinMode);
  }
});

export default function App() {
  useEffect(() => {
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (devTools) {
      // Send initial state
      devTools.connect().init(core.store.getState());
      core.log.info(`Connected to Redux Devtools`);

      // Subscribe to state changes
      core.store.on(/.*/, ({ event, ...payload }) => {
        core.log.info(event, payload);
        devTools.send({ type: event, payload }, core.store.getState(), {
          trace: true,
          name: 'brainstack si-simple',
        });
      });

      return () => {
        devTools.disconnect();
        core.log.info(`Disconnected from Redux Devtools`);
      };
    }
  }, []);

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
                );
              })}
            </Route>
            {publicRoutes.map((route, index) => {
              return (
                <Route path={route.path} element={route.element} key={index} />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BrainStackProvider>
    </React.Fragment>
  );
}
