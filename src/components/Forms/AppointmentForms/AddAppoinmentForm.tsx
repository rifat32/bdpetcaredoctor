import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";

interface FormData {
	date: string;
	remarks: string;
	status: string;
	doctor_id: string;
	patient_id: string;
	

}

const AddAppoinmentForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
	date: "",
	remarks:'',
	status: '',
	doctor_id: '',
	patient_id: '',
	
	});
	const [statusList, setStatusList] = useState(["Pending Confirmation","Confirmed","Treated","Cancelled"]);
	const [doctors, setDoctors] = useState([]);
	const [patients, setPatients] = useState([]);
	const [errors, setErrors] = useState<any>(null);
	useEffect(() => {
		loadDoctors();
		loadPatients();
	}, []);

	const loadDoctors = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/doctors/all`)
			.then((response: any) => {
				console.log(response);
				setDoctors(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	

	const loadPatients = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/patients/all`)
			.then((response: any) => {
				console.log(response);
				setPatients(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			date: "",
	remarks:'',
	status: '',
	doctor_id: '',
	patient_id: '',
		
		});
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(null);
		if (props.type === "update") {
			updateData();
		} else {
			createData();
		}
	};
	const createData = () => {
		apiClient()
			.post(`${BACKENDAPI}/v1.0/appointments`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Data saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// edit data section
	useEffect(() => {
		if (props.type == "update") {
			setFormData(props.value);
		}
	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/appointments`, { ...formData })
			.then((response: any) => {
				console.log(response);
				toast.success("Data Updated");

				props.updateDataStates(response.data.data);
				props.showModal(false);
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};
	// end edit Data section
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	return (
		<form className="row g-3" onSubmit={handleSubmit}>
		<div className="col-md-4">
		<label htmlFor="bill" className="form-label">
			Doctor
		</label>
		<select
			className={
				errors
					? errors.wing_id
						? `form-control is-invalid`
						: `form-control is-valid`
					: "form-control"
			}
			id="doctor_id"
			name="doctor_id"
			onChange={handleSelect}
			value={formData.doctor_id}>
			<option value="">Please Select</option>
			{doctors.map((el: any, index) => (
				<option
					key={index}
					value={el.id}
					style={{ textTransform: "uppercase" }}>
					{el.name}
				</option>
			))}
		</select>

		{errors?.doctor_id && (
			<div className="invalid-feedback">{errors.doctor_id[0]}</div>
		)}
		{errors && <div className="valid-feedback">Looks good!</div>}
	</div>
		<div className="col-md-4">
		<label htmlFor="bill" className="form-label">
			Patient
		</label>
		<select
			className={
				errors
					? errors.patient_id
						? `form-control is-invalid`
						: `form-control is-valid`
					: "form-control"
			}
			id="patient_id"
			name="patient_id"
			onChange={handleSelect}
			value={formData.patient_id}>
			<option value="">Please Select</option>
			{patients.map((el: any, index) => (
				<option
					key={index}
					value={el.id}
					style={{ textTransform: "uppercase" }}>
					{el.name}
				</option>
			))}
		</select>

		{errors?.patient_id && (
			<div className="invalid-feedback">{errors.patient_id[0]}</div>
		)}
		{errors && <div className="valid-feedback">Looks good!</div>}
	</div>
		<div className="col-md-4">
				<label htmlFor="date" className="form-label">
					 Date
				</label>
				<input
					type="date"
					className={
						errors
							? errors.date
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="date"
					name="date"
					onChange={handleChange}
					value={formData.date}
				/>

				{errors?.date && (
					<div className="invalid-feedback">{errors.date[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="remarks" className="form-label">
				Remarks
				</label>
				<input
					type="text"
					className={
						errors
							? errors.remarks
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="remarks"
					name="remarks"
					onChange={handleChange}
					value={formData.remarks}
				/>
				{errors?.remarks && (
					<div className="invalid-feedback">{errors.remarks[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
			<label htmlFor="status" className="form-label">
				Appointment Status
			</label>
			<select
				className={
					errors
						? errors.blood_group
							? `form-control is-invalid`
							: `form-control is-valid`
						: "form-control"
				}
				id="status"
				name="status"
				onChange={handleSelect}
				value={formData.status}>
				<option value="">Please Select</option>
				{statusList.map((el: any, index) => (
					<option
						key={index}
						value={el}
						style={{ textTransform: "uppercase" }}>
						{el}
					</option>
				))}
			</select>

			{errors?.status && (
				<div className="invalid-feedback">{errors.status[0]}</div>
			)}
			{errors && <div className="valid-feedback">Looks good!</div>}
		</div>
		
		

			<div className="text-center">
				<button type="submit" className="btn btn-primary me-2">
					Submit
				</button>
				<button
					type="button"
					onClick={resetFunction}
					className="btn btn-secondary">
					Reset
				</button>
			</div>
		</form>
	);
};

export default AddAppoinmentForm;
