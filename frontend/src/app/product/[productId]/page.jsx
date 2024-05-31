import React from "react";
import ProductInfo from "./_components/ProductInfo";

const ProductPage = ({ params }) => {
	const productId = params.productId;

	return (
		<div>
			<ProductInfo productId={productId} />
		</div>
	);
};

export default ProductPage;
