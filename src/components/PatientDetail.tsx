import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, getPatient, addEntry } from "../state";
import { Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal/index";
import { EntryFormValues } from "../types";
import { Button } from "semantic-ui-react";

const PatientDetail: React.FC = () => {
const [error, setError] = React.useState<string | undefined>();
const [patientError, setPatientError] = React.useState<string | undefined>();
const [{ patient, entries }, dispatch] = useStateValue();

const { id } = useParams<{ id: string }>();

React.useEffect(() => {
	const fetchPatient = async () => {
		try {

			const {data: patientToAct} = await axios.get<Patient>(
				`${apiBaseUrl}/patients/${id}`
			);

			if(!patientToAct) {
				setPatientError(`${id} doesn't exist`);
			} else {
				// dispatch({ type: "GET_PATIENT", payload: patientToAct });
				dispatch(getPatient(patientToAct));
			}

		} catch (e) {
			setPatientError(e.response.data);
		}
	};
	fetchPatient();
}, [dispatch, id]);

const [modalOpen, setModalOpen] = React.useState<boolean>(false);

const openModal = (): void => setModalOpen(true);

const closeModal = (): void => {
  setModalOpen(false);
  setError(undefined);
};

const submitNewEntry = async (values: EntryFormValues) => {

	console.log(values);
// const valueData = values.type === HospitalType.HealthCheck ?
// 	values : values.type === HospitalType.Hospital ? {...value}
  try {
	const { data: newEntry } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${id}/entries`,
		values
	);
  //   dispatch({ type: "ADD_PATIENT", payload: newPatient });
	dispatch(addEntry(newEntry));
	closeModal();
  } catch (e) {
	setError(e.response.data);
  }
};

	if(patientError) {
		return <p>{patientError}</p>;
	}

  return (
    <div className="App">
		{Object.values(patient).map((patient: Patient) => (
			<div key={patient.id}>
				<h2>{patient.name} {patient.gender ==='male'? <Icon name="man" /> : patient.gender ==='female' ? <Icon name="woman" /> : <Icon name="other gender" />}</h2>
				<p>ssn: {patient.ssn}<br></br>
				occupation: {patient.occupation}</p>
				<h4>entries</h4>
			</div>
        ))}
		{Object.values(entries)? Object.values(entries).map(entry => (
					<div key={entry.id}>
						<EntryDetails entry={entry} />
					</div>
				)) : null}
		<AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetail;
