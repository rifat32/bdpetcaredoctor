import React, { useEffect, useState } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";

interface FormData {
	wing_id: string;
	account_number: string;
}
const BalancePageComponent = () => {
	const [formData, setFormData] = useState<FormData>({
		wing_id: "",
		account_number: "",
	});
	const resetFunction = () => {
		setFormData({
			wing_id: "",
			account_number: "",
		});
	};
	const [total, setTotal] = useState(0);
	const [wings, setWings] = useState([]);
	const [banks, setBanks] = useState([]);
	const [searchResult, setSearchResult] = useState("");

	useEffect(() => {
		loadWings();
		getTotalBalance();
	}, []);
	const loadBanks = (wing_id: string) => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/banks/wing/${wing_id}`)
			.then((response: any) => {
				console.log(response);
				setBanks(response.data.banks);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const loadWings = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/wings/all`)
			.then((response: any) => {
				console.log(response);
				setWings(response.data.wings);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const getTotalBalance = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/balance/total`)
			.then((response: any) => {
				console.log(response);
				setTotal(response.data.balance);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const getBalanceByWingAndBank = (wing_id: string, bank_id: string) => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/balance/wing-bank/${wing_id}/${bank_id}`)
			.then((response: any) => {
				console.log(response);
				let wing: any = wings.filter(
					(el: any) => parseInt(el.id) === parseInt(wing_id)
				);
				let bank: any = banks.filter(
					(el: any) => parseInt(el.id) === parseInt(bank_id)
				);

				setSearchResult(
					`Balance for wing ${wing[0].name} and account ${bank[0].account_number} is  ${response.data.balance} taka`
				);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const getBalanceByWing = (wing_id: string) => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/balance/wing/${wing_id}`)
			.then((response: any) => {
				console.log(response);
				let wing: any = wings.filter(
					(el: any) => parseInt(el.id) === parseInt(wing_id)
				);

				setSearchResult(
					`Balance for wing ${wing[0].name}   is  ${response.data.balance} taka`
				);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSearchResult("");
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === "wing_id") {
			loadBanks(e.target.value);
			getBalanceByWing(e.target.value);
			setFormData({
				...formData,
				wing_id: e.target.value,
				account_number: "",
			});
		}
		if (e.target.name === "account_number") {
			getBalanceByWingAndBank(formData.wing_id, e.target.value);
		}
	};

	return (
		<>
			<h4>Total Balance {total} taka </h4>
			<h4>{searchResult} </h4>
			<h4 className="text-center text-capitalize">search balance</h4>
			<form className="row g-3">
				<div className="col-md-12">
					<label htmlFor="wing_id" className="form-label">
						Wing
					</label>
					<select
						className="form-select"
						id="wing_id"
						name="wing_id"
						onChange={handleSelect}
						value={formData.wing_id}>
						<option value="">Please Select</option>
						{wings.map((el: any, index) => (
							<option
								key={index}
								value={el.id}
								style={{ textTransform: "uppercase" }}>
								{el.name}
							</option>
						))}
					</select>
				</div>
				<div className="col-md-12">
					<label htmlFor="account_number" className="form-label">
						Accounts
					</label>
					<select
						className="form-select"
						id="account_number"
						name="account_number"
						onChange={handleSelect}
						value={formData.account_number}>
						<option value="">Please Select</option>
						{banks.map((el: any, index) => (
							<option
								key={index}
								value={el.id}
								style={{ textTransform: "uppercase" }}>
								{el.account_number}
							</option>
						))}
					</select>
				</div>
			</form>
		</>
	);
};

export default BalancePageComponent;
