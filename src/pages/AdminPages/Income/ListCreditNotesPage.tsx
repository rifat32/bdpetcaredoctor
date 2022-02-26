import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import CreditNotesPageComponent from "../../../components/PageComponent/IncomeComponent/CreditNotesPageComponent";
import { Link } from "react-router-dom";

const ListCreditNotesPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>List Cretit Notes</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Income</li>
							<li className="breadcrumb-item active">
								List Credit Note
							</li>
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
										<h5 className="card-title">All Credit Notes</h5>
										<Link
											to="/admin/credits/create"
											className="btn btn-primary">
											Add Data
										</Link>
									</div>
									<CreditNotesPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListCreditNotesPage;
