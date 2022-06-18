import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import ListProductsPageComponent from "../../../components/PageComponent/ProductComponent/ListProductsPageComponent";
import { Link } from "react-router-dom";

import ListPatientsPageComponent from "../../../components/PageComponent/PatientComponent/ListPatientPageComponent";
import { ROUTE_LIST } from "../../../RoutConstants";
import ListDoctorsPageComponent from "../../../components/PageComponent/DoctorComponent/ListDoctorPageComponent";
import ListServicePageComponent from "../../../components/PageComponent/ReportsComponent/ListServicePageComponent";

const ListServicePage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Service Reports</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Reports</li>
							<li className="breadcrumb-item active">Service Reports</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-end">
										<h5 className="card-title">Services</h5>
										
									</div>
									<ListServicePageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListServicePage;
