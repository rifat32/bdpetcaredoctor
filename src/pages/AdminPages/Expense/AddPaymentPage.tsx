import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import AddPaymentForm from "../../../components/Forms/ExpenseForms/AddPaymentForm";

const CreatePaymentPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Create Payment</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Expense</li>
							<li className="breadcrumb-item active">Payment Create</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Create Payment</h5>
									<AddPaymentForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default CreatePaymentPage;
