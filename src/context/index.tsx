import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BACKENDAPI } from "../config";
import { apiClient } from "../utils/apiClient";
const defaultContext = {
	user: null,
	permissions: ["test"],
	roles: [],
	userLoading: true,
	setUserFunction: (toogle: boolean): void => {},
	setUserLoadingFunction: (user: any): void => {},
	showHeaderComponent: false,
	showSideBarComponent: false,
	showFooterComponent: false,
	setAdminBar: (toggle: boolean): void => {},
	setShowSideBarComponentFunc: (toggle: boolean): void => {},
	setShowHeaderComponentFunc: (toggle: boolean): void => {},
	setShowFooterComponentFunc: (toggle: boolean): void => {},
	logoutFunction: (): void => {},
};
const AppContext = createContext(defaultContext);
const AppProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<any>(null);
	const [roles, setRoles] = useState<any>([]);
	const [permissions, setPermissions] = useState<any>([]);
	const [userLoading, setUserLoading] = useState(true);
	const setUserFunction = (data: any) => {
		loadUser();
	};
	const loadUser = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/user`)
			.then((response: any) => {
				console.log(response);
				setUser(response.data.user);
				setPermissions(response.data.permissions);
				setRoles(response.data.roles);
				setUserLoading(false);
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response) {
				}
				logoutFunction();
				setUserLoading(false);
			});
	};
	const setUserLoadingFunction = (toogle: boolean) => {
		setUserLoading(toogle);
	};
	const [showHeaderComponent, setShowHeaderComponent] = useState(false);
	const [showSideBarComponent, setShowSideBarComponent] = useState(false);
	const [showFooterComponent, setShowFooterComponent] = useState(false);
	const setShowHeaderComponentFunc = (toggle: boolean) => {
		setShowHeaderComponent(toggle);
	};
	const setShowSideBarComponentFunc = (toggle: boolean) => {
		setShowSideBarComponent(toggle);
	};
	const setAdminBar = (toggle: boolean) => {
		setShowHeaderComponent(toggle);
		setShowSideBarComponent(toggle);
		setShowFooterComponent(toggle);
	};
	const setShowFooterComponentFunc = (toggle: boolean) => {
		setShowFooterComponent(toggle);
	};

	useEffect(() => {
		loadUser();
	}, []);
	const logoutFunction = () => {
		apiClient()
			.post(`${BACKENDAPI}/v1.0/logout`)
			.then((response) => {
				console.log(response);
				// setUser(response.data);
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response);
				}
			});

		setUser(null);
		setPermissions([]);
		setRoles([]);
		localStorage.clear();
	};
	return (
		<AppContext.Provider
			value={{
				user,
				setUserFunction,
				showHeaderComponent,
				showSideBarComponent,
				setAdminBar,
				setShowSideBarComponentFunc,
				setShowHeaderComponentFunc,
				setShowFooterComponentFunc,
				showFooterComponent,
				logoutFunction,
				userLoading,
				setUserLoadingFunction,
				roles,
				permissions,
			}}>
			{children}
		</AppContext.Provider>
	);
};
export { AppProvider, AppContext };
