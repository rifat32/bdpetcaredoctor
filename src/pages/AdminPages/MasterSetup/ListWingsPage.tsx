import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import DebitNotesPageComponent from "../../../components/PageComponent/ExpenseComponent/DebitNotesPageComponent";
import WingsPageComponent from "../../../components/PageComponent/MasterSetupComponent/WingsPageComponent";
import { Link } from "react-router-dom";

const ListWingsPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Wings</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Master Setup</li>
							<li className="breadcrumb-item active">Wings</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body ">
									<div className="d-flex justify-content-between align-items-end">
										<h5 className="card-title">All Wings</h5>
										<Link
											to="/admin/wings/create"
											className="btn btn-primary">
											Add Data
										</Link>
									</div>

									<WingsPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListWingsPage;
