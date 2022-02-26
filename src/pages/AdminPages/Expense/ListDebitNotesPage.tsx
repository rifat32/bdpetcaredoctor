import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import PaymentsPageComponent from "../../../components/PageComponent/ExpenseComponent/PaymentsPageComponent";
import DebitNotesPageComponent from "../../../components/PageComponent/ExpenseComponent/DebitNotesPageComponent";
import { Link } from "react-router-dom";

const ListDebitNotesPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Debit Notes</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Expense</li>
							<li className="breadcrumb-item active">Debit Notes</li>
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
										<h5 className="card-title">All Debit Notes</h5>
										<Link
											to="/admin/debitNotes/create"
											className="btn btn-primary">
											Add Data
										</Link>
									</div>
									<DebitNotesPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListDebitNotesPage;
