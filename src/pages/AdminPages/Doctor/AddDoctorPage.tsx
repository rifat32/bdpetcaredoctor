import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";

import AddPatientForm from "../../../components/Forms/PatientForms/AddPatientForm";
import AddDoctorForm from "../../../components/Forms/DoctorForms/AddDoctorForm";

const AddDoctorPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new doctor</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Doctor</li>
							<li className="breadcrumb-item active">Add Doctor</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Doctor</h5>

									<AddDoctorForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddDoctorPage;
