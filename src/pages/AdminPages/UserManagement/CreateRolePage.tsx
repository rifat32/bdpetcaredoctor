import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import AddRoleForm from "../../../components/Forms/UserManagementForms/AddRoleForm";

const CreateRolePage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add Role</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">User Management</li>
							<li className="breadcrumb-item active">Role Create</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Role</h5>
									<AddRoleForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default CreateRolePage;
