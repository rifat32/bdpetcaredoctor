import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { BACKEND } from "../../config";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { AppContext } from "../../context";

interface RegisterInfo {
	name: "";
	email: string;
	password: string;
	password_confirmation: string;
}
const RegisterForm: React.FC = (props: any) => {
	const { user, setUserFunction, setUserLoadingFunction } =
		useContext(AppContext);

	const [state, setState] = useState<RegisterInfo>({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<any>(null);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors(null);
		setUserLoadingFunction(true);
		axios
			.post(`${BACKEND}/api/v1.0/register`, {
				...state,
			})
			.then((response: any) => {
				console.log(response.data);
				localStorage.setItem("token", response.data.token);
				toast.success("Registration Successfull.");
				setUserFunction(response.data.data);
				setLoading(false);
				setUserLoadingFunction(false);
			})
			.catch((error) => {
				setUserLoadingFunction(false);
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}

				console.log(error.response);
				setLoading(false);
			});
	};
	useEffect(() => {
		if (user) {
			props.history.push("/");
		}
	}, [user]);

	return (
		<>
			<form className="row g-3" noValidate onSubmit={handleSubmit}>
				<div className="col-12">
					<label htmlFor="yourPassword" className="form-label">
						Name
					</label>
					<input
						type="text"
						name="name"
						className={
							errors
								? errors.name
									? `form-control is-invalid`
									: `form-control is-valid`
								: "form-control"
						}
						id="yourPassword"
						required
						onChange={handleChange}
						value={state.name}
					/>
					{errors?.name && (
						<div className="invalid-feedback">{errors.name[0]}</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
				</div>
				<div className="col-12">
					<label htmlFor="yourEmail" className="form-label">
						Email
					</label>
					<div className="input-group has-validation">
						<span className="input-group-text" id="inputGroupPrepend">
							@
						</span>
						<input
							type="text"
							name="email"
							className={
								errors
									? errors.email
										? `form-control is-invalid`
										: `form-control is-valid`
									: "form-control"
							}
							id="yourEmail"
							required
							onChange={handleChange}
							value={state.email}
						/>
						{errors?.email && (
							<div className="invalid-feedback">{errors.email[0]}</div>
						)}
						{errors && <div className="valid-feedback">Looks good!</div>}
					</div>
				</div>
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
						className="form-control"
						id="yourPassword"
						required
						onChange={handleChange}
						value={state.password_confirmation}
					/>
				</div>
				{/* <div className="col-12">
													<div className="form-check">
														<input
															className="form-check-input"
															type="checkbox"
															name="remember"
															defaultValue="true"
															id="rememberMe"
														/>
														<label
															className="form-check-label"
															htmlFor="rememberMe">
															Remember me
														</label>
													</div>
												</div> */}

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
						Create Account
					</button>
				</div>

				<div className="col-12">
					<p className="small mb-0">
						Already have an account? <Link to="/login">Log in</Link>
					</p>
				</div>
			</form>
		</>
	);
};

export default withRouter(RegisterForm);
