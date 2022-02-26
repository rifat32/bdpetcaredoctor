import React from "react";
import TransferBalanceFrom from "../../../components/Forms/BalanceForms/TransferBalanceForm";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";

const BankTransferPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Bank Balance Transfer</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Balance</li>
							<li className="breadcrumb-item active">
								Balance Transfer
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
									<h5 className="card-title">Transfer Balance</h5>
									<TransferBalanceFrom />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default BankTransferPage;
