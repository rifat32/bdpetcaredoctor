import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";

interface FormData {
	name: string;
	brand: string;
	unit: string;
	category: string;
	sku: string;
	// quantity: string;
	type: string;
	tax: string;
	taxType: string;
	subCategory: string;
	price: string;
	wing_id: string;
}
const AddProductForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		brand: "",
		unit: "",
		category: "",
		subCategory: "",
		sku: "",
		// quantity: "0",
		type: "",
		tax: "",
		taxType: "",
		price: "",
		wing_id: "",
	});
	const [wings, setWings] = useState([]);
	const [errors, setErrors] = useState<any>(null);

	useEffect(() => {
		loadWings();
	}, []);
	// pagination required
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
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			name: "",
			brand: "",
			unit: "",
			category: "",
			subCategory: "",
			sku: "",
			// quantity: "0",
			type: "",
			tax: "",
			taxType: "",
			price: "",
			wing_id: "",
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
			.post(`${BACKENDAPI}/v1.0/products`, { ...formData })
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
			.put(`${BACKENDAPI}/v1.0/products`, { ...formData })
			.then((response: any) => {
				console.log(response);
				toast.success("Data Updated");

				props.updateDataStates(response.data.product);
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
				<label htmlFor="name" className="form-label">
					Product Name
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
				<label htmlFor="brand" className="form-label">
					Brand
				</label>
				<input
					type="text"
					className={
						errors
							? errors.brand
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="brand"
					name="brand"
					onChange={handleChange}
					value={formData.brand}
				/>
				{errors?.brand && (
					<div className="invalid-feedback">{errors.brand[0]}</div>
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
				<label htmlFor="sku" className="form-label">
					SKU
				</label>
				<input
					type="text"
					className={
						errors
							? errors.sku
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="sku"
					name="sku"
					onChange={handleChange}
					value={formData.sku}
				/>
				{errors?.sku && (
					<div className="invalid-feedback">{errors.sku[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

			<div className="col-md-4">
				<label htmlFor="price" className="form-label">
					Price
				</label>
				<input
					type="number"
					className={
						errors
							? errors.price
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="price"
					name="price"
					onChange={handleChange}
					value={formData.price}
				/>
				{errors?.price && (
					<div className="invalid-feedback">{errors.price[0]}</div>
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

export default AddProductForm;
