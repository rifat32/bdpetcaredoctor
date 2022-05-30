import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";

const HomePage: React.FC = () => {
	const { user, setAdminBar } = useContext(AppContext);
	useEffect(() => {
		setAdminBar(false);
	}, []);
	return (
		<div className="">
			<div className="d-flex justify-content-end">
			{user ? (
				<div>
					<Link to="/admin" className="btn me-2">
						Home
					</Link>
				</div>
			) : (
				<div>
					<Link to="/login" className="btn me-2" style={{fontWeight:"bold"}}>
						Login
					</Link>
					<Link to="/register" className="btn me-2" style={{fontWeight:"bold"}}>
						Register
					</Link>
				</div>
			)}
			</div>
			<div className="d-flex justify-content-center align-items-center mt-5" style={{height:"70vh",fontWeight:"bold" }}>

				<h1 className="text-capitalize">
				appointment management system
				</h1>

			</div>
			

		</div>
	);
};

export default HomePage;
