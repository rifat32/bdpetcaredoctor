import React from "react";
import AdminPageComponent from "../../components/PageComponent/AdminPageComponent";

const Admin: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Blank Page</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Pages</li>
							<li className="breadcrumb-item active">Blank</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-lg-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Example Card</h5>
									<p>
										This is an examle page with no contrnt. You can
										use it as a starter for your custom pages.
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Example Card</h5>
									<p>
										This is an examle page with no contrnt. You can
										use it as a starter for your custom pages.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default Admin;
