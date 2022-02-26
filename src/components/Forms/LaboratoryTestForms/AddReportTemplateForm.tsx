import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";

import JoditReact from "jodit-react-ts";
import 'jodit/build/jodit.min.css';

interface FormData {
	name: string;
	template: string|undefined;

	


}

const AddReportTemplateForm: React.FC<UpdateFormInterface> = (props) => {
	const [template, setTemplate] = useState<string>();
	const [toggleTemplate, setToggleTemplate] = useState<boolean>(true);
	const [formData, setFormData] = useState<FormData>({
	name: "",
	template:"",
	});
	
	
	const [errors, setErrors] = useState<any>(null);



	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToggleTemplate(false)
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setTemplate(" ")
		setToggleTemplate(true)
	
		
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			name: "",
			template:''
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
			.post(`${BACKENDAPI}/v1.0/report-templates`, { ...formData,template })
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
			 setTemplate(props.value.template)
			console.log(props.value)
		}
	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/report-templates`, { ...formData,template })
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
	const [value, setValue] = React.useState<string>();
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
			<div className="col-md-12">
				<label htmlFor="template" className="form-label">
					 Template
				</label>
				{
					toggleTemplate && <JoditReact onChange={(content) => setTemplate(content)} defaultValue={template} />
				}
				{/* <JoditReact onChange={(content) => setTemplate(content)} defaultValue={formData.template} /> */}
				<input
					type="hidden"
					className={
						errors
							? errors.template
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="template"
					name="template"
					onChange={handleChange}
					value={formData.template}
				/>
				{errors?.template && (
					<div className="invalid-feedback">{errors.template[0]}</div>
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

export default AddReportTemplateForm;
