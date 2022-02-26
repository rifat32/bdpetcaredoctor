import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";

const HomePage: React.FC = () => {
	const { user, setAdminBar } = useContext(AppContext);
	useEffect(() => {
		setAdminBar(false);
	}, []);
	return (
		<div className="d-flex justify-content-end">
			{user ? (
				<div>
					<Link to="/admin" className="btn me-2">
						Home
					</Link>
				</div>
			) : (
				<div>
					<Link to="/login" className="btn me-2">
						Login
					</Link>
					<Link to="/register" className="btn me-2">
						Register
					</Link>
				</div>
			)}
		</div>
	);
};

export default HomePage;
