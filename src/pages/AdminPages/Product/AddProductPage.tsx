import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import AddProductForm from "../../../components/Forms/ProductForms/AddProductForm";

const AddProduct: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new product</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Products</li>
							<li className="breadcrumb-item active">Add Product</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Product</h5>

									<AddProductForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddProduct;
