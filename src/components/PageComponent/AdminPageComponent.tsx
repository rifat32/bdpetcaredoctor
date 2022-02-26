import React, { useEffect, useContext, ReactChildren, ReactChild } from "react";
import { AppContext } from "../../context";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
// this is for all admin page for sequirity
const AdminPageComponent: React.FC = (props: any) => {
	const { setAdminBar, user, userLoading } = useContext(AppContext);
	useEffect(() => {
		// if app is not loading and no user found then change location
		if (!userLoading && !user) {
			props.history.push("/");
		}
		// while loading it will hide the admin bars
		if (!user) {
			setAdminBar(false);
		} else {
			setAdminBar(true);
		}
	}, [userLoading, user]);
	// if no user found wait for load the app or redirect
	if (!user) {
		return (
			<div
				style={{ height: "100vh" }}
				className="d-flex justify-content-center align-items-center">
				<Loader type="Puff" color="#00BFFF" height={150} width={150} />
			</div>
		);
	}
	return <>{props.children}</>;
};

export default withRouter(AdminPageComponent);
