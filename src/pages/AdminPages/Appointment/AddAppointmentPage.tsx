import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";


import AddAppoinmentForm from "../../../components/Forms/AppointmentForms/AddAppoinmentForm";

const AddAppointmentPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new Appointment</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Appointment</li>
							<li className="breadcrumb-item active">Add Appointment</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Appointment</h5>

									<AddAppoinmentForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddAppointmentPage;
