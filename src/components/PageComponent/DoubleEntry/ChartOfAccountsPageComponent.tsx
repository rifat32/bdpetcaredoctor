import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const ChartOfAccountPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/chart-of-account`
	);
	useEffect(() => {
		loadBills();
	}, []);
	// pagination required
	const loadBills = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setData(response.data.chart_accounts);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<>
			{/* [
    {
        "id": 1,
        "name": "Assets",
        "created_at": "2021-10-25T10:37:44.000000Z",
        "updated_at": "2021-10-25T10:37:44.000000Z",
        "chart_of_accounts": [
            {
                "id": 1,
                "name": "aa",
                "code": "aa",
                "account_id": 1,
                "type_id": 1,
                "is_enabled": true,
                "description": "aa",
                "wing_id": 1,
                "created_at": "2021-10-25T10:38:06.000000Z",
                "updated_at": "2021-10-25T10:38:06.000000Z"
            }
        ]
    },
    {
        "id": 2,
        "name": "Liability",
        "created_at": "2021-10-25T10:37:44.000000Z",
        "updated_at": "2021-10-25T10:37:44.000000Z",
        "chart_of_accounts": []
    }
] */}
			{data.length
				? data.map((el: any) => {
						return (
							<div key={el.id}>
								<h4>{el.name}</h4>
								{el.chart_of_accounts.length ? (
									<table className="table">
										<thead>
											<tr>
												<th scope="col">Code</th>
												<th scope="col">Name</th>
												<th scope="col">Type</th>
												<th scope="col">Status</th>
												<th scope="col">Action</th>
											</tr>
										</thead>

										<tbody>
											{el.chart_of_accounts.map((el2: any) => {
												return (
													<tr key={el2.id}>
														<td>{el2.code}</td>
														<td>{el2.name}</td>
														<td>{el2.account_type.name}</td>
														<td>
															{el2.is_enabled
																? "enabled"
																: "disabled"}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								) : null}
							</div>
						);
				  })
				: null}
		</>
	);
};

export default ChartOfAccountPageComponent;
