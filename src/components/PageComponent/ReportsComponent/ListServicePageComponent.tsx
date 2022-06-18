import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import AddProductForm from "../../Forms/ProductForms/AddProductForm";
import { toast } from "react-toastify";
import AddPatientForm from "../../Forms/PatientForms/AddPatientForm";
import AddDoctorForm from "../../Forms/DoctorForms/AddDoctorForm";
import ServiceDetails from "./ServiceDetails";

const ListServicePageComponent: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/reports/services`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");



	useEffect(() => {
		loadData(link);
	}, []);

	// pagination required
	const loadData = (link: string) => {
		setLoading(true)
		apiClient()
			.get(link)
			.then((response: any) => {
				setLoading(false)
				console.log(response.data.transactions);
				setData([...data, ...response.data.transactions.data]);
				setNextPageLink(response.data.transactions.next_page_url);
				setPrevPageLink(response.data.transactions.prev_page_url);
			})
			.catch((error) => {
				setLoading(false)
				console.log(error.response);
			});
	};
const calculateIncome = (el:any) => {
	let income = 0.0;
	el.sell_lines.map((el2:any) => {
		income += (((parseInt(el2.unit_price_inc_tax) -  parseInt(el2.cost)) * parseInt(el2.doctor_commission))/100) * parseInt(el2.quantity)
	})
return income.toFixed(2);
}
	
	return (
		<>
			<table className="table">
				<thead>
					<tr>
					
						<th scope="col">Id</th>
						<th scope="col">Date</th>
						<th scope="col">Invoice No</th>
						<th scope="col">Earning</th>
				        <th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.id}</td>
									<td>{new Date(el.created_at).toDateString()}</td>
									<td>{el.invoice_no}</td>
									<td>{calculateIncome(el)}</td>
									<td>
										<a className="btn btn-info" onClick={() => {
												setCurrentData(el);
												showModal(true);
										}}>View</a>
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
                     loading?("Loading.."):("No data to show")
				)}
			</div>
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Invoice Details">
				<ServiceDetails
					value={currentData}
					
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default ListServicePageComponent;
