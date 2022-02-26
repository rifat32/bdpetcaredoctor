import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";

import PurchaseReportPageComponent from "../../../components/PageComponent/ParchaseComponent/PurchaseReportPageComponent";

const PurchaseReportPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Purchase</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Purchase</li>
							<li className="breadcrumb-item active">Purchase Report</li>
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
										<h5 className="card-title"> Purchase Report</h5>
									</div>
									<PurchaseReportPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default PurchaseReportPage;
