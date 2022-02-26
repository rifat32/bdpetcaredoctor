import React, { useContext, useEffect } from "react";
import { APPNAME } from "../../config";
import RegisterForm from "../../components/Forms/RegisterForm";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";

const Register: React.FC = () => {
	const { setAdminBar } = useContext(AppContext);
	useEffect(() => {
		setAdminBar(false);
	}, []);

	return (
		<>
			<main>
				<div className="container">
					<section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
									<div className="d-flex justify-content-center py-4">
										<Link
											to="/"
											href="index.html"
											className="logo d-flex align-items-center w-auto">
											<img src="assets/img/logo.png" alt="app" />
											<span className="d-none d-lg-block">
												{APPNAME}
											</span>
										</Link>
									</div>
									{/* End Logo */}
									<div className="card mb-3">
										<div className="card-body">
											<div className="pt-4 pb-2">
												<h5 className="card-title text-center pb-0 fs-4">
													Create an Account
												</h5>
												<p className="text-center small">
													Enter your personal details to create
													account
												</p>
											</div>
											{/* form */}
											<RegisterForm />
										</div>
									</div>
									<div className="credits">
										{/* All the links in the footer should remain intact. */}
										{/* You can delete the links only if you purchased the pro version. */}
										{/* Licensing information: https://bootstrapmade.com/license/ */}
										{/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ */}
										Designed by{" "}
										<a href="https://bootstrapmade.com/">
											BootstrapMade
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default Register;
