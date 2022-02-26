import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";
import { adminSideBarData } from "../../data/AdminSidebarData";
import { NavInterface } from "../../interfaces/AdminSideBarInterface";

const SideBarComponent = () => {
	const { permissions, roles, user } = useContext(AppContext);
	const [sideBar, setSideBar] = useState<NavInterface[]>([]);
	// calculate sidebar with permission
	const calculateSidebar = () => {
		// loop over sidebars

		const tempSidebar = adminSideBarData.map((el) => el);

		const Sidebar = tempSidebar.map((el) => {
			const tempLists = el.list.filter((list) => {
				// if no permission is required
				if (!list.permissions.length) {
					return true;
				}
				// if user has any permission then return boolean
				const checkPermission = list.permissions.some(
					(permission: string) => {
						return permissions.includes(permission);
					}
				);

				return checkPermission;
			});
			// end of filter list inside sidebar

			// set filtered list and return
			// I don't know why el.list is mutating the original array. but el.vlist make verified list
			el.vlist = tempLists;

			return el;
		});
		// end loop over sidebars
		setSideBar(Sidebar);
	};
	useEffect(() => {
		calculateSidebar();
	}, [user]);

	return (
		<>
			<aside id="sidebar" className="sidebar">
				<ul className="sidebar-nav" id="sidebar-nav">
					{sideBar.length &&
						sideBar.map((nav, navIndex) => {
							return nav.vlist?.length ? (
								<li key={navIndex} className="nav-item">
									<a
										className="nav-link collapsed"
										data-bs-target={`#nav-list-${navIndex}`}
										data-bs-toggle="collapse"
										href="#">
										<i className="bi bi-gem" />
										<span>{nav.name}</span>
										<i className="bi bi-chevron-down ms-auto" />
									</a>
									<ul
										id={`nav-list-${navIndex}`}
										className="nav-content collapse"
										data-bs-parent="#sidebar-nav">
										{nav.vlist.map((navList, navListIndex) => {
											return (
												<li key={navListIndex}>
													<Link to={navList.link}>
														<i className="bi bi-circle" />
														<span>{navList.name}</span>
													</Link>
												</li>
											);
										})}
									</ul>
								</li>
							) : null;
						})}

					{/* <li className="nav-item">
						<a className="nav-link" href="index.html">
							<i className="bi bi-grid" />
							<span>Dashboard</span>
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link collapsed"
							data-bs-target="#components-nav"
							data-bs-toggle="collapse"
							href="#">
							<i className="bi bi-menu-button-wide" />
							<span>Components</span>
							<i className="bi bi-chevron-down ms-auto" />
						</a>
						<ul
							id="components-nav"
							className="nav-content collapse"
							data-bs-parent="#sidebar-nav">
							<li>
								<a href="components-alerts.html">
									<i className="bi bi-circle" />
									<span>Alerts</span>
								</a>
							</li>
							<li>
								<a href="components-accordion.html">
									<i className="bi bi-circle" />
									<span>Accordion</span>
								</a>
							</li>
							<li>
								<a href="components-badges.html">
									<i className="bi bi-circle" />
									<span>Badges</span>
								</a>
							</li>
							<li>
								<a href="components-breadcrumbs.html">
									<i className="bi bi-circle" />
									<span>Breadcrumbs</span>
								</a>
							</li>
							<li>
								<a href="components-buttons.html">
									<i className="bi bi-circle" />
									<span>Buttons</span>
								</a>
							</li>
							<li>
								<a href="components-cards.html">
									<i className="bi bi-circle" />
									<span>Cards</span>
								</a>
							</li>
							<li>
								<a href="components-carousel.html">
									<i className="bi bi-circle" />
									<span>Carousel</span>
								</a>
							</li>
							<li>
								<a href="components-list-group.html">
									<i className="bi bi-circle" />
									<span>List group</span>
								</a>
							</li>
							<li>
								<a href="components-modal.html">
									<i className="bi bi-circle" />
									<span>Modal</span>
								</a>
							</li>
							<li>
								<a href="components-tabs.html">
									<i className="bi bi-circle" />
									<span>Tabs</span>
								</a>
							</li>
							<li>
								<a href="components-pagination.html">
									<i className="bi bi-circle" />
									<span>Pagination</span>
								</a>
							</li>
							<li>
								<a href="components-progress.html">
									<i className="bi bi-circle" />
									<span>Progress</span>
								</a>
							</li>
							<li>
								<a href="components-spinners.html">
									<i className="bi bi-circle" />
									<span>Spinners</span>
								</a>
							</li>
							<li>
								<a href="components-tooltips.html">
									<i className="bi bi-circle" />
									<span>Tooltips</span>
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<a
							className="nav-link collapsed"
							data-bs-target="#forms-nav"
							data-bs-toggle="collapse"
							href="#">
							<i className="bi bi-journal-text" />
							<span>Forms</span>
							<i className="bi bi-chevron-down ms-auto" />
						</a>
						<ul
							id="forms-nav"
							className="nav-content collapse"
							data-bs-parent="#sidebar-nav">
							<li>
								<a href="forms-elements.html">
									<i className="bi bi-circle" />
									<span>Form Elements</span>
								</a>
							</li>
							<li>
								<a href="forms-layouts.html">
									<i className="bi bi-circle" />
									<span>Form Layouts</span>
								</a>
							</li>
							<li>
								<a href="forms-editors.html">
									<i className="bi bi-circle" />
									<span>Form Editors</span>
								</a>
							</li>
							<li>
								<a href="forms-validation.html">
									<i className="bi bi-circle" />
									<span>Form Validation</span>
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<a
							className="nav-link collapsed"
							data-bs-target="#tables-nav"
							data-bs-toggle="collapse"
							href="#">
							<i className="bi bi-layout-text-window-reverse" />
							<span>Tables</span>
							<i className="bi bi-chevron-down ms-auto" />
						</a>
						<ul
							id="tables-nav"
							className="nav-content collapse"
							data-bs-parent="#sidebar-nav">
							<li>
								<a href="tables-general.html">
									<i className="bi bi-circle" />
									<span>General Tables</span>
								</a>
							</li>
							<li>
								<a href="tables-data.html">
									<i className="bi bi-circle" />
									<span>Data Tables</span>
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<a
							className="nav-link collapsed"
							data-bs-target="#charts-nav"
							data-bs-toggle="collapse"
							href="#">
							<i className="bi bi-bar-chart" />
							<span>Charts</span>
							<i className="bi bi-chevron-down ms-auto" />
						</a>
						<ul
							id="charts-nav"
							className="nav-content collapse"
							data-bs-parent="#sidebar-nav">
							<li>
								<a href="charts-chartjs.html">
									<i className="bi bi-circle" />
									<span>Chart.js</span>
								</a>
							</li>
							<li>
								<a href="charts-apexcharts.html">
									<i className="bi bi-circle" />
									<span>ApexCharts</span>
								</a>
							</li>
							<li>
								<a href="charts-echarts.html">
									<i className="bi bi-circle" />
									<span>ECharts</span>
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<a
							className="nav-link collapsed"
							data-bs-target="#icons-nav"
							data-bs-toggle="collapse"
							href="#">
							<i className="bi bi-gem" />
							<span>Icons</span>
							<i className="bi bi-chevron-down ms-auto" />
						</a>
						<ul
							id="icons-nav"
							className="nav-content collapse"
							data-bs-parent="#sidebar-nav">
							<li>
								<a href="icons-bootstrap.html">
									<i className="bi bi-circle" />
									<span>Bootstrap Icons</span>
								</a>
							</li>
							<li>
								<a href="icons-remix.html">
									<i className="bi bi-circle" />
									<span>Remix Icons</span>
								</a>
							</li>
							<li>
								<a href="icons-boxicons.html">
									<i className="bi bi-circle" />
									<span>Boxicons</span>
								</a>
							</li>
						</ul>
					</li> */}
					{/* aaaaaaaaaaaaaaaaaaaaaaaaaaa */}
					{/* <li className="nav-heading">Pages</li>
					<li className="nav-item">
						<a className="nav-link collapsed" href="users-profile.html">
							<i className="bi bi-person" />
							<span>Profile</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link collapsed" href="pages-faq.html">
							<i className="bi bi-question-circle" />
							<span>F.A.Q</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link collapsed" href="pages-contact.html">
							<i className="bi bi-envelope" />
							<span>Contact</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link collapsed" href="pages-register.html">
							<i className="bi bi-card-list" />
							<span>Register</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link collapsed" href="pages-login.html">
							<i className="bi bi-box-arrow-in-right" />
							<span>Login</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link collapsed" href="pages-error-404.html">
							<i className="bi bi-dash-circle" />
							<span>Error 404</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link collapsed" href="pages-blank.html">
							<i className="bi bi-file-earmark" />
							<span>Blank</span>
						</a>
					</li> */}
				</ul>
			</aside>
		</>
	);
};

export default SideBarComponent;
