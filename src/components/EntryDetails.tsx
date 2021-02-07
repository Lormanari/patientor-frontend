import React from "react";
import {
	Entry,
	HospitalEntry,
	HealthCheckRating,
	HealthCheckEntry,
	OccupationalHealthcareEntry
} from "../types";
import { Icon, Card } from "semantic-ui-react";

const HealthRate = (rate: HealthCheckRating) => {
	switch(rate) {
		case 0:
			return <Icon name="heart" color='green'/>;
		case 1:
			return <Icon name="heart" color='yellow'/>;
		case 2:
			return <Icon name="heart" color='orange'/>;
		case 3:
			return <Icon name="heart" color='red'/>;
		default:
			break;
	}
};

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
	return <Card.Group>
		<Card>
			<Card.Content>
				<Card.Header>{entry.date} <Icon name="doctor" /></Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
				<Card.Description>
					{HealthRate(entry.healthCheckRating)}
				</Card.Description>
			</Card.Content>
		</Card>
	</Card.Group>;
};

const Occupational: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
	return <Card.Group>
		<Card>
			<Card.Content>
				<Card.Header>{entry.date} <Icon name="stethoscope" /> {entry.employerName}</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
				<Card.Description>
					{entry.sickLeave ? <p>sickLeave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p> : null}
				</Card.Description>
			</Card.Content>
		</Card>
	</Card.Group>;
};
//
const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
	return <Card.Group>
		<Card>
			<Card.Content>
				<Card.Header>{entry.date} <Icon name="hospital" /></Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
				<Card.Description>
					<p>discharge<br></br>
					date: {entry.discharge.date}<br></br>
					criteria: {entry.discharge.criteria}</p>
				</Card.Description>
			</Card.Content>
		</Card>
	</Card.Group>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const assertNever = (value: any): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};


const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
	switch (entry.type) {
		case "Hospital":
			return <Hospital entry={entry}/>;
		case "HealthCheck":
			return <HealthCheck entry={entry}/>;
		case "OccupationalHealthcare":
			return <Occupational entry={entry}/>;
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;