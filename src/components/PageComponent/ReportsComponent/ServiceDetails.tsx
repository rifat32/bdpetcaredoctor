import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";


const ServiceDetails: React.FC<UpdateFormInterface> = (props) => {


console.log(props.value)


	return (
		<div className="row g-3">
		<table className="table table striped">
            <thead>
                <tr>
                <th>Product</th>
                <th>Commission</th>
                </tr>
               
            </thead>
   <tbody>
     {
        props.value.sell_lines.map((el:any) => {
            return <tr>
                <td>
                    {el.products.name}
                </td>
                <td>
                    {el.doctor_commission}
                </td>
            </tr>
        })
     }
   </tbody>
        </table>
		</div>
	);
};

export default ServiceDetails;
