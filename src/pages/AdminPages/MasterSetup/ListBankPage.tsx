import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import BanksPageComponent from "../../../components/PageComponent/MasterSetupComponent/BanksPageComponent";
import { Link } from "react-router-dom";

const ListBankPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Banks</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Master Setup</li>
							<li className="breadcrumb-item active">Banks</li>
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
										<h5 className="card-title">All Banks</h5>
										<Link
											to="/admin/banks/create"
											className="btn btn-primary">
											Add Data
										</Link>
									</div>
									<BanksPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListBankPage;
