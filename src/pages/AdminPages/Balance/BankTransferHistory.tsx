import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";

import ListTransfersPageComponent from "../../../components/PageComponent/BalanceComponent/ListTransfersPageComponent";

const ListTransfersPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Transfers</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Balance</li>
							<li className="breadcrumb-item active">Transfers</li>
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
										<h5 className="card-title">All Transfers</h5>
										{/* <Link
											to="/admin/bills/create"
											className="btn btn-primary">
											Add Data
										</Link> */}
									</div>
									<ListTransfersPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListTransfersPage;
