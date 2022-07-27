import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";

import { BACKEND } from "../../../config";
import { apiClient } from "../../../utils/apiClient";

interface AccountSetting {
	password: string;
	password_confirmation: string;
}
const AccountSettingPage: React.FC = () => {
	const [state,setState] = useState<AccountSetting>({
		password:"",
		password_confirmation:""
	})
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<any>(null);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors(null);
	
		apiClient()
			.post(`${BACKEND}/api/v1.0/account-setting/change-password`, {
				...state,
			})
			.then((response: any) => {
				console.log(response.data);
				localStorage.setItem("token", response.data.token);
				toast.success("Password Changed");
			
				setLoading(false);
			
			})
			.catch((error) => {
			
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}

				console.log(error.response);
				setLoading(false);
			});
	};
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Account Setting</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Profile</li>
							<li className="breadcrumb-item active">Account Setting</li>
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
										<h5 className="card-title">Setting</h5>	
									</div>

	<h3 className="text-center">Account Setting</h3>
									<form className="row g-3" noValidate onSubmit={handleSubmit}>
									<div className="col-12">
					<label htmlFor="yourPassword" className="form-label">
						Password
					</label>
					<input
						type="password"
						name="password"
						className={
							errors
								? errors.password
									? `form-control is-invalid`
									: `form-control is-valid`
								: "form-control"
						}
						id="yourPassword"
						required
						onChange={handleChange}
						value={state.password}
					/>
						{errors?.password && (
						<div className="invalid-feedback">{errors.password[0]}</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
					
				</div>
				<div className="col-12">
					<label htmlFor="yourPassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						name="password_confirmation"
						className={
							errors
								? errors.password
									? `form-control is-invalid`
									: `form-control is-valid`
								: "form-control"
						}
						id="yourPassword"
						required
						onChange={handleChange}
						value={state.password_confirmation}
					/>
						{errors?.password && (
						<div className="invalid-feedback">{errors.password[0]}</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
				</div>
				{loading && (
					<div className="col-12">
						<div className="text-center">
							<Loader
								type="Puff"
								color="#00BFFF"
								height={50}
								width={50}
							/>
						</div>
					</div>
				)}

				<div className="col-12">
					<button className="btn btn-primary w-100" type="submit">
						Change
					</button>
				</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AccountSettingPage;
