import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import AddChartOfAccountForm from "../../../components/Forms/DoubleEntry/AddAccountForm";

const CreateCharOfAccountPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Create Account</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Double Entry</li>
							<li className="breadcrumb-item active">
								Create Chart Of Account
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
									<h5 className="card-title">
										Create Chart Of Account
									</h5>
									<AddChartOfAccountForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default CreateCharOfAccountPage;
