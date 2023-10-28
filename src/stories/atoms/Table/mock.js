import { getValue } from "../../../App";

export const demandesList = {
  1: {
    "id": 1,
    "color": "primary",
    "icon": "ri-question-answer-line",
    "reference": "D-000001",
    "created": "18 Août, 2023",
    "status":"En attente",
    "contacts": [{id:"c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f"}, {id:"f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9g0h1i"}],
    "service": "Visite supervisée"
  },
  2: {
    "id": 2,
    "color": "primary",
    "icon": "ri-question-answer-line",
    "reference": "D-000002",
    "created": "19 Août, 2023",
    "status":"En cours",
    "contacts": [{id:"e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9g0h"}, {id:"a7b8c9d0-e1f2-3a4b-5c6d-7e8f9g0h1i2j"}],
    "service": "Appel supervisée"
  },
  3: {
    "id": 3,
    "color": "primary",
    "icon": "ri-question-answer-line",
    "reference": "D-000003",
    "created": "20 Août, 2023",
    "status":"Terminée",
    "contacts": [{id:"a7b8c9d0-e1f2-3a4b-5c6d-7e8f9g0h1i2j"}, {id:"f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9g0h1i"}],
    "service": "Échange de garde"
  },
  4: {
    "id": 4,
    "color": "primary",
    "icon": "ri-question-answer-line",
    "reference": "D-000004",
    "created": "21 Août, 2023",
    "status": "En attente",
    "contacts": [{ "id": "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9g" }, { "id": "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9g0h1i" }],
    "service": "Échange de garde"
  },
  5: {
    "id": 5,
    "color": "primary",
    "icon": "ri-question-answer-line",
    "reference": "D-000005",
    "created": "22 Août, 2023",
    "status": "En cours",
    "contacts": [{id:"a7b8c9d0-e1f2-3a4b-5c6d-7e8f9g0h1i2j"}, {id:"f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9g0h1i"}],
    "service": "Appel supervisée"
  },
  6: {
    "id": 6,
    "color": "primary",
    "icon": "ri-question-answer-line",
    "reference": "D-000006",
    "created": "30 Août, 2023",
    "status": "Terminée",
    "contacts": [{id:"a7b8c9d0-e1f2-3a4b-5c6d-7e8f9g0h1i2j"}, {id:"f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9g0h1i"}],
    "service": "Visite supervisée"
  },
};

// export const defaultModel = () =>({
//   "color": "primary",
//   "icon": "ri-question-answer-line",
//   "reference": "D-00000" + (Object.keys(getValue('demandes')).length+1),
//   "created": new Date().toLocaleDateString(),
//   "status": "En cours",
//   "contacts": [],
//   "service": ""
// })