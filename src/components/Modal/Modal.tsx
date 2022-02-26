import React, { useState, useEffect } from "react";
import Modal from "react-modal";
const customStyles = {
	content: {
		top: "60%",
		left: "50%",
		width: "50%",
		height: "100vh",
		transform: "translate(-50%, -50%)",
	},
};

const CustomModal: React.FC<any> = (props: any) => {
	return (
		<>
			<Modal
				isOpen={props.isOpen}
				style={customStyles}
				contentLabel="Example Modal">
				<div className="row">
					<button
						type="button"
						className="btn btn-close"
						style={{
							fontSize: "2rem",
							display: "block",
							marginLeft: "auto",
						}}
						onClick={() => {
							props.showModal(false);
						}}
						aria-label="Close"></button>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">{props.type}</h5>
								{props.children}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default CustomModal;
