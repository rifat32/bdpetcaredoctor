import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import AddWingForm from "../../../components/Forms/MasterSetupForms/AddWingsForm";
import AddBankForm from "../../../components/Forms/MasterSetupForms/AddBankForm";

const CreateBankPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Create Bank</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Master Setup</li>
							<li className="breadcrumb-item active">Create Bank</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Create Bank</h5>
									<AddBankForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default CreateBankPage;
