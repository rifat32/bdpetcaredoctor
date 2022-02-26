import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const ListTransfersPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/transfers`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	const [search, setSearch] = useState("");
	useEffect(() => {
		loadData(link);
	}, []);
	// pagination required
	const loadData = (link: string, loadMore: boolean = false) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response);
				if (!loadMore) {
					setData([...response.data.transfers.data]);
				} else {
					setData([...data, ...response.data.transfers.data]);
				}

				setNextPageLink(response.data.transfers.next_page_url);
				setPrevPageLink(response.data.transfers.prev_page_url);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setData([]);
		loadData(`${BACKENDAPI}/v1.0/transfers/${search}`);
	};
	const reset = () => {
		setData([]);
		loadData(link);
	};

	return (
		<>
			<form className="row g-3 mb-5" onSubmit={handleSearch}>
				<div className="col-md-6">
					<label htmlFor="search" className="form-label">
						Account Number
					</label>
					<input
						type="text"
						className="form-control"
						id="search"
						name="search"
						onChange={handleChange}
						value={search}
					/>
					<button type="submit" className="btn btn-primary mt-2">
						Submit
					</button>
				</div>
			</form>
			<div className="row">
				<div className="col-2 offset-10">
					<button
						type="button"
						onClick={reset}
						className="btn btn-primary  ms-auto">
						Reset
					</button>
				</div>
			</div>

			<table className="table">
				<thead>
					<tr>
						<th scope="col">Wing</th>
						<th scope="col">Bank</th>
						<th scope="col">Account Number</th>
						<th scope="col">Recieve</th>
						<th scope="col">Wing</th>
						<th scope="col">Bank</th>
						<th scope="col">Account Number</th>
						<th scope="col">Amount</th>
					</tr>
				</thead>

				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.sender_bank.wing.name}</td>
									<td>{el.sender_bank.name}</td>
									<td>{el.sender_bank.account_number}</td>
									<td className="text-primary">Reciever</td>
									<td>{el.reciever_bank.wing.name}</td>
									<td>{el.reciever_bank.name}</td>
									<td>{el.reciever_bank.account_number}</td>
									<td>{el.amount}</td>
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
							loadData(nextPageLink, true);
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

export default ListTransfersPageComponent;
