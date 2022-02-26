import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";

import AddPatientForm from "../../../components/Forms/PatientForms/AddPatientForm";
import AddDoctorForm from "../../../components/Forms/DoctorForms/AddDoctorForm";
import AddReportTemplateForm from "../../../components/Forms/LaboratoryTestForms/AddReportTemplateForm";

const AddReportTemplatePage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add Lab Report Template</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Laboratort Tests</li>
							<li className="breadcrumb-item active">Add Lab Report Template</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Lab Report Template</h5>

									<AddReportTemplateForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddReportTemplatePage;
