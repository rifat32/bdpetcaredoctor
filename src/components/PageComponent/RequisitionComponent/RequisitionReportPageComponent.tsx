import React, { useEffect, useState } from "react";
import { apiClient } from "../../../utils/apiClient";
import { BACKENDAPI } from "../../../config";
import VerticalBarGraph from "@chartiful/react-vertical-bar-graph";

const RequisitionReportPageComponent = () => {
	const [amount, setAmount] = useState<any>([]);
	const [date, setDate] = useState<any>([]);
	useEffect(() => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/requisitions/report/thismonth`)
			.then((response: any) => {
				console.log(response.data);
				const tempAmounts: any = [];
				const tempDate: any = [];
				response.data.reverse().map((el: any) => {
					tempAmounts.push(el.amount);
					const date = new Date(el.date);
					tempDate.push(date.getDate());
				});

				setAmount([...tempAmounts]);
				setDate([...tempDate]);
			})
			.catch((error) => {
				console.log(error.response);
			});
	}, []);

	return (
		<>
			{date.length && amount.length ? (
				<>
					<VerticalBarGraph
						data={[...amount]}
						labels={[...date]}
						width={800}
						height={300}
						barRadius={5}
						barWidthPercentage={0.4}
						baseConfig={{
							hasXAxisBackgroundLines: false,
							xAxisLabelStyle: {
								position: "right",
								suffix: "৳",
							},
						}}
						style={{
							paddingVertical: 15,
						}}
					/>
					<h5>This month Report</h5>
					<div
						className="bg-primary my-5"
						style={{ height: "1rem", width: "100%" }}></div>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default RequisitionReportPageComponent;
