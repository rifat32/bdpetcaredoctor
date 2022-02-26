import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	sending_wing_id: string;
	sending_account_number: string;
	recieving_wing_id: string;
	recieving_account_number: string;
	amount: string;
}
const TransferBalanceFrom: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		sending_wing_id: "",
		sending_account_number: "",
		recieving_wing_id: "",
		recieving_account_number: "",
		amount: "",
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

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === "recieving_wing_id") {
		}
		if (e.target.name === "sending_wing_id") {
		}
	};

	const resetFunction = () => {
		setFormData({
			sending_wing_id: "",
			sending_account_number: "",
			recieving_wing_id: "",
			recieving_account_number: "",
			amount: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		setErrors(null);
		apiClient()
			.patch(`${BACKENDAPI}/v1.0/balance/transfer`, { ...formData })
			.then((response) => {
				console.log(response);

				toast.success("Balanced transfered successfully");
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
			<div className="col-md-6">
				<label htmlFor="sending_wing_id" className="form-label">
					Sending Wing
				</label>
				<select
					className={
						errors
							? errors.sending_wing_id
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="sending_wing_id"
					name="sending_wing_id"
					onChange={handleSelect}
					value={formData.sending_wing_id}>
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

				{errors?.sending_wing_id && (
					<div className="invalid-feedback">
						{errors.sending_wing_id[0]}
					</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="sending_account_number" className="form-label">
					Sending Account Number
				</label>
				<input
					type="text"
					className={
						errors
							? errors.sending_account_number
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="sending_account_number"
					name="sending_account_number"
					onChange={handleChange}
					value={formData.sending_account_number}
				/>

				{errors?.sending_account_number && (
					<div className="invalid-feedback">
						{errors.sending_account_number[0]}
					</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="recieving_wing_id" className="form-label">
					Recieving Wing
				</label>
				<select
					className={
						errors
							? errors.recieving_wing_id
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="recieving_wing_id"
					name="recieving_wing_id"
					onChange={handleSelect}
					value={formData.recieving_wing_id}>
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

				{errors?.recieving_wing_id && (
					<div className="invalid-feedback">
						{errors.recieving_wing_id[0]}
					</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-6">
				<label htmlFor="recieving_account_number" className="form-label">
					Recieving Account Number
				</label>
				<input
					type="text"
					className={
						errors
							? errors.recieving_account_number
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="recieving_account_number"
					name="recieving_account_number"
					onChange={handleChange}
					value={formData.recieving_account_number}
				/>

				{errors?.recieving_account_number && (
					<div className="invalid-feedback">
						{errors.recieving_account_number[0]}
					</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

			<div className="col-md-6">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					type="number"
					className={
						errors
							? errors.amount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="amount"
					name="amount"
					onChange={handleChange}
					value={formData.amount}
				/>

				{errors?.amount && (
					<div className="invalid-feedback">{errors.amount[0]}</div>
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

export default TransferBalanceFrom;
