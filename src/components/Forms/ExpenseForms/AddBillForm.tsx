import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	vendor: string;
	bill_date: string;
	due_date: string;
	category: string;
	order_number: string;
	discount_apply: boolean;
	wing_id: string;
}
const AddBillForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		vendor: "",
		bill_date: "",
		due_date: "",
		category: "",
		order_number: "",
		discount_apply: false,
		wing_id: "",
	});
	const [errors, setErrors] = useState<any>(null);
	const [wings, setWings] = useState([]);
	useEffect(() => {
		loadWings();
	}, []);

	const loadWings = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/wings/all`)
			.then((response: any) => {
				console.log(response);
				setWings(response.data.wings);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetFunction = () => {
		setFormData({
			vendor: "",
			bill_date: "",
			due_date: "",
			category: "",
			order_number: "",
			discount_apply: false,
			wing_id: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		setErrors(null);
		apiClient()
			.post(`${BACKENDAPI}/v1.0/bills`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Bill saved");
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
			<div className="col-md-4">
				<label htmlFor="vendor" className="form-label">
					Vendor
				</label>
				<input
					type="text"
					className={
						errors
							? errors.vendor
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="vendor"
					name="vendor"
					onChange={handleChange}
					value={formData.vendor}
				/>

				{errors?.vendor && (
					<div className="invalid-feedback">{errors.vendor[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="bill_date" className="form-label">
					Bill Date
				</label>
				<input
					type="date"
					className={
						errors
							? errors.bill_date
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="bill_date"
					name="bill_date"
					onChange={handleChange}
					value={formData.bill_date}
				/>

				{errors?.bill_date && (
					<div className="invalid-feedback">{errors.bill_date[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="due_date" className="form-label">
					Due Date
				</label>
				<input
					type="date"
					className={
						errors
							? errors.due_date
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="due_date"
					name="due_date"
					onChange={handleChange}
					value={formData.due_date}
				/>

				{errors?.due_date && (
					<div className="invalid-feedback">{errors.due_date[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<input
					type="text"
					className={
						errors
							? errors.category
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="category"
					name="category"
					onChange={handleChange}
					value={formData.category}
				/>

				{errors?.category && (
					<div className="invalid-feedback">{errors.category[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

			<div className="col-md-4">
				<label htmlFor="order_number" className="form-label">
					Order Number
				</label>
				<input
					type="number"
					className={
						errors
							? errors.order_number
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="order_number"
					name="order_number"
					onChange={handleChange}
					value={formData.order_number}
				/>

				{errors?.order_number && (
					<div className="invalid-feedback">{errors.order_number[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-12">
				<div className="form-check">
					<input
						className={
							errors
								? errors.discount_apply
									? `form-check-input is-invalid`
									: `form-check-input is-valid`
								: "form-check-input"
						}
						type="checkbox"
						id="discount_apply"
						name="discount_apply"
						onChange={handleChecked}
						checked={formData.discount_apply}
					/>

					{errors?.discount_apply && (
						<div className="invalid-feedback">
							{errors.discount_apply[0]}
						</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
					<label className="form-check-label" htmlFor="discount_apply">
						Discount Apply
					</label>
				</div>
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

export default AddBillForm;
