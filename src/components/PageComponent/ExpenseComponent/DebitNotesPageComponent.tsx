import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const DebitNotesPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/debit-notes`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	useEffect(() => {
		loadData(link);
	}, []);
	// pagination required
	const loadData = (link: string) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response);
				setData([...data, ...response.data.debitNotes.data]);
				setNextPageLink(response.data.debitNotes.next_page_url);
				setPrevPageLink(response.data.debitNotes.prev_page_url);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const ApproveFunc = (id: number) => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/debit-notes/approve`, {
				id: id,
			})
			.then((response: any) => {
				toast.success("debit note approved");
				const tempRevenue: any = data.map((el: any) => {
					if (el.id === id) {
						el.status = 1;
					}
					return el;
				});
				setData(tempRevenue);

				console.log(response);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Wing</th>
						<th scope="col">Vendor</th>
						<th scope="col">Bill</th>
						<th scope="col">Amount</th>
						<th scope="col">Account</th>
						<th scope="col">Date</th>
						<th scope="col">Description</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>

				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.wing.name}</td>
									<td>{el.bill.vendor}</td>
									<td>{`#bill0000${el.bill_id}`}</td>
									<td>{el.amount}</td>
									<td>{el.account_number}</td>
									<td>{el.date}</td>
									<td>{el.description}</td>
									<td>{el.status ? "approved" : "pending"}</td>
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
												{/* <li>
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
												<li>
													<hr className="dropdown-divider" />
												</li> */}
												<li>
													<a
														onClick={() => ApproveFunc(el.id)}
														className="dropdown-item"
														href="#">
														Approve
													</a>
												</li>
												{/* <li>
													<hr className="dropdown-divider" />
												</li> */}
												{/* <li>
													<a
														onClick={() => {
															deleteData(el.id);
														}}
														className="dropdown-item"
														href="#">
														delete
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li> */}
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
		</>
	);
};

export default DebitNotesPageComponent;
