import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	name: string;
}
const AddRoleForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
	});
	const [errors, setErrors] = useState<any>(null);

	const [roles, setRoles] = useState<any>([]);
	useEffect(() => {
		loadRoles();
	}, []);

	const loadRoles = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/roles/all`)
			.then((response: any) => {
				console.log(response);
				const roles = response.data.roles;
				const updatedRoles = roles.map((el: any) => {
					el.permissions = el.permissions.map((el2: any) => {
						el2.checked = false;
						return el2;
					});
					return el;
				});
				setRoles(updatedRoles);
				console.log(updatedRoles);
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
		// if (e.target.name === "wing_id") {
		// 	loadBills(e.target.value);
		// }
	};
	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		// setFormData({ ...formData, [e.target.name]: e.target.checked });

		if (e.target.name === "permission[]") {
			const pArray = e.target.value.split("_");
			const tempRoles = roles.map((el: any) => {
				if (el.id === parseInt(pArray[1])) {
					el.permissions = el.permissions.map((el2: any) => {
						if (el2.id === parseInt(pArray[2])) {
							el2.checked = e.target.checked;
							return el2;
						}
						return el2;
					});

					return el;
				}
				return el;
			});

			setRoles(tempRoles);
		}

		if (e.target.name === "role[]") {
			const rArray = e.target.value.split("_");
			const tempRoles = roles.map((el: any) => {
				if (el.id === parseInt(rArray[1])) {
					el.permissions = el.permissions.map((el2: any) => {
						el2.checked = e.target.checked;
						return el2;
					});

					return el;
				}
				return el;
			});
			setRoles(tempRoles);
		}
	};

	const resetFunction = () => {
		setFormData({
			name: "",
		});
		setRoles([]);
		loadRoles();
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		setErrors(null);
		const permissions: any = [];
		roles.map((el: any) => {
			el.permissions.map((el2: any) => {
				if (el2.checked) {
					permissions.push(el2);
				}
			});
		});
		apiClient()
			.post(`${BACKENDAPI}/v1.0/roles`, {
				...formData,
				permissions,
			})
			.then((response) => {
				console.log(response);
				toast.success("Role saved");
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
			<div className="col-12">
				<label htmlFor="name" className="form-label">
					Name
				</label>
				<input
					type="text"
					name="name"
					className={
						errors
							? errors.name
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="name"
					required
					onChange={handleChange}
					value={formData.name}
				/>
				{errors?.name && (
					<div className="invalid-feedback">{errors.name[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<p>Permissions:</p>
			{errors?.permissions && (
				<div className="invalid-feedback" style={{ display: "block" }}>
					{errors.permissions[0]}
				</div>
			)}
			<div className="row">
				<div className="col-10">
					{roles.length &&
						roles.map((el: any) => {
							return (
								<div className="row" key={el.id}>
									<div className="col-4">{el.name}</div>
									<div className="col-4">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id={`role_${el.id}`}
												name="role[]"
												value={`role_${el.id}`}
												onChange={handleChecked}
											/>

											<label
												className="form-check-label"
												htmlFor={`role_${el.id}`}>
												select all
											</label>
										</div>
									</div>
									<div className="col-4">
										{el.permissions.length &&
											el.permissions.map((el2: any) => {
												return (
													<div className="form-check" key={el2.id}>
														<input
															className="form-check-input"
															type="checkbox"
															id={`permission_${el2.id}`}
															name="permission[]"
															value={`permission_${el.id}_${el2.id}`}
															onChange={handleChecked}
															checked={el2.checked}
														/>

														<label
															className="form-check-label"
															htmlFor={`permission_${el2.id}`}>
															{el2.name}
														</label>
													</div>
												);
											})}
									</div>
								</div>
							);
						})}
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

export default AddRoleForm;
