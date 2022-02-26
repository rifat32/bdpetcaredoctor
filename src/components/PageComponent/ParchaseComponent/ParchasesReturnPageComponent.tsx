import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../../utils/ErrorMessage";
import CustomModal from "../../Modal/Modal";
import AddParchaseForm from "../../Forms/ParchaseForms/AddParchaseForm";

const ParchasesReturnPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);

	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/parchases/return`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	useEffect(() => {
		loadData(link);
	}, []);

	const loadData = (link: string) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response.data);

				setData([...data, ...response.data.purchases.data]);
				setNextPageLink(response.data.purchases.next_page_url);
				setPrevPageLink(response.data.purchases.prev_page_url);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const updateDataStates = (updatedData: any) => {
		const tempDatas = data.map((el: any) => {
			if (parseInt(el.id) === parseInt(updatedData.id)) {
				return updatedData;
			}
			return el;
		});
		setData(tempDatas);
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/parchases/${id}`)
				.then((response: any) => {
					console.log(response);
					removeData(id);
					toast.success("data deleted successfully");
				})
				.catch((error) => {
					console.log(error.response);
				});
		}
	};
	const approveData = (id: number) => {
		if (window.confirm("Are you sure  want to approve ?")) {
			apiClient()
				.put(`${BACKENDAPI}/v1.0/parchases/approve`, {
					id: id,
				})
				.then((response: any) => {
					console.log(response);
					removeData(id);
					toast("Data Approved");
				})
				.catch((error) => {
					console.log(error.response);
					ErrorMessage(error.response.status, error.response.data.message);
				});
		}
	};
	const removeData = (id: number | string) => {
		const newPurchases = data.filter((el: any) => {
			return el.id !== id;
		});
		setData(newPurchases);
	};

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Wing</th>
						<th scope="col">Supplier</th>
						<th scope="col">Reference</th>
						<th scope="col">Status</th>
						<th scope="col">Product</th>
						<th scope="col">Amount</th>
						<th scope="col">Quantity</th>
						<th scope="col">Payment Method</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.wing.name}</td>
									<td>{el.supplier}</td>
									<td>{el.reference_no}</td>
									<td>{el.purchase_status}</td>
									<td>{el.product.name}</td>
									<td>{el.product.price}</td>
									<td>{el.quantity}</td>
									<td>{el.payment_method}</td>
									<td>
										<div className="btn-group">
											<button
												type="button"
												className="btn btn-sm btn-primary dropdown-toggle"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												Action
											</button>
											<ul className="dropdown-menu action">
												<li>
													<a
														onClick={() => {
															setCurrentData(el);
															showModal(true);
														}}
														className="dropdown-item"
														href="#">
														edit
													</a>
												</li>
												{/* <li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<a
														onClick={() => {
															approveData(el.id);
														}}
														className="dropdown-item"
														href="#">
														Purchase return
													</a>
												</li> */}
												{/* <li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<a
														onClick={() => {
															deleteData(el.id);
														}}
														className="dropdown-item"
														href="#">
														delete
													</a>
												</li> */}
												<li>
													<hr className="dropdown-divider" />
												</li>
											</ul>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
			<div className="text-center">
				{nextPageLink ? (
					<button
						className="btn btn-primary"
						onClick={() => {
							loadData(nextPageLink);
						}}>
						Load More ...
					</button>
				) : data.length ? (
					prevPageLink ? (
						"No more data to show"
					) : (
						""
					)
				) : (
					"No data to show"
				)}
			</div>
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Update Bank">
				<AddParchaseForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default ParchasesReturnPageComponent;
