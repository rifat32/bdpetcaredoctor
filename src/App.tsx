import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	RouteComponentProps,
} from "react-router-dom";
import HomePage from "./pages/HomePage/index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage/index";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./context";
import "react-toastify/dist/ReactToastify.css";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import SideBarComponent from "./components/SideBarComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import Admin from "./pages/AdminPages/DemoAdmin";
import AddProductPage from "./pages/AdminPages/Product/AddProductPage";
import BrandPage from "./pages/AdminPages/Product/Brand/BrandPage";
import ListProductPage from "./pages/AdminPages/Product/ListProductPage";
import { RouteData } from "./Routes";
import "./app.css";

const App: React.FC = () => {
	const {
		user,
		showHeaderComponent,
		showSideBarComponent,
		showFooterComponent,
	} = useContext(AppContext);

	return (
		<Router>
			{showHeaderComponent && <HeaderComponent />}
			{showSideBarComponent && <SideBarComponent />}

			<Switch>
				{RouteData.map((el) => {
					return (
						<Route
							path={el.path}
							exact={el.exact}
							render={(props: RouteComponentProps<any>) => (
								<el.component {...props} {...el.props} />
							)}
						/>
					);
				})}
				{/* <Route path="/" exact>
					<HomePage />
				</Route> */}
				{/* <Route path="/login">
					<LoginPage />
				</Route> */}
				{/* <Route path="/register">
					<RegisterPage />
				</Route> */}
				{/* <Route path="/admin" exact={true}>
					<Admin />
				</Route> */}
				{/* <Route path="/admin/products/create">
					<AddProductPage />
				</Route> */}
				{/* <Route path="/admin/products" exact={true}>
					<ListProductPage />
				</Route> */}
				{/* <Route path="/admin/brands">
					<BrandPage />
				</Route> */}
			</Switch>
			{showFooterComponent && <FooterComponent />}

			<ToastContainer position="top-right" />
		</Router>
	);
};

export default App;
