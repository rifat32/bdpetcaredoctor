import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";

interface FormData {
	name: string;
	email: string;
	address: string;
	phone: string;
	sex: string;
	birth_date:string,
	blood_group: string;



}

const AddPatientForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
	name: "",
	email:'',
	address: '',
	phone: '',
	sex: '',
	birth_date:'',
	blood_group: '',
	
	});
	const [sex, setSex] = useState(["male","female","others"]);
	const [bloodGroup, setBlooodGroup] = useState(["A+","AB","O+"]);
	const [errors, setErrors] = useState<any>(null);

	useEffect(() => {
		
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			name: "",
			email:'',
			address: '',
			phone: '',
			sex: '',
			birth_date:'',
			blood_group: '',
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
			.post(`${BACKENDAPI}/v1.0/patients`, { ...formData })
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
			.put(`${BACKENDAPI}/v1.0/patients`, { ...formData })
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
				<label htmlFor="name" className="form-label">
					 Name
				</label>
				<input
					type="text"
					className={
						errors
							? errors.name
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="name"
					name="name"
					onChange={handleChange}
					value={formData.name}
				/>
				{errors?.name && (
					<div className="invalid-feedback">{errors.name[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="email" className="form-label">
					 Email
				</label>
				<input
					type="email"
					className={
						errors
							? errors.email
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="email"
					name="email"
					onChange={handleChange}
					value={formData.email}
				/>
				{errors?.email && (
					<div className="invalid-feedback">{errors.email[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="address" className="form-label">
				Address
				</label>
				<input
					type="text"
					className={
						errors
							? errors.address
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="address"
					name="address"
					onChange={handleChange}
					value={formData.address}
				/>
				{errors?.address && (
					<div className="invalid-feedback">{errors.address[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="phone" className="form-label">
				Phone
				</label>
				<input
					type="text"
					className={
						errors
							? errors.phone
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="phone"
					name="phone"
					onChange={handleChange}
					value={formData.phone}
				/>
				{errors?.phone && (
					<div className="invalid-feedback">{errors.phone[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
		
			<div className="col-md-4">
				<label htmlFor="sex" className="form-label">
					Sex
				</label>
				<select
					className={
						errors
							? errors.sex
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="sex"
					name="sex"
					onChange={handleSelect}
					value={formData.sex}>
					<option value="">Please Select</option>
					{sex.map((el: any, index) => (
						<option
							key={index}
							value={el}
							style={{ textTransform: "uppercase" }}>
							{el}
						</option>
					))}
				</select>

				{errors?.sex && (
					<div className="invalid-feedback">{errors.sex[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
		
			

			<div className="col-md-4">
				<label htmlFor="birth_date" className="form-label">
					Birth Date
				</label>
				<input
					type="date"
					className={
						errors
							? errors.birth_date
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="birth_date"
					name="birth_date"
					onChange={handleChange}
					value={formData.birth_date}
				/>

				{errors?.birth_date && (
					<div className="invalid-feedback">{errors.birth_date[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="blood_group" className="form-label">
					Blood Group
				</label>
				<select
					className={
						errors
							? errors.blood_group
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="blood_group"
					name="blood_group"
					onChange={handleSelect}
					value={formData.blood_group}>
					<option value="">Please Select</option>
					{bloodGroup.map((el: any, index) => (
						<option
							key={index}
							value={el}
							style={{ textTransform: "uppercase" }}>
							{el}
						</option>
					))}
				</select>

				{errors?.blood_group && (
					<div className="invalid-feedback">{errors.blood_group[0]}</div>
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

export default AddPatientForm;
