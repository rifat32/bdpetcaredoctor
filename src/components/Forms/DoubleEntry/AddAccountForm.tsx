import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	name: string;
	code: string;
	account_id: string;
	type_id: string;
	is_enabled: boolean;
	description: string;
	wing_id: string;
}
const AddChartOfAccountForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		code: "",
		account_id: "",
		type_id: "",
		is_enabled: false,
		description: "",
		wing_id: "",
	});
	const [errors, setErrors] = useState<any>(null);
	const [wings, setWings] = useState([]);
	const [accounts, setAccounts] = useState([]);
	useEffect(() => {
		loadWingsAndAccounts();
	}, []);

	const loadWingsAndAccounts = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/wings/all`)
			.then((response: any) => {
				console.log(response);
				setWings(response.data.wings);
			})
			.catch((error) => {
				console.log(error.response);
			});
		apiClient()
			.get(`${BACKENDAPI}/v1.0/accounts`)
			.then((response: any) => {
				console.log(response);
				setAccounts(response.data.accounts);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const [types, setTypes] = useState<any>([]);
	const accounts2 = [
		{
			id: 1,
			name: "assets",
			types: [
				{
					id: 1,
					name: "Current Asset",
				},
				{
					id: 2,
					name: "Fixed Asset",
				},
			],
		},
		{
			id: 2,
			name: "Liabilities",
			types: [
				{
					id: 3,
					name: "Current Liability",
				},
				{
					id: 4,
					name: "Liability",
				},
			],
		},
	];

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};
	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name == "account_id") {
			if (e.target.value) {
				accounts.map((el: any) => {
					console.log(el);
					if (parseInt(el.id) === parseInt(e.target.value)) {
						setTypes(el.types);
					}
				});
			} else {
				setTypes([]);
			}
		}
	};

	const resetFunction = () => {
		setFormData({
			name: "",
			code: "",
			account_id: "",
			type_id: "",
			is_enabled: false,
			description: "",
			wing_id: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		setErrors(null);
		apiClient()
			.post(`${BACKENDAPI}/v1.0/chart-of-account`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Account saved");
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

	return (
		<form className="row g-3">
			<div className="col-md-12">
				<label htmlFor="bill" className="form-label">
					Wing
				</label>
				<select
					className={
						errors
							? errors.wing_id
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="wing_id"
					name="wing_id"
					onChange={handleSelect}
					value={formData.wing_id}>
					<option value="">Please Select</option>
					{wings.map((el: any, index) => (
						<option
							key={index}
							value={el.id}
							style={{ textTransform: "uppercase" }}>
							{el.name}
						</option>
					))}
				</select>

				{errors?.wing_id && (
					<div className="invalid-feedback">{errors.wing_id[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
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
			<div className="col-md-6">
				<label htmlFor="code" className="form-label">
					Code
				</label>
				<input
					type="text"
					className={
						errors
							? errors.code
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="code"
					name="code"
					onChange={handleChange}
					value={formData.code}
				/>

				{errors?.code && (
					<div className="invalid-feedback">{errors.code[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="account_id" className="form-label">
					Account
				</label>
				<select
					className={
						errors
							? errors.account_id
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="account_id"
					name="account_id"
					onChange={handleSelect}
					value={formData.account_id}>
					<option value="">Please Select</option>
					{accounts.length &&
						accounts.map((el: any, index) => (
							<option
								key={index}
								value={el.id}
								style={{ textTransform: "capitalize" }}>
								{el.name}
							</option>
						))}
				</select>

				{errors?.account_id && (
					<div className="invalid-feedback">{errors.account_id[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="type_id" className="form-label">
					Type
				</label>
				<select
					className={
						errors
							? errors.type_id
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="type_id"
					name="type_id"
					onChange={handleSelect}
					value={formData.type_id}>
					<option value="">Please Select</option>

					{types.length &&
						types.map((el: any, index: any) => (
							<option
								key={index}
								value={el.id}
								style={{ textTransform: "capitalize" }}>
								{el.name}
							</option>
						))}
				</select>

				{errors?.type_id && (
					<div className="invalid-feedback">{errors.type_id[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

			<div className="col-md-12">
				<div className="form-check">
					<input
						className={
							errors
								? errors.is_enabled
									? `form-check-input is-invalid`
									: `form-check-input is-valid`
								: "form-check-input"
						}
						type="checkbox"
						id="is_enabled"
						name="is_enabled"
						onChange={handleChecked}
						checked={formData.is_enabled}
					/>

					{errors?.is_enabled && (
						<div className="invalid-feedback">{errors.is_enabled[0]}</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
					<label className="form-check-label" htmlFor="discount_apply">
						Is Enabled
					</label>
				</div>
			</div>
			<div className="col-md-12">
				<label htmlFor="description" className="form-label">
					Description
				</label>
				<textarea
					className={
						errors
							? errors.description
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="description"
					name="description"
					onChange={handleChangeTextArea}
					value={formData.description}></textarea>

				{errors?.description && (
					<div className="invalid-feedback">{errors.description[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

			<div className="text-center">
				<button
					onClick={handleSubmit}
					type="button"
					className="btn btn-primary me-2">
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

export default AddChartOfAccountForm;
