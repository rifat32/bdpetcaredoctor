import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { BACKEND } from "../../config";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { AppContext } from "../../context";

interface LoginInfo {
	email: string;
	password: string;
}
const LoginForm: React.FC = (props: any) => {
	const { user, setUserFunction, setUserLoadingFunction } =
		useContext(AppContext);
	const [state, setState] = useState<LoginInfo>({
		email: "",
		password: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<string[]>([]);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors([]);
		setUserLoadingFunction(true);
		axios
			.post(`${BACKEND}/api/v1.0/login`, {
				...state,
			})
			.then((response: any) => {
				console.log(response.data);
				localStorage.setItem("token", response.data.token);
				toast.success("Login Successfull.");
				setUserFunction(response.data.data);
				setLoading(false);
				setUserLoadingFunction(false);
			})
			.catch((err) => {
				setUserLoadingFunction(false);
				console.log("err", err.request);

				if (err.response) {
					let errorStatus = err.response.status;
					if (errorStatus === 422) {
						setErrors(err.response.data.errors);
					}
					if (errorStatus === 401) {
						setErrors(["Invalid Credentials"]);
					}
				}

				setLoading(false);
			});
	};
	useEffect(() => {
		if (user) {
			props.history.push("/admin");
		}
	}, [user]);
	return (
		<>
			<form className="row g-3 needs-validation" onSubmit={handleSubmit}>
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
							className="form-control"
							id="yourEmail"
							required
							onChange={handleChange}
							value={state.email}
						/>
						<div className="invalid-feedback">
							Please enter your username.
						</div>
					</div>
				</div>
				<div className="col-12">
					<label htmlFor="yourPassword" className="form-label">
						Password
					</label>
					<input
						type="password"
						name="password"
						className="form-control"
						id="yourPassword"
						required
						onChange={handleChange}
						value={state.password}
					/>
					<div className="invalid-feedback">
						Please enter your password!
					</div>
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

				{errors.length ? (
					<div className="col-12">
						<div>
							<div
								className="alert alert-danger py-2 text-center"
								role="alert">
								{errors[0]}
							</div>
						</div>
					</div>
				) : null}

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
						Login
					</button>
				</div>
				<div className="col-12">
					<p className="small mb-0">
						Don't have account?{" "}
						<Link to="/register">Create an account</Link>
					</p>
				</div>
			</form>
		</>
	);
};

export default withRouter(LoginForm);
