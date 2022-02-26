import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import AddCreditNoteForm from "../../../components/Forms/IncomeForms/AddCreditNoteForm";

const AddCreditNotePage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add Credit Note</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Income</li>
							<li className="breadcrumb-item active">
								Credit Note Create
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
									<h5 className="card-title">Add Credit Note</h5>
									<AddCreditNoteForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddCreditNotePage;
