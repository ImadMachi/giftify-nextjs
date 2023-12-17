// pages/api/admin/pack/[id]/add.js
import dbConnect from "@/utils/db";
import Pack from "@/models/Pack";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.query;
    const { productId } = req.body;

    try {
      await dbConnect();
      const pack = await Pack.findById(id);

      if (!pack) {
        return res.status(404).json({ message: "Pack not found" });
      }

      // Assuming you want to prevent duplicate products in a pack
      if (!pack.products.includes(productId)) {
        pack.products.push(productId);
        await pack.save();

        return res.status(200).json({ message: "Product added to pack successfully" });
      } else {
        return res.status(400).json({ message: "Product already exists in the pack" });
      }
    } catch (error) {
      console.error("Error adding product to pack:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
