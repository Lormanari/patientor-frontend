import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
	}
  | {
      type: "GET_PATIENT";
      payload: Patient;
	}
  | {
	type: "SET_DIAGNOSIS";
	payload: Diagnosis[];
  }
  | {
	type: "ADD_ENTRY";
	payload: Entry;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
    };
	case "GET_PATIENT":
	return {
		...state,
		patient: {
			[action.payload.id]: action.payload
		},
		entries: {
			...action.payload.entries.reduce(
				(memo, entry) => ({ ...memo, [entry.id]: entry }),
				{}
			),
		}
	};

	case "SET_DIAGNOSIS":
		return {
			...state,
			diagnosis: {
				...action.payload.reduce(
					(memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
					{}
				),
				...state.diagnosis
			}
		};
	case "ADD_ENTRY":
		return {
			...state,
			entries: {
				...state.entries,
				[action.payload.id]: action.payload
			}

		};
    default:
      return state;
  }
};

