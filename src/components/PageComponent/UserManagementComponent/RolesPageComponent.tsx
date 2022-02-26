import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const RolesPageComponent: React.FC = () => {
	const [roles, setRoles] = useState([]);
	useEffect(() => {
		loadRoles();
	}, []);

	const loadRoles = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/roles/all`)
			.then((response: any) => {
				console.log(response);
				setRoles(response.data.roles);
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
						<th scope="col">Id</th>
						<th scope="col">Name</th>
					</tr>
				</thead>
				{roles.length ? (
					<tbody>
						{roles.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.id}</td>
									<td>{el.name}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default RolesPageComponent;
