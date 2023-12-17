import nc from "next-connect";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";
import slugify from "slugify";

const handler = nc();

handler.post(async (req, res) => {
	try {
		db.connectDb();
		if (req.body.parent) {
			const parent = await Product.findById(req.body.parent);
			if (!parent) {
				return res.status(400).json({
					message: "Parent Product not found!",
				});
			} else {
				const newParent = await parent.updateOne(
					{
						$push: {
							subProducts: {
								sku: req.body.sku,
								color: req.body.color,
								images: req.body.images,
								sizes: req.body.sizes,
								discount: req.body.discount,
							},
						},
					},
					{ new: true }
				);
				res.status(200).json({ message: "Product created successfully." });
			}
		} else {
			req.body.slug = slugify(req.body.name);
			const newProduct = new Product({
				name: req.body.name,
				description: req.body.description,
				brand: req.body.brand,
				details: req.body.details,
				questions: req.body.questions,
				slug: req.body.slug,
				category: req.body.category,
				subCategories: req.body.subCategories,
				subProducts: [
					{
						sku: req.body.sku,
						color: req.body.color,
						images: req.body.images,
						sizes: req.body.sizes,
						discount: req.body.discount,
					},
				],
			});
			await newProduct.save();
			res.status(200).json({ message: "Product created successfully." });
		}
		db.disconnectDb();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

handler.delete(async (req, res) => {
	
    try {
        db.connectDb();
        const { name } = req.query; // Assuming name is used as the identifier

        // Validate name if needed

        const existingProduct = await Product.findOne({ name });
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        const deletedProduct = await Product.findOneAndDelete({ name });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: error.message });
    } finally {
        db.disconnectDb();
    }
});

// Define the GET route
handler.get(async (req, res) => {
    try {
        db.connectDb();
        const data = await Product.find(); // Invoke the function to fetch data
        res.status(200).json(data); // Send the data in the response
    } catch (error) {
        res.status(500).json({ message: `Error in all product ${error.message}` });
    } finally {
        db.disconnectDb();
    }
});

export default handler;
