import GridCategory from "./GridCategory";

const CategoriesProduct = ({ products, categories }: any) => {
	return (
		<div className="relative grid md:grid-cols-4 grid-flow-row-dense gap-4 -mt-16 sm:-mt-32 md:-mt-48 lg:-mt-80 z-10 p-4 bg-gradient-to-t from-gray-100 to-transparent">
			{categories.map((category: any) => (
				<GridCategory key={category._id} category={category.slug} products={products} />
			))}
		</div>
	);
};

export default CategoriesProduct;
