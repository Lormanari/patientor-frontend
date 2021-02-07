import React, { useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TypeOption, TypeSelectField } from "./EntryFormField";
import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalType, EntryFormValues } from "../types";
import { useStateValue } from "../state";


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: HospitalType.HealthCheck, label: "HealthCheck" },
  { value: HospitalType.Hospital, label: "Hospital" },
  { value: HospitalType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

const getInitialValues = (type: HospitalType, values?: EntryFormValues): EntryFormValues => {
	const commonFields = {
		date: values?.date || "",
		description: values?.description || "",
		specialist: values?.specialist || "",
		diagnosisCodes: values?.diagnosisCodes || [],
	};

	switch (type) {
		case HospitalType.Hospital:
			return {
				type: HospitalType.Hospital,
				...commonFields,
				discharge: {
					date: "",
					criteria: ''
				}
			};
		case HospitalType.OccupationalHealthcare:
			return {
				type: HospitalType.OccupationalHealthcare,
				...commonFields,
				employerName: '',
				sickLeave: {
					startDate: '',
					endDate: ''
				}
			};
		default:
			return {
				type: HospitalType.HealthCheck,
				...commonFields,
				healthCheckRating: 0
			};
	}
	};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
	const [{ diagnosis }] = useStateValue();
	const [type, setType] = React.useState<HospitalType>(HospitalType.HealthCheck);
	const [initialValues, setInitialValues] = React.useState<EntryFormValues>(getInitialValues(HospitalType.HealthCheck));

	useEffect(() => {
		setType(initialValues.type);
	}, [initialValues]);

	return (
		<Formik
			enableReinitialize={true}
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={values => {
				const requiredError = "Field is required";
				const errors: { [field: string]: string } = {};
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}

				if(values.type === HospitalType.OccupationalHealthcare && !values.employerName) {
					errors.employerName = requiredError;
				}
				return errors;
			}}
		>
		{({ isValid, dirty, setFieldValue, setFieldTouched, values}) => {
			return (
			<Form className="form ui">
				<TypeSelectField
					label="Type"
					name="type"
					options={typeOptions}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					handleChange={(e: any) => {
						setInitialValues(getInitialValues(e.target.value, values));
					}}
				/>
				<Field
					label="Date"
					placeholder="YYYY-MM-DD"
					name="date"
					component={TextField}
				/>
				<Field
					label="Description"
					placeholder="Description"
					name="description"
					component={TextField}
				/>
				<Field
					label="Specialist"
					placeholder="Specialist"
					name="specialist"
					component={TextField}
				/>
				<DiagnosisSelection
					setFieldValue={setFieldValue}
					setFieldTouched={setFieldTouched}
					diagnoses={Object.values(diagnosis)}
				/>
				{type === HospitalType.HealthCheck ?
					<Field
						label="healthCheckRating"
						name="healthCheckRating"
						component={NumberField}
						min={0}
						max={3}
					/>
					: type === HospitalType.Hospital ?
					<><Field
						label="Discharge date"
						placeholder="YYYY-MM-DD"
						name="discharge.date"
						value=""
						component={TextField} />
					<Field
						label="Discharge criteria"
						placeholder="Criteria"
						name="discharge.criteria"
						value=""
						component={TextField} /></>
					:
					<><Field
						label="Employer Name"
						placeholder="Employer Name"
						name="employerName"
						component={TextField}
					/>
					<Field
						label="Sick Leave starting date"
						placeholder="YYYY-MM-DD"
						name="sickLeave.startDate"
						component={TextField} />
					<Field
						label="Sick Leave ending date"
						placeholder="YYYY-MM-DD"
						name="sickLeave.endDate"
						component={TextField} />
					</>
				}

				<Grid>
				<Grid.Column floated="left" width={5}>
					<Button type="button" onClick={onCancel} color="red">
					Cancel
					</Button>
				</Grid.Column>
				<Grid.Column floated="right" width={5}>
					<Button
					type="submit"
					floated="right"
					color="green"
					disabled={!dirty || !isValid}
					>
					Add
					</Button>
				</Grid.Column>
				</Grid>
			</Form>
			);
		}}
		</Formik>
	);
};

export default AddEntryForm;
